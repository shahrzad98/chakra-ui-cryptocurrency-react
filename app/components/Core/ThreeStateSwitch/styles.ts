import styled from 'styled-components';

export const Switch = styled.div`
  position: relative;
  height: 20px;
  width: 50px;
  background-color: #73768c;
  border-radius: 100px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3), 0 1px rgba(255, 255, 255, 0.1);
`;

export const SwitchRadio = styled.input`
  display: none;
`;

export const SwitchSelection = styled.span`
  display: block;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 14px;
  height: 14px;
  background: #fff;
  border-radius: 100px;
  margin: 3px;
  transition: left 0.25s ease-out;
`;

export const SwitchLabel = styled.label`
  position: relative;
  z-index: 2;
  float: left;
  width: 15px;
  font-size: 11px;
  color: transparent;
  text-align: center;
  cursor: pointer;

  ${SwitchRadio}:checked + & {
    transition: 0.15s ease-out;
  }
`;
