import * as React from 'react';
import {FC, useEffect, useRef, useState} from 'react';
import {Text, Box, Divider, Flex, Input, Button, List, ListItem, Icon} from '@chakra-ui/react';
import {useWindowSize} from 'helper/useWindowSize';
import {FormattedMessage} from 'react-intl';
import messages from '../../messages'
import DialPad from 'images/kyc/dialpad.svg'
import CountDownSpinner from 'components/CountDownSpinner';
import {debounce, orderBy} from 'lodash';
import {arabicSupported, isValidLandline} from 'utils/validation';
import StatusBadge from '../Warning/StatusBadge';
import {GetURL} from 'utils/urlMap';
import {api} from 'utils/network';
import {toast, ToastContainer} from 'react-toastify';
import {useHistory} from 'react-router-dom';

type LandlineInfoProps = {
  userStatusInfo?: any
};
const LandlineInfo: FC<LandlineInfoProps> = ({userStatusInfo}) => {
  const {width} = useWindowSize();
  const [landline, setLandline] = useState<string>();
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();
  const [confirmCode, setConfirmCode] = useState<{ reference: number, value: number }[]>([]);
  const [activeRefrence, setActiveRefrence] = useState<number>(0);
  const [makeCall, setMakeCall] = useState(false);
  const [backSpaeClicked, setBackSpaeClicked] = useState(false)
  const [enableVerfiy, setEnableVerfiy] = useState(false);
  const section1 = useRef<HTMLInputElement>(null)
  const section2 = useRef<HTMLInputElement>(null)
  const section3 = useRef<HTMLInputElement>(null)
  const section4 = useRef<HTMLInputElement>(null)
  const section5 = useRef<HTMLInputElement>(null)
  const section6 = useRef<HTMLInputElement>(null)
  const arrayRef = [section1, section2, section3, section4, section5, section6]

  const landlineHandle = debounce(function (value) {
    setLandline(arabicSupported(value))
  }, 500)

  const sectionHandle = debounce(function (value, reference) {
    const filterd = confirmCode.filter(el => el.reference !== reference)
    !backSpaeClicked && setConfirmCode([...filterd, {reference: reference, value: value}])
    if (reference < 5 && value.length > 0) {
      arrayRef[reference + 1]!.current!.focus()
      setActiveRefrence(reference + 1)
    }
  }, 100)

  useEffect(() => {
    const inputs = document.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) {
      inputs[i]!.onkeydown = function (event) {
        var key = event.keyCode || event.charCode;
        if (key === 8) {
          setBackSpaeClicked(true)
          confirmCode.splice(-1)
          inputs[i].value.length === 0 && activeRefrence > 0 && setActiveRefrence(activeRefrence - 1)
          activeRefrence > 0 && arrayRef[activeRefrence - 1]!.current!.focus()
          inputs[i].value.length >= 1 && activeRefrence > 0 && arrayRef[activeRefrence]!.current!.focus()
        } else {
          setBackSpaeClicked(false)
        }
      }
    }
  }, [activeRefrence, confirmCode])

  function makeCallHandle() {
    api.post(GetURL('submit-landline'), {landline_number: landline})
    setMakeCall(true)
  }

  function verfiyLandline() {
    api.post(GetURL('verify-landline'), {code: orderBy(confirmCode, ['reference', ['asc']]).map(el => el.value).join('')})
      .then(response => {
        const result = response as unknown as any
        if (result?.error?.status === 'success') {
          api.put(GetURL('griffin-kyc-submit'))
            .then(() => history.push('/kyc'))
            .catch()
        }
      })
        .catch((error) => {
          setError('کد وارد شده نادرست است')
        })
  }

  useEffect(() => {
    toast.error(error, {
      position: 'top-right',
    });
  }, [error])
  const pendingKyc = userStatusInfo?.status === 4;
  useEffect(() => {
     setEnableVerfiy(makeCall && confirmCode?.length > 5 )
  }, [makeCall, confirmCode.length])

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Box w={{base: '328px', md: '700px', lg: '900px', xl: '1120px'}} className="kyc_section landlineInfo">
        <Box display={width > 768 ? 'flex' : 'block' } justifyContent="space-between">
        <Flex>
          <Text paddingBottom={width < 768 ? "15px" : "unset"} fontFamily="yekanb" fontSize="20px" color="#1652f0"
                className="title" marginLeft="5px">
            4.
          </Text>
          <Text paddingBottom={width < 768 ? "15px" : "unset"} fontFamily="yekanb" fontSize="20px" color="#1652f0"
                className="title">
            <FormattedMessage {...messages.landlineInfo} />
          </Text>
        </Flex>

          {[0, 2, 4].includes(userStatusInfo?.landline_batch?.status) && [4, 2].includes(userStatusInfo?.status) &&
          <StatusBadge
            rejectedMessage={<FormattedMessage {...messages.invalidEntry} values={{keyword: 'شماره تلفن '}}/>}
            status={userStatusInfo?.landline_batch?.status}/>}
        </Box>
        <Divider background="#dedfe2" orientation="horizontal"/>
        <Flex flexDirection={width < 768 ? "column" : "row"} marginTop={width < 768 ? "12px" : "30px"}>
          <Box w={{base: '100%', md: '50%'}} marginLeft={width > 768 ? "70px" : "unset"}>
            <Text fontFamily="yekanb" fontSize="18px" color="#59636e" marginBottom="8px" alignSelf="center">
              <FormattedMessage {...messages.enterPhone} />
            </Text>
            <Text fontSize="16px" color="#707070" marginBottom="15px" marginTop="20px" alignSelf="center"
                  textAlign="justify">
              <FormattedMessage {...messages.enterPhoneText} />
            </Text>
            <Flex marginBottom={width < 768 ? "8px" : "5px"}>
              <Box padding="8px">
                <DialPad/>
              </Box>
              <Input disabled={userStatusInfo?.status === 4} textAlign="left" w={{base: '100%', lg: '425px'}} height="57px"
                     onChange={(e) => landlineHandle(e.target.value)}
                     defaultValue={userStatusInfo?.landline_batch_data?.landline_number}
              />
            </Flex>
            <Button onClick={makeCallHandle}
                    disabled={!isValidLandline(landline) || makeCall} width={width < 1280 ? "100%" : "482px"}
                    background={pendingKyc ? "#0ecb81" : "#1652f0"}
                    opacity={(isValidLandline(landline) || pendingKyc) ? "1" : "0.4"}
                    _active={{background:  pendingKyc ? "#0ecb81" : "#1652f0"}}
                    position="relative"
                    _hover={{background: pendingKyc ? "#0ecb81" : "#1652f0"}} height="57px" color="#fff"
                    margin={width > 768 ? "5px 10px 22px " : ""}
                    marginBottom={width < 768 ? "22px" : ""}>
              {makeCall ?
                <Flex position="relative" right="-25px">
                  <Text alignSelf="center">
                    <FormattedMessage {...messages.changeLandline} />
                  </Text>
                  <Box left="-50px" position="relative">
                    <CountDownSpinner/>
                  </Box>
                </Flex> : pendingKyc ? <FormattedMessage {...messages.landlineSubmitted} /> :
                <FormattedMessage {...messages.makeCall} />
              }
            </Button>

            {!pendingKyc &&
            <Flex flexDirection={width < 1300 ? "column" : "row"} marginBottom="16px" alignItems="center">
              <Text fontSize="18px" color="#59636e" alignSelf="center" marginBottom={width < 768 ? "12px" : "unset"}>
                <FormattedMessage {...messages.phoneConfirmCode} />
              </Text>
              <Flex width="318px" justifyContent="space-between" padding={width < 768 ? "0 5px" : "unset"}
                    flexDirection="row-reverse"
                    className="landlineInfo__landline--code"
                    marginRight={width > 768 ? "15px" : " unset"}>
                <input onFocus={() => setActiveRefrence(0)} ref={section1}
                       onChange={(e) => sectionHandle(arabicSupported(e.target.value), 0)} maxLength={1}/>
                <input onFocus={() => setActiveRefrence(1)} ref={section2}
                       onChange={(e) => sectionHandle(arabicSupported(e.target.value), 1)} maxLength={1}/>
                <input onFocus={() => setActiveRefrence(2)} ref={section3}
                       onChange={(e) => sectionHandle(arabicSupported(e.target.value), 2)} maxLength={1}/>
                <input onFocus={() => setActiveRefrence(3)} ref={section4}
                       onChange={(e) => sectionHandle(arabicSupported(e.target.value), 3)} maxLength={1}/>
                <input onFocus={() => setActiveRefrence(4)} ref={section5}
                       onChange={(e) => sectionHandle(arabicSupported(e.target.value), 4)} maxLength={1}/>
                <input onFocus={() => setActiveRefrence(5)} ref={section6}
                       onChange={(e) => sectionHandle(arabicSupported(e.target.value), 5)} maxLength={1}/>
              </Flex>
            </Flex>}
          </Box>
          <Box>
            <Text fontFamily="yekanb" color="#59636e" fontSize="18px">
              <FormattedMessage {...messages.payAttention} />
            </Text>

            <List spacing={3} color="#59636e" margin="20px 0" fontSize={width < 768 ? "14px" : "16px"}>
              <ListItem>
                <Text>
                  <Icon viewBox="0 0 200 200" color="#CAD1DC" width="10px" marginLeft="8px">
                    <path
                      fill="currentColor"
                      d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
                    />
                  </Icon>
                  <FormattedMessage {...messages.phoneNote1} />
                </Text>
              </ListItem>
              <ListItem>
                <Text>
                  <Icon viewBox="0 0 200 200" color="#CAD1DC" width="10px" marginLeft="8px">
                    <path
                      fill="currentColor"
                      d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
                    />
                  </Icon>
                  <FormattedMessage {...messages.phoneNote2} />
                </Text>
              </ListItem>
              <ListItem>
                <Text>
                  <Icon viewBox="0 0 200 200" color="#CAD1DC" width="10px" marginLeft="8px">
                    <path
                      fill="currentColor"
                      d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
                    />
                  </Icon>
                  <FormattedMessage {...messages.phoneNote3} />
                </Text>
              </ListItem>
            </List>
          </Box>
        </Flex>
      </Box>


      <Box margin="0 auto" w={{base: '328px', md: '700px', lg: '900px', xl: '1120px'}} textAlign="left"
           marginTop={width > 768 ? "15px" : "unset"}>
        {userStatusInfo?.status === 0 &&

        < Button onClick={() => history.push('/kyc')}
                 w={{base: "100%", lg: "173px"}} color="#fff" fontSize="16px" fontFamily="yekanb" borderRadius="4px"
                 backgroundColor="#788ca6" height="57px" margin={width > 768 ? "0 5px" : "unset"}
                 _hover={{backgroundColor: "#788ca6"}}
                 _active={{backgroundColor: "#788ca6"}}
        >
          <FormattedMessage {...messages.backToPreviousLevel}/>
        </Button>}
        {[2, 0].includes(userStatusInfo?.status) &&
        <Button onClick={verfiyLandline}
                w={{base: "100%", lg: "227px"}} color="#fff" fontSize="16px" fontFamily="yekanb" borderRadius="4px"
                backgroundColor={pendingKyc ? "#0ecb81" : "#1652f0"} height="57px"
                disabled={!enableVerfiy }
                marginTop={width < 768 ? "12px" : "unset"}
                _hover={{backgroundColor: "#1652f0"}}
                _active={{backgroundColor: "#1652f0"}}
        >
          {pendingKyc ?
            <FormattedMessage {...messages.landlineSubmitted}/>
            : <FormattedMessage {...messages.sendToOperator}/>
          }
        </Button>}
      </Box>
    </>
  );
};

export default LandlineInfo;
