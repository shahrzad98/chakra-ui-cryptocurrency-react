/**
 *
 * Toast
 *
 */

import React, { useEffect } from 'react';
import { useInjectReducer } from '../../utils/injectReducer';
import reducer from './reducer';
import { Button, useToast } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

export function Toast() {
  useInjectReducer({ key: 'toast', reducer });

  const toast = useToast();

  const { title, position, status, counter } = useSelector(state => {
    if (state.toast) {
      return {
        title: state?.toast?.title,
        position: state?.toast?.position,
        status: state?.toast?.status,
        counter: state?.toast?.counter,
      };
    }
    return { title: null, position: null, status: null };
  });

  useEffect(() => {
    if (title) {
      toast({
        title: title,
        duration: 900,
        status: status,
        position: position,
        isClosable: true,
      });
    }
  }, [counter, title]);

  return <></>;
}

export default Toast;
