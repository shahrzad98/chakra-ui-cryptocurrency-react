import React from 'react';
import styled from 'styled-components';
import _map from 'lodash/map';

type ClassesTypes = {
  root?: string;
  dots?: string;
  dot?: string;
};

type PropTypes = {
  /**
   * A next button element. For instance, it can be a Button or an IconButton.
   */
  nextButton: JSX.Element;
  /**
   * A back button element. For instance, it can be a Button or an IconButton.
   */
  backButton: JSX.Element;
  /**
   * Set the active step. Set to -1 to disable all the steps.
   */
  activeStep: number | string;
  /**
   * The total steps.
   */
  steps: number | string;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: ClassesTypes;
};

type DotsTypes = {
  column: string | number;
  className?: string;
};
type DotTypes = {
  isActive: boolean;
  className?: string;
};

const Wrapp = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-columns: 80px 1fr 80px;
  color: #fff;
`;
const Dots = styled.div`
  display: grid;
  align-items: center;
  grid-column-gap: 10px;
  justify-content: center;
  grid-template-columns: ${({ column }: DotsTypes) => `repeat(${column}, 15px)`};
`;
const Dot = styled.span`
  border-radius: 15px;
  justify-self: center;
  transition: all 0.2s;
  width: ${({ isActive }: DotTypes) => (isActive ? '12px' : '8px')};
  height: ${({ isActive }: DotTypes) => (isActive ? '12px' : '8px')};
  background-color: ${({ isActive }: DotTypes) => (isActive ? '#ffffff' : '#bfe9ff')};
`;

const Stepper: React.FC<PropTypes> = ({
  nextButton,
  backButton,
  activeStep,
  steps: length,
  classes = {
    root: '',
    dots: '',
    dot: '',
  },
}) => {
  const steps = React.useRef(activeStep ? new Array(length).fill(0) : []);

  return (
    <Wrapp className={classes.root}>
      {backButton}
      <Dots column={length} className={classes.dots}>
        {_map(steps.current, (_, index) => (
          <Dot key={index} isActive={activeStep === index + 1} className={classes.dot} />
        ))}
      </Dots>
      {nextButton}
    </Wrapp>
  );
};

export default Stepper;
