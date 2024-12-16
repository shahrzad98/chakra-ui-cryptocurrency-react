import React, { useState, useEffect } from 'react';

import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import StepOne from './StepOne/StepOne';
import StepTwo from './StepTwo/index';
import StepThree from './StepThree/index';
import StepFour from './StepFour';
import StepFive from './StepFive';
import StepSeven from './StepSeven';
import StepEight from './StepEight';
import StepTen from './StepTen';
import StepEleven from './StepEleven';
import StepTwelve from './StepTwelve';
import StepThirteen from './StepThirteen';
import { useHistory, useParams } from 'react-router-dom';
import RXMain from '../../../components/RXMain';
import { api } from '../../../utils/network';
import { GetURL } from '../../../utils/urlMap';
import Drawer from 'components/Drawer';
import DataPanel from 'components/DataPanel';

import { LanguageTools } from '../../../utils/languageTools';
import { Box, Flex, Text, Link } from '@chakra-ui/layout';
import Stepper from '../../../components/Stepper';
import { LogoWhite } from '../../../images/icon';
import { kycGuide } from '../../../guides';

const BASE_LEVEL = 1;
const LEVEL_ONE = 4;
const LEVEL_TWO = 6;
const LEVEL_THREE = 7;
const LEVEL_FOUR = 11;

