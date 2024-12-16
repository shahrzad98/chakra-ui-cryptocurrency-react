/**
 *
 * BlurredModal
 *
 */

import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useInjectReducer } from 'utils/injectReducer';
import styled from 'styled-components';
import reducer from './reducer';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../containers/BlurredModal/actions';
import { Link } from '@chakra-ui/layout';
const ModalInnerBody = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 100vw;

  transform: translate(-50%, -50%);
  padding: 10px;
  text-align: center;
  margin: 0 auto;
  z-index: 999;

  .close-icon {
    transition: transform 0.6s;
    font-size: 20pt;
    color: #ff0000;
    position: fixed;
    right: 0;
  }
  .close-icon:hover {
    transform: scale(1.5);
  }
`;

function useOutsideAlerter(ref) {
  const dispatch = useDispatch();
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        dispatch(closeModal());
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}
const BlurredModal = () => {
  const dispatch = useDispatch();
  const { Component, visible, props } = useSelector(state => {
    if (state.blurredModal) {
      return {
        Component: state.blurredModal.Component,
        visible: state.blurredModal.visible,
        props: state.blurredModal.props,
      };
    }
    return { Component: null, visible: false, props: {} };
  });

  useInjectReducer({ key: 'blurredModal', reducer });

  const CloseModal = () => {
    if (visible) dispatch(closeModal());
  };

  const ref = useRef(null);
  useOutsideAlerter(ref);

  return (
    <>
      {visible ? (
        <>
          <ModalInnerBody ref={ref}>
            <Component {...props} />
          </ModalInnerBody>
          <Link href="" bg="black" color="white" onClick={CloseModal}>
            x
          </Link>
        </>
      ) : null}{' '}
    </>
  );
};

BlurredModal.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

export default BlurredModal;
