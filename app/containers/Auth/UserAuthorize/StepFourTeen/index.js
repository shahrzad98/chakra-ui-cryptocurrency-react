import React, { useEffect, useState } from "react";
import BackgroundBox from "../BackgroundBox";
import P from "../../../../components/P";
import messages from "../messages";
import { FormattedMessage } from "react-intl";
import Button from "../../../../components/RabexButton";
import Input from "../../../../components/Input";
import Img from "../../../../components/Img";
import { Container, Row, Col } from "reactstrap";
import Span from "../../../../components/Span";
import styled from 'styled-components';
import BaseInformationForm from 'components/AuthBaseInformationForm';
import { api } from "../../../../utils/network";
import { GetURL } from "../../../../utils/urlMap";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  Stack,
  VStack
} from "@chakra-ui/react";


const StepThirteen = ({ currentStep, onNextStep }) => {


  const BorderBox = styled.div`
  border : 1px solid #ECEFF1;
  text-align:right;
  padding:15px 8px;
  margin:10px 0;
`;



const [landLinePhone, setLandLinePhone] = useState();
const [userClockSelected, setUserClockSelected] = useState();
const [userStatus, setUserStatus] = useState();


useEffect(() => {
    api
    .get(GetURL("auth-step-three"))
    .then((response) => {
      setLandLinePhone(response.data?.data.landline_batch_data.landline_number);
      let slot = response.data?.data.landline_batch_data.rendezvous_slot;
      setUserStatus(response.data?.data.landline_batch_data.status);
      setUserClockSelected(response.data?.data.landline_batch_data.calendar.timetable[slot].start +"-"+ response.data?.data.landline_batch_data.calendar.timetable[slot].end);
    });
}, []);


  return (
    <>
    <P text={ <FormattedMessage {...messages.PendingDocuments} />}
        textAlign="center"
        color="#fff"
        />
      <Box textAlign="center" bg="white" margin="auto" padding="1.5em 1em 1.5em 1em"
        w={["base", "lg", "1xl"]}>
         <P text={ <FormattedMessage {...messages.SendDocuments} />}
        textAlign="center"
        />

        <BorderBox>
          <Img display="inline" src={require('images/icon/selfie.svg')} />
          <Box display="inline-block" verticalAlign="middle">
          <P  text={<FormattedMessage {...messages.sendingDocuments} />}   
           />
              <P color={status==0 ? "#000" : "red"}  text={status==0 ? <FormattedMessage {...messages.PendingDocuments} /> : <FormattedMessage {...messages.DocumentsNotAccepted} />}  
           />
            </Box>
            
        </BorderBox>


        <BorderBox>
          <Img display="inline" src={require('images/telephone2.svg')} />
          <Box display="inline-block" verticalAlign="middle">
          <P  text={landLinePhone}   />
              <P  text={userClockSelected}  />
            </Box>
        </BorderBox>






        <Button
            margin="10px 0 0 0 "
            background="#1652F0"
            color="#fff"
            borderRadius="4px"
            padding="20px 0"
            width="100%"
            text={<FormattedMessage {...messages.Continues} />}
            onClick={(e) => {
              if (onNextStep) onNextStep(currentStep + 1);
            }}
          />


     
        
        </Box>



    


    </>
  );
};

export default StepThirteen;
