import React from 'react';
import styled from 'styled-components';

type ValueType = {
  value: number | string;
};
type PercentPropsType = {
  hasError: boolean;
  isActive: boolean;
};

const Percent = styled.div`
  font-size: 11px;
  margin-top: 1px;
  font-weight: bold;
  grid-area: percent;
  align-self: center;
  justify-self: center;
  transition: all 0.2s;
  font-family: 'yekan', sans-serif;
  opacity: ${({ isActive }: PercentPropsType) => (isActive ? 1 : 0)};
  color: ${({ hasError }: PercentPropsType) => (hasError ? '#ff7272' : '#2b6af0')};
  visibility: ${({ isActive }: PercentPropsType) => (isActive ? 'visible' : 'hidden')};
  transform: ${({ isActive }: PercentPropsType) => (isActive ? 'translateY(0px)' : 'translateY(5px)')};
`;

type ProgressPropsType = {
  isActive: boolean;
};

const Progress = styled.div`
  height: 4px;
  display: grid;
  direction: ltr;
  overflow: hidden;
  justify-self: end;
  align-self: center;
  grid-area: progress;
  border-radius: 50px;
  transition: all 0.2s 0.2s;
  grid-template-areas: 'center';
  width: ${({ isActive }: ProgressPropsType) => (isActive ? '100%' : '0%')};
`;

type DashedPropsType = {
  hasError: boolean;
};
const Dashed = styled.span`
  width: 100%;
  height: 0px;
  grid-area: center;
  border-bottom: ${({ hasError }: DashedPropsType) => (hasError ? '4px solid #f8b9b9' : '4px dashed #c7deff')};
`;
const Reserve = styled.span`
  height: 4px;
  grid-area: center;
  background: #adccf8;
  transition: all 0.15s 0.4s;
  width: ${({ value }: ValueType) => `${value}%`};
`;
const Complete = styled.span`
  height: 4px;
  grid-area: center;
  background: #2b6af0;
  transition: all 0.4s;
  width: ${({ value }: ValueType) => `${value}%`};
`;

const Wrapper = styled.div`
  width: 100%;
  display: grid;
  grid-column-gap: 5px;
  padding: 0px 16px 0px 12px;
  grid-template-columns: 1fr 30px;
  grid-template-areas: 'progress percent';
`;

type PropTypes = {
  hasError?: boolean;
  value: string | number;
};

const ProgressBar: React.FC<PropTypes> = ({ value, hasError }) => {
  const [reserve, setReserve] = React.useState(0);

  React.useEffect(() => {
    if (value > reserve && reserve !== 100) {
      setReserve(pre => pre + 25);
    }
  }, [value]);

  React.useEffect(() => {
    if (value <= 0) {
      setReserve(0);
    }
  }, [value]);

  return (
    <Wrapper>
      {/* @ts-ignore */}
      <Percent hasError={hasError} isActive={!(value === 0)}>
        {hasError ? 'ناموفق' : value == 100 ? 'موفق' : `${value}%`}
      </Percent>
      <Progress isActive={!(value === 0)}>
        {/* @ts-ignore */}
        <Dashed hasError={hasError} />
        <Reserve value={reserve} />
        <Complete value={value > 0 ? value : 0} />
      </Progress>
    </Wrapper>
  );
};

ProgressBar.defaultProps = {
  hasError: false,
};

export default ProgressBar;