const UserAuthorization = () => {
  // const useQuery = () => new URLSearchParams(useLocation().search);

  // const query = useQuery();
  const history = useHistory();
  const { step } = useParams();
  const languageTools = new LanguageTools();
  // const flowStatus = {
  //   baseInfo: 0,
  //   document: 0,
  //   landline: 0,
  // }

  const [Name, setName] = useState();
  const [level, setLevel] = useState(0);

  const hasProblem = flowStatus => {
    if (flowStatus?.document == 2 || flowStatus?.landline == 2 || flowStatus?.baseInfo == 2) {
      return true;
    }
    return false;
  };

  const calculateFlowStep = (s, flowStatus) => {
    console.log('flow status : ', flowStatus, s, hasProblem(flowStatus));
    if (hasProblem(flowStatus) && s == LEVEL_FOUR) return LEVEL_FOUR;
    else if (flowStatus.kycStatus == 4) {
      return LEVEL_FOUR;
    } else if (
      flowStatus.baseInfo != 0 &&
      flowStatus.document != 0 &&
      flowStatus.landline != 0 &&
      !hasProblem(flowStatus)
    ) {
      return LEVEL_THREE;
    } else if (flowStatus.baseInfo != 0 && flowStatus.document != 0 && !hasProblem(flowStatus)) {
      return LEVEL_TWO;
    } else if (flowStatus.baseInfo != 0 && !hasProblem(flowStatus)) {
      return LEVEL_ONE;
    } else if (hasProblem(flowStatus)) {
      if (flowStatus.baseInfo == 2 && s >= BASE_LEVEL && s < LEVEL_ONE) {
        return LEVEL_ONE;
      } else if (flowStatus.document == 2 && s >= LEVEL_TWO && s < LEVEL_THREE) {
        return LEVEL_TWO;
      } else if (flowStatus.landline == 2 && s >= LEVEL_THREE) {
        return LEVEL_THREE;
      }
    }
    return s;
  };

  useEffect(() => {
    console.log('checkpoint 0 : ', step);
    // get user info
    api.get(GetURL('auth-step-three')).then(response => {
      setName(`${response.data.base_info_batch_data.first_name} ${response.data.base_info_batch_data.last_name}`);
      let flowStatus = {
        baseInfo: response?.data?.base_info_batch?.status || 0,
        document: response?.data?.documents_batch?.status || 0,
        landline: response?.data?.landline_batch?.status || 0,
        kycStatus: response?.data?.status,
      };

      // console.log('base info', response?.data?.base_info_batch?.status);
      // console.log('document', response?.data?.documents_batch?.status);
      // console.log('landline', response?.data?.landline_batch?.status);
      // console.log('status : ', response?.data?.status);
      let chosenLevel = calculateFlowStep(step, flowStatus);
      setLevel(chosenLevel);
      stateStatus(step, chosenLevel);
    });
  }, []);

  const [form, setForm] = useState({ landLineNumber: '' });
  const nextStep = s => {
    // const from = query.get('from');
    // const to = query.get('to');
    // let queries = history.location.search;
    // if (s === from) {
    //   s = to;
    //   queries = '';
    // }
    history.push(`/kyc/authorization/${s}${queries}`, {
      landLineNumber: form.landLineNumber,
    });
  };

  const previousStep = s => {
    if (s >= 1) {
      history.push(`/kyc/authorization/${s - 1 || ''}${history.location.search}`, {
        landLineNumber: form.landLineNumber,
      });
    }
  };

  const stateStatus = (s, chosenLevel) => {
    switch (chosenLevel) {
      case BASE_LEVEL:
        if (!(s >= BASE_LEVEL && s < LEVEL_ONE)) history.push(`/kyc/authorization/${BASE_LEVEL}`);
        break;

      case LEVEL_ONE:
        if (!(s >= LEVEL_ONE && s < LEVEL_TWO)) history.push(`/kyc/authorization/${LEVEL_ONE}`);
        break;

      case LEVEL_TWO:
        if (!(s >= LEVEL_TWO && s < LEVEL_THREE)) history.push(`/kyc/authorization/${LEVEL_TWO}`);
        break;

      case LEVEL_THREE:
        if (!(s >= LEVEL_THREE && s < LEVEL_FOUR)) history.push(`/kyc/authorization/${LEVEL_THREE}`);
        break;

      case LEVEL_FOUR:
        if (!(s >= LEVEL_FOUR)) history.push(`/kyc/authorization/${LEVEL_FOUR}`);
        break;

      default:
        break;
    }
  };

  const selectStep = s => {
    switch (parseInt(s)) {
      case 1:
        return <StepOne currentStep={1} onNextStep={nextStep} />;

      case 2:
        return <StepTwo currentStep={2} onNextStep={nextStep} />;

      case 3:
        return <StepThree currentStep={3} onNextStep={nextStep} />;

      case 4:
        return <StepFive currentStep={4} onNextStep={nextStep} />;

      case 5:
        return <StepSeven currentStep={5} onNextStep={nextStep} />;

      case 6:
        return <StepEight currentStep={6} onNextStep={nextStep} />;

      case 7:
        return (
          <StepTen
            currentStep={7}
            onNextStep={nextStep}
            onLoad={response => {
              console.log(response);
              setForm({ ...form, landLineNumber: response });
            }}
          />
        );

      case 8:
        return <StepEleven currentStep={8} onNextStep={nextStep} />;

      case 9:
        return <StepTwelve currentStep={9} onNextStep={nextStep} />;

      case 10:
        return <StepFour currentStep={10} onNextStep={nextStep} />;

      case 11:
        return <StepThirteen currentStep={11} onNextStep={nextStep} />;

      case 12:
        return history.push('/dashboard');

      default:
        return <StepOne currentStep={1} onNextStep={nextStep} />;
    }
  };
  const handleActiveStep = n => {
    // pls, refactor this function
    // eslint-disable-next-line radix
    switch (parseInt(n)) {
      case 0:
      case 1:
        return 1;
      case 2:
      case 3:
      case 4:
      case 5:
        return 2;
      case 6:
        return 3;
      case 7:
      case 8:
        return 4;
      case 9:
        return 5;
      case 10:
        return 6;
      case 11:
        return 7;
      default:
        return n;
    }
  };

  const [isOpenDrawer, setIsOpenDrawer] = React.useState(false);

  return (
    <>
      {level && (
        <>
          <Drawer
            isOpen={isOpenDrawer}
            onClose={() => setIsOpenDrawer(false)}
            title={<FormattedMessage {...messages.guide} />}
          >
            <DataPanel data={kycGuide} />
          </Drawer>
          <Flex height="74px" justifyContent="center" alignItems="center">
            <Flex
              width={{ xl: '87px', base: '62px' }}
              height={{ xl: '40px', base: '36px' }}
              marginRight="20px"
              paddingLeft="15px"
            >
              <LogoWhite />
            </Flex>

            <Box height="40px" borderLeft="1px solid #fff" />

            <Text
              textAlign="center"
              marginTop="2px"
              color="#fff"
              marginRight="15px"
              fontSize={{ xl: '24px', base: '14px' }}
            >
              {`${Name}`}
            </Text>
          </Flex>
          <Box display={{ base: 'none', lg: 'block' }} borderBottom="1px solid #3156fd"></Box>

          <Box display={{ base: 'block', lg: 'none' }} opacity="0.1" borderBottom="1px solid #fff"></Box>

          <RXMain>
            <Box margin="0 auto" dir={languageTools.Dir}>
              <FormattedMessage {...messages.restoretwofa}>
                {msg => (
                  <Helmet>
                    <title>{msg}</title>
                  </Helmet>
                )}
              </FormattedMessage>
              <Box display="grid" justifyContent="center">
                {selectStep(step)}
                <Box
                  display={step < 10 ? 'block' : 'none'}
                  margin={{ xl: '24px 0', base: '15px 0' }}
                  width="100%"
                  dir="rtl"
                >
                  <Stepper
                    steps={7}
                    activeStep={handleActiveStep(step)}
                    // eslint-disable-next-line prettier/prettier
                    nextButton={
                      <Box
                        justifySelf="end"
                        marginLeft={{ xl: '5px', base: '20px' }}
                        cursor="pointer"
                        onClick={() => {
                          setIsOpenDrawer(true);
                        }}
                      >
                        راهنما
                      </Box>
                      // eslint-disable-next-line prettier/prettier
                    }
                    backButton={
                      step ? (
                        <Box
                          justifySelf="start"
                          marginRight={{ xl: '5px', base: '20px' }}
                          cursor="pointer"
                          onClick={() => {
                            // eslint-disable-next-line radix
                            previousStep(parseInt(step));
                          }}
                        >
                          مرحله قبل
                        </Box>
                      ) : (
                        <Box
                          justifySelf="start"
                          marginRight={{ xl: '5px', base: '20px' }}
                          cursor="pointer"
                          onClick={() => {
                            history.push('/dashboard');
                          }}
                        >
                          خانه
                        </Box>
                      )
                    }
                  />
                </Box>
                <Box
                  textAlign="center"
                  display={step == 10 ? 'block' : 'none'}
                  margin={{ xl: '10px 0', base: '15px 0' }}
                  width="100%"
                  dir="rtl"
                >
                  <Link
                    color="#fff"
                    _active={{ color: '#fff' }}
                    _hover={{ color: '#fff' }}
                    role="button"
                    textAlign="center"
                    margin="0 auto"
                    fontSize={{ base: '12px', xl: '14px' }}
                    onClick={() => history.push('/dashboard')}
                  >
                    {<FormattedMessage {...messages.BackStep} />}
                  </Link>
                </Box>
              </Box>
            </Box>
          </RXMain>
        </>
      )}
    </>
  );
};

export default UserAuthorization;
