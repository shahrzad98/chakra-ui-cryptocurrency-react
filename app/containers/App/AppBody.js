import React from 'react';
import {useSelector} from 'react-redux';
import styled from 'styled-components';

const FullscreenBody = styled.div`
  filter: ${props => (props.visible ? 'blur(6px) brightness(0.5);' : 'none')};
  transition: 1s linear;
  position: relative;
  z-index: 1;
  background: #f4f6fa;
`;
const AppBody = ({children}) => {
  const {visible} = useSelector(state => {
    if (state.blurredModal) {
      return {
        err: state.blurredModal.props,
        visible: state.blurredModal.visible,
      };
    }
    return {err: null, visible: false};
  });

  return <FullscreenBody visible={visible}>{children}</FullscreenBody>;
};

export default AppBody;
