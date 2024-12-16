/**
 *
 * LocaleToggle
 *
 */
import React from "react";
import PropTypes from "prop-types";
import Select from "./Select";
import Selectizer from "./Selectizer";
import ToggleOption from "../ToggleOption";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLanguage, faChevronDown } from "@fortawesome/free-solid-svg-icons";
// import  {ReactComponent as LogoEn} from '../../images/united-kingdom-flag.svg';
// import  {ReactComponent as LogoFa} from '../../images/iran-flag.svg';

const Toggle = (props) => {
  let content = <option>--</option>;

  // If we have items, render them
  const getContent = () => {
    if (props.values) {
      const content = props.values.map((value) => (
        <ToggleOption
          key={value}
          value={value}
          message={props.messages[value]}
        />
      ));
      return content;
    }
  };
  // const languageIcon = () => {
  //   if(props.value=='en'){
  //     return (<img src={LogoEn}/>);
  //   }
  //   else {
  //     return (<img src={LogoFa}/>);
  //   }
  // }

  return (
    <>
      {/* {languageIcon()} */}
      {/* <FontAwesomeIcon icon={faLanguage} />  */}
      <Selectizer>
        
        <Select value={props.value} onChange={(e) => props.onToggle(e)}>
          {getContent()}
        </Select>
      </Selectizer>
    </>
  );
};

Toggle.propTypes = {
  onToggle: PropTypes.func,
  values: PropTypes.array,
  value: PropTypes.string,
  messages: PropTypes.object,
};

export default Toggle;
