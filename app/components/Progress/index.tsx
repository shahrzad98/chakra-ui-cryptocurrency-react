import {Box} from "@chakra-ui/react";
import React from "react";
import './progress.scss';

const Progress = ({done, width}) => {
  const [style, setStyle] = React.useState({});

  setTimeout(() => {
    const newStyle = {
      opacity: 1,
      width: `${done}%`
    }

    setStyle(newStyle);
  }, 200);

  return (
    <Box  width={width} className="progress" height="9px" margin="6px 11.7px 6px 13px">
      <Box  className="progress-done" style={style}/>
    </Box>
  )
}

const ProgressComponent = ({percente, width}) => <Progress width={width} done={percente}/>

export default ProgressComponent
