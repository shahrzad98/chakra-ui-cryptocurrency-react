import * as React from 'react';
import { Switch, SwitchLabel, SwitchRadio, SwitchSelection } from './styles';
import { useState } from 'react';

type ToggleSwitchProps = {
  values: any;
};

const ThreeToggleSwitch: React.FC<ToggleSwitchProps> = ({ values }) => {
  const [selected, setSelected] = useState();

  const handleChange = (val: any) => {
    setSelected(val);
  };

  function selectionStyle() {
    if (selected)
      return {
        left: `${(values.indexOf(selected) / 3) * 100}%`,
      };
    else return;
  }

  const titleCase = (str: any) =>
    str
      .split(/\s+/)
      .map((w: any) => w[0].toUpperCase() + w.slice(1))
      .join(' ');

  const ClickableLabel = ({ title, onChange, id }) => {
    return (
      <SwitchLabel onClick={() => onChange(title)} className={id}>
        &nbsp;
      </SwitchLabel>
    );
  };

  const ConcealedRadio = ({ value, selected }) => (
    <SwitchRadio type="radio" name="switch" checked={selected === value} />
  );

  return (
    <Switch>
      {values.map((val: any) => {
        return (
          <span>
            <ConcealedRadio value={val} selected={selected} />
            <ClickableLabel id={1} title={val} onChange={handleChange} />
          </span>
        );
      })}
      <SwitchSelection style={selectionStyle()} />
    </Switch>
  );
};

export default ThreeToggleSwitch;
