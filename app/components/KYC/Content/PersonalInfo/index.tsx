import * as React from 'react';
import {FC, useEffect, useState} from 'react';
import {FormattedMessage} from 'react-intl';
import messages from '../../messages'
import {
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  Input,
  Text,
} from '@chakra-ui/react';
import {useWindowSize} from 'helper/useWindowSize';
import {useDispatch} from 'react-redux';
import {setEditingBaseInfo, setPersonalInfo} from 'containers/KYC/redux/actions';
import DatePicker, {DateObject} from 'react-multi-date-picker';
import CalendarDefault from 'images/kyc/calendar_default.svg';
import Calendar from 'images/kyc/calendar.svg';
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import {
  arabicSupported,
  isEnglish,
  isValidEmail,
  isValidNationalCode,
  isValidNumber,
  isValidPostalCode
} from 'utils/validation';
import ErrorMessage from 'components/ErrorMessage';
import StatusBadge from '../Warning/StatusBadge';
import {size} from 'lodash';
import {arabicToEnglishConvertor} from 'helper/MiscHelper';

type PersonalInfoProps = {
  userStatusInfo: any
};
const PersonalInfo: FC<PersonalInfoProps> = ({userStatusInfo}) => {
  const {width} = useWindowSize();
  const dispatch = useDispatch();
  const [dateSelected, setDateSelected] = useState(false);
  const [datePickerValue, setDatePickerValue] = useState<any>();

  const [info, setInfo] = useState<{
    national_id: string;
    booklet_id: string;
    email: string;
    postal_code: string;
    address: string;
    birthdate_day?: number;
    birthdate_month?: number;
    birthdate_year?: number;
  }>({
    national_id: '',
    booklet_id: '',
    email: '',
    postal_code: '',
    address: '',
    birthdate_day: undefined,
    birthdate_month: undefined,
    birthdate_year: undefined,
  });

  useEffect(() => {
    dispatch(setPersonalInfo(info))
  }, [info])

  useEffect(() => {
    setDatePickerValue(
      `${userStatusInfo?.base_info_batch_data?.birthdate_year}/${userStatusInfo?.base_info_batch_data?.birthdate_month}/${userStatusInfo?.base_info_batch_data?.birthdate_day}`
    )
  }, [userStatusInfo])

  const isValidAddress = !isEnglish(info?.address) && (info?.address.length > 19)

  function changeHandle(value, field) {
    dispatch(setEditingBaseInfo(true))
    setInfo({...info, [field]: ''})
    const inputs = document.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) {
      inputs[i]!.onkeydown = function (event) {
        var key = event.keyCode || event.charCode;
        if (key === 9) {
          setInfo({...info, [field]: arabicToEnglishConvertor(value)})
        }
      }
    }
  }

  useEffect(() => {
    setInfo({
      ...info,
      birthdate_day: parseInt(arabicSupported(new DateObject(datePickerValue).format('D'))),
      birthdate_month: parseInt(arabicSupported(new DateObject(datePickerValue).format('M'))),
      birthdate_year: parseInt(arabicSupported(new DateObject(datePickerValue).format('YYYY')))
    })
  }, [datePickerValue])


  useEffect(() => {
    if (userStatusInfo)
    setInfo({
      national_id: userStatusInfo?.base_info_batch_data?.national_id,
      booklet_id: userStatusInfo?.base_info_batch_data?.booklet_id ,
      email: userStatusInfo?.base_info_batch_data?.email ,
      postal_code: userStatusInfo?.base_info_batch_data?.postal_code ,
      address: userStatusInfo?.base_info_batch_data?.address ,
      birthdate_day: userStatusInfo?.base_info_batch_data?.birthdate_day,
      birthdate_month: userStatusInfo?.base_info_batch_data?.birthdate_month,
      birthdate_year: userStatusInfo?.base_info_batch_data?.birthdate_year,
    })
  }, [userStatusInfo])

  const pendingKyc = userStatusInfo?.status === 4;

  return (
    <Box w={{base: '328px', md: '700px', lg: '900px', xl: '1120px'}} className="kyc_section personalInfo">
      <Box display={width > 768 ? 'flex' : 'block'} justifyContent="space-between">
        <Flex>
          <Text paddingBottom={width < 768 ? "15px" : "unset"} fontFamily="yekanb" fontSize="20px" color="#1652f0"
                className="title" marginLeft="5px">
            1.
          </Text>
          <Text paddingBottom={width < 768 ? "15px" : "unset"} fontFamily="yekanb" fontSize="20px" color="#1652f0"
                className="title">
            <FormattedMessage {...messages.personlainfo} />
          </Text>
        </Flex>
        {[0, 2, 4].includes(userStatusInfo?.base_info_batch?.status) && [4, 2].includes(userStatusInfo?.status) &&
        <StatusBadge rejectedMessage={<FormattedMessage {...messages.invalidEntry} values={{keyword: 'مشخصات '}}/>}
                     status={userStatusInfo?.base_info_batch?.status}/>}
      </Box>

      <Divider _hover={{background: "#dedfe2"}} background="#dedfe2" orientation="horizontal"/>
      {userStatusInfo?.status === 2 && userStatusInfo?.base_info_batch?.reasons && <Box>
        <Text fontSize="16px" fontFamily="yekanb" color="#e91e63" margin="20px 0 3px ">
          <FormattedMessage {...messages.operatorComments} />
        </Text>
        <Text color="#59636e">
          {userStatusInfo?.base_info_batch?.reasons?.map(el => el.reason).join(' ')}
        </Text>
      </Box>}
      <Grid templateColumns="repeat(8, 1fr)" gap={1} className="personalInfo--info">
        <GridItem position="relative" gridColumn={{base: "span 8", lg: "span 2"}}>
          <Text textAlign="right" fontFamily="yekanb" className="label" margin="0 10px" alignSelf="center">
            <FormattedMessage {...messages.nationalId} />
          </Text>
          <Input
            dir="ltr"
            placeholder='لطفا کد ملی خود را وارد کنید'
            defaultValue={userStatusInfo?.base_info_batch_data?.national_id || null}
            disabled={pendingKyc}
            isInvalid={size(info?.national_id) > 0 && !isValidNationalCode(info?.national_id)}
            errorBorderColor='#f44336'
            backgroundColor={info?.national_id?.length || userStatusInfo?.base_info_batch_data?.national_id?.length ? '#f5f5f9' : '#fff'}
            onChange={(e) => changeHandle(e.target.value, 'national_id')}
            onBlur={(e) => setInfo({...info, national_id: arabicToEnglishConvertor(e.target.value)})} width="97%"/>
          {!isValidNationalCode(info?.national_id) && info?.national_id ?
            <ErrorMessage>
              <FormattedMessage {...messages.validationError} values={{keyword: 'کد ملی'}}/>
            </ErrorMessage> : null
          }

        </GridItem>
        <GridItem position="relative" gridColumn={{base: "span 8", lg: "span 2"}}>
          <Text textAlign="right" fontFamily="yekanb" className="label" margin="0 10px" alignSelf="center">
            <FormattedMessage {...messages.bookletId} />
          </Text>
          <Input
            dir="ltr"
            disabled={pendingKyc}
            defaultValue={userStatusInfo?.base_info_batch_data?.booklet_id || null}
            placeholder="لطفا شماره شناسنامه خود را وارد کنید"
            isInvalid={size(info?.booklet_id) > 0 && !isValidNumber(info?.booklet_id)} errorBorderColor='#f44336'
            backgroundColor={info?.booklet_id.length || userStatusInfo?.base_info_batch_data?.booklet_id.length ? '#f5f5f9' : '#fff'}
            onChange={(e) => changeHandle(e.target.value, 'booklet_id')}
            onBlur={(e) => setInfo({...info, booklet_id: arabicToEnglishConvertor(e.target.value)})} width="97%"/>
          {!isValidNumber(info?.booklet_id) && info?.booklet_id &&
          <ErrorMessage>
            <FormattedMessage {...messages.validationError} values={{keyword: 'شماره شناسنامه'}}/>
          </ErrorMessage>
          }

        </GridItem>
        <GridItem position="relative" gridColumn={{base: "span 8", lg: "span 2"}}>
          <Text textAlign="right" fontFamily="yekanb" className="label" margin="0 10px" alignSelf="center">
            <FormattedMessage {...messages.birthday} />
          </Text>
          <Flex width="97%" position="relative">
            <Box height="auto" alignSelf="center" position="absolute" right="28px">
              {
                dateSelected ?
                  <Calendar/> : <CalendarDefault/>
              }
            </Box>
            <DatePicker
              disabled={pendingKyc}
              inputClass={`${(info?.birthdate_year || userStatusInfo?.base_info_batch_data?.birthdate_year.length) && 'personalInfo__datePicker--activeDate'} personalInfo__datePicker--input`}
              placeholder="تاریخ تولد خود را وارد کنید"
              calendar={persian}
              locale={persian_fa}
              style={{
                height: "24px",
                borderRadius: "8px",
                fontSize: "14px",
                padding: "3px 10px"
              }}
              value={userStatusInfo?.base_info_batch_data?.birthdate_day && datePickerValue}
              onChange={setDatePickerValue}
              onFocusedDateChange={() => setDateSelected(true)}
            />
          </Flex>
        </GridItem>
        <GridItem position="relative" gridColumn={{base: "span 8", lg: "span 2"}}>
          <Text textAlign="right" fontFamily="yekanb" className="label" margin="0 10px" alignSelf="center">
            <FormattedMessage {...messages.email} />
          </Text>
          <Input
            dir="ltr" placeholder="test@gmail.com"
            disabled={pendingKyc}
            defaultValue={userStatusInfo?.base_info_batch_data?.email || null}
            className="personalInfo__email--input"
            isInvalid={size(info?.email) > 0 && !isValidEmail(info?.email)}
            errorBorderColor='#f44336'
            backgroundColor={info?.email.length | userStatusInfo?.base_info_batch_data?.email.length ? '#f5f5f9' : '#fff'}
            onChange={(e) => changeHandle(e.target.value, 'email')}
            onBlur={(e) => setInfo({...info, email: e.target.value})} width="97%"/>
          {!isValidEmail(info?.email) && info?.email &&
          <ErrorMessage>
            <FormattedMessage {...messages.validationError} values={{keyword: 'ایمیل'}}/>
          </ErrorMessage>
          }

        </GridItem>
        <GridItem marginTop={width > 768 ? "20px" : "unset"} position="relative"
                  gridColumn={{base: "span 8", lg: "span 2"}}>
          <Text textAlign="right" fontFamily="yekanb" className="label" margin="0 10px" alignSelf="center">
            <FormattedMessage {...messages.postalCode} />
          </Text>
          <Input
            dir="ltr"
            disabled={pendingKyc}
            defaultValue={userStatusInfo?.base_info_batch_data?.postal_code || null}
            placeholder="کد پستی را وارد کنید"
            isInvalid={size(info?.postal_code) > 0 && !isValidPostalCode(info?.postal_code)}
            backgroundColor={info?.postal_code.length | userStatusInfo?.base_info_batch_data?.postal_code.length ? '#f5f5f9' : '#fff'}
            onChange={(e) => changeHandle(e.target.value, 'postal_code')}
            onBlur={(e) => setInfo({...info, postal_code: arabicToEnglishConvertor(e.target.value)})} width="97%"/>
          {!isValidPostalCode(info?.postal_code) && info?.postal_code &&
          <ErrorMessage>
            <FormattedMessage {...messages.validationError} values={{keyword: 'کد پستی'}}/>
          </ErrorMessage>
          }
        </GridItem>
        <GridItem marginTop={width > 768 ? "20px" : "unset"} position="relative"
                  gridColumn={{base: "span 8", lg: "span 6"}}>
          <Text textAlign="right" fontFamily="yekanb" className="label" margin="0 10px" alignSelf="center">
            <FormattedMessage {...messages.address} />
          </Text>
          <Input
            disabled={pendingKyc}
            defaultValue={userStatusInfo?.base_info_batch_data?.address || null}
            placeholder="تهران، سعادت آباد، سرو شرقی، ساختمان افرا، پلاک 98، طبقه 6"
            className="personalInfo__address-input"
            isInvalid={size(info?.address) > 0 && !isValidAddress} errorBorderColor='#f44336'
            backgroundColor={info?.address.length | userStatusInfo?.base_info_batch_data?.address.length ? '#f5f5f9' : '#fff'}
            width={width < 768 ? '97%' : '99%'}
            onChange={(e) => changeHandle(e.target.value, 'address')}
            onBlur={(e) => setInfo({...info, address: e.target.value})}/>

          {!isValidAddress && info?.address &&
          <ErrorMessage>
            <FormattedMessage {...messages.validationError} values={{keyword: 'آدرس'}}/>
          </ErrorMessage>
          }
        </GridItem>
      </Grid>
    </Box>
  );
};

export default PersonalInfo;
