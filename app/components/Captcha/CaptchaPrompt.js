import React, { useState, useEffect } from 'react';
import {
  Button,
  Box,
  VStack,
  StackDivider,
  Flex,
  Center,
  HStack,
  PinInput,
  PinInputField,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../containers/BlurredModal/actions';
import { LanguageTools } from '../../utils/languageTools';
import { api } from '../../utils/network';
import { GetURL } from '../../utils/urlMap';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import messages from './messages';
import { FormattedMessage } from 'react-intl';

const CaptchaImage = styled.img`
  object-fit: cover;
  max-width: 100%;
  border: 1px solid #ef7583;
  padding: 5px;
  border-radius: 100px;
  box-shadow: 0 7px 25px 0px rgba(239, 117, 131, 0.5);
`;

const CaptchaPrompt = props => {
  const languageTools = new LanguageTools();
  const dispatch = useDispatch();

  const [captcha, setCaptcha] = useState({
    image: null,
    id: null,
  });

  const getCaptcha = () => {
    api.get(GetURL('captcha')).then(response => {
      if (response.data.data) {
        setCaptcha({
          ...captcha,
          image: `data:image/png;base64,${response.data.data.image}`,
          id: response.data.data.captcha,
        });
      }
    });
  };

  useEffect(() => {
    getCaptcha();
  }, []);

  const submitCaptcha = secret => {
    api
      .post(GetURL('solve-captcha'), {
        secret: secret,
        captcha_id: captcha.id,
      })
      .then(response => {
        close();
      });
  };
  const close = () => {
    dispatch(closeModal());
  };
  return (
    <VStack
      bg="gray.100"
      p="3"
      rounded="md"
      dir={languageTools.Dir}
      divider={<StackDivider borderColor="gray.200" />}
    >
      <Box>{props?.message}</Box>

      <Box>
        <Flex>
          <CaptchaImage src={captcha.image} />
          <Center m="2.5">
            <Button colorScheme="teal" variant="link" onClick={getCaptcha}>
              <FontAwesomeIcon icon={['fa', 'redo-alt']} />
            </Button>
          </Center>
        </Flex>
      </Box>

      <Box>
        <HStack dir="ltr">
          <PinInput
            type="alphanumeric"
            onComplete={e => {
              submitCaptcha(e);
            }}
          >
            <PinInputField bg="blue.100" />
            <PinInputField bg="blue.100" />
            <PinInputField bg="blue.100" />
            <PinInputField bg="blue.100" />
            <PinInputField bg="blue.100" />
            <PinInputField bg="blue.100" />
          </PinInput>
        </HStack>
      </Box>

      <Box>
        <Button onClick={close}>
          <FormattedMessage {...messages.continue} />
        </Button>
      </Box>
    </VStack>
  );
};

export default CaptchaPrompt;
