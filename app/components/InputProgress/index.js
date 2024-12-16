/**
 *
 * InputProgress
 *
 */

import React, {useState, useEffect } from 'react';
import {
  CircularProgressbar,
  buildStyles,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Input from '../Input';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, Stack, VStack, Button } from '@chakra-ui/react';
import Img from '../Img';
import { closeModal } from '../../containers/BlurredModal/actions';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import messages from '../../containers/User/messages';
import TowfaGoogleModal from '../TwoFaGoogleModal';
import { setBlur } from 'containers/BlurredModal/actions';

function InputProgress() {
  const [ProgressValue, setProgressValue] = useState(120);
  const [ContinueButton, setContinueButton] = useState('disabled');
  const dispatch = useDispatch();

  const InsideProgress = styled.div`
    position: absolute;
    right: 15px;
    z-index: 99999;
    top: 12px;
  `;
  useEffect(() => {
    if (ProgressValue > 0) {
      const timer = setInterval(() => {
        setProgressValue(ProgressValue - 1);
      }, 1000);

      return () => {
        if (timer) clearInterval(timer);
      };
    }
  }, [ProgressValue]);

  const ChangeCodeLength = e => {
    if (e.length == 6) setContinueButton('');
    else setContinueButton('disabled');
  };

  const NextStep = () => {
    dispatch(closeModal());
    dispatch(
      setBlur(TowfaGoogleModal, {
        message: 'ssss',
      }),
    );
  };

  return (
    <>
      <Box paddingBottom="20px" minHeight="300px" w="100%" bg="#fff">
        <Text padding="20px 0 0 0" fontSize="24px">
          {<FormattedMessage {...messages.TowFa} />}
        </Text>

        <Text fontFamily="yekan" padding="15px 0 0 0">
          {<FormattedMessage {...messages.ConfirmTowFa} />}
        </Text>

        <Box padding="20px" background="#FAFAFA">
          <Stack alignItems="center" direction={['row']} marginTop="20px">
            <Box textAlign="right" w={'85%'}>
              <Text color="#708599" padding="0 20px 0 0">
                {<FormattedMessage {...messages.getSixCode} />}
              </Text>
              <Box position="relative">
                <InsideProgress>
                  <Box w="15px">
                    <CircularProgressbar
                      value={ProgressValue}
                      maxValue="120"
                      minValue="0"
                      counterClockwise={true}
                      strokeWidth={50}
                      styles={buildStyles({
                        strokeLinecap: 'butt',
                        trailColor: '#fff',
                        position: 'absolute',
                      })}
                    />
                  </Box>
                </InsideProgress>
              </Box>
              <Input
                border="1px solid #b5c0ca"
                background="#fff"
                type="number"
                onChange={e => {
                  ChangeCodeLength(e.target.value);
                }}
              />
            </Box>
            <Box textAlign="right" w={'15%'}>
              <Img
                margin="auto 0 auto auto"
                src={require('images/mobile.svg')}
              />
            </Box>
          </Stack>

          <VStack w="100%" marginTop="20px">
            <Button
              height="52px"
              disabled={ContinueButton}
              background="#1652f0"
              color="#fff"
              w="100%"
              onClick={e => {
                NextStep();
              }}
            >
              {<FormattedMessage {...messages.continue} />}
            </Button>
            <Button
              height="52px"
              background="#fff"
              border="1px solid #d7dbdb"
              w="100%"
            >
              {<FormattedMessage {...messages.resendCode} />}
            </Button>
          </VStack>
        </Box>
      </Box>
    </>
  );
}

InputProgress.propTypes = {};

export default InputProgress;
