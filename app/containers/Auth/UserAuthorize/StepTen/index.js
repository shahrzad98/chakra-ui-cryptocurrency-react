import React, { useEffect, useState } from 'react';
import messages from '../messages';
import { FormattedMessage } from 'react-intl';
import Button from '../../../../components/RabexButton';
import { api } from '../../../../utils/network';
import { GetURL } from '../../../../utils/urlMap';
import Select from 'react-select';
import {
 useToast, Box, Flex, Text, Input 
} from '@chakra-ui/react';

const StepTen = ({ currentStep, onNextStep, onLoad }) => {
  const [options, setOptions] = useState([]);

  let form = {
    landline_number: '',
  };
  const toast = useToast();
  const toastIdRef = React.useRef();
  const [landLine, setLandLine] = useState('');
  const [baseInfo, setBaseInfo] = useState([]);

  useEffect(() => {
    // get user info
    api.get(GetURL('auth-step-three')).then(response => {
      setLandLine(response?.data.landline_batch_data?.landline_number);
      onLoad(response?.data.landline_batch_data?.landline_number);
      form = { ...form, landline_number: response?.data.landline_batch_data?.landline_number };
      setBaseInfo(response?.data?.base_info_batch_data.state);
      console.log("base",response?.data?.base_info_batch_data.state);
    });

    api.get(GetURL('griffin-kyc-state')).then(response => {
      const sh = response.data?.reduce((a, b) => {
        a.push({ value: b.call_code, label: b.name_local, state: b.name_local });
        return a;
      }, []);

      setOptions(sh);
    });
  }, []);

  const [landLineCode, setLandLineCode] = useState('021');

  const handleTextChange = e => {
    if (e.length >= 11) {
      e = e.slice(0, 11);
    }
    form = { ...form, landline_number: e };
    onLoad(e);
    setLandLine(e);
  };

  const validate = () => {
    if (landLine?.length != 11) {
      toastIdRef.current = toast({ description: 'شماره تماس بصورت صحیح وارد شود', status: 'error' });
    } else {
      onNextStep(currentStep + 1);
      toastIdRef.current = toast({ description: 'شماره تماس ثبت شد', status: 'success' });
    }
  };

  const changeLandLineCode = code => {
    setLandLineCode(code);
  };
  const customStyles = {
    control: base => ({
      ...base,
      height: 60,
      minHeight: 60,
    }),
  };
  return (
    <>
      <Text
        marginTop={{ base: '28px', xl: '30px' }}
        marginBottom={{ base: '29px', xl: '22px' }}
        color="#fff"
        textAlign="center"
        fontSize={{ base: '24px', xl: '36px' }}
      >
        <FormattedMessage {...messages.Landline} />
      </Text>
      <Box
        padding="40px 26px 28px 26px"
        textAlign="center"
        bg="white"
        borderRadius="sm"
        margin="auto"
        w={{ base: '96%', xl: '520px' }}
      >
        <Text textAlign="center" fontSize="16px" color="#050f19">
          <FormattedMessage {...messages.Landlinecallsrequired} />
        </Text>
        <Text textAlign="center" margin={{xl:'20px 0',base:"10px 0"}} fontFamily="yekan" fontSize="16px" color="#050f19">
          <FormattedMessage {...messages.landingPhone} />
        </Text>

        <Text textAlign="right" color="#050f19" fontSize={{ xl: '16px', base: '12px' }} fontFamily="yekan">
          <FormattedMessage {...messages.city} />
        </Text>

        <Select
          options={options}
          fontFamily="yekan"
          color="#050f19"
          fontSize="24px"
          value={options?.filter(option => (baseInfo ? option.label == baseInfo : ''))}
          styles={customStyles}
          components={{
            IndicatorSeparator: () => null,
          }}
          placeholder="استان خود را انتخاب نمایید"
          onChange={e => {
            setBaseInfo(e.state);
            setLandLineCode(e.value);
          }}
        />
        <Text
          textAlign="right"
          marginTop="23px"
          fontFamily="yekan"
          color="#050f19"
          fontSize={{ xl: '16px', base: '12px' }}
        >
          <FormattedMessage {...messages.phoneNumber} />
        </Text>
        <Flex>
          <Input
            className="form-control"
            borderRadius="0 4px 4px 0px"
            width="85%"
            border="1px"
            marginTop="4px"
            type="number"
            height="60px"
            value={landLine?.slice(3)}
            onChange={event => {
              handleTextChange(landLineCode + event.target.value);
            }}
          />
          <Text
            background="#fff"
            border="1px solid #eceff1"
            color="#708599"
            margin="0"
            marginTop="4px"
            display="grid"
            alignItems="center"
            width="15%"
            fontSize="20px"
            textAlign="center"
          >
            {landLineCode}
          </Text>
        </Flex>

        <Button
          margin="22px 0 0 0 "
          background="#1652F0"
          color="#fff"
          borderRadius="4px"
          padding="20px 0"
          fontSize={{ base: '12px', xl: '20px' }}
          height={{ base: '47px', xl: '60px' }}
          width={{ xl: '100%', base: '100%' }}
          text={<FormattedMessage {...messages.Continues} />}
          onClick={e => {
            validate();
          }}
        />
      </Box>
    </>
  );
};

export default StepTen;
