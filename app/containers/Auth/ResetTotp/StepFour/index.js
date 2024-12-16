import React, { useEffect, useState } from "react";
import BackgroundBox from "../BackgroundBox";
import P from "../../../../components/P";
import messages from "../messages";
import { FormattedMessage } from "react-intl";

import Input from "../../../../components/Input";
import Img from "../../../../components/Img";
import { Container, Row, Col } from "reactstrap";
import Span from "../../../../components/Span";
import ParagraphBox from "./ParagraphBox";
import UploadFile from "../../../../components/UploadFile";
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
  Lorem,
  useDisclosure,
  Button,
  Stack,
  Box,
  VStack,
  HStack
} from "@chakra-ui/react";
const StepFour = ({ currentStep, onNextStep }) => {


  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = React.useState("xl");
  const [state, setState] = React.useState("1")

  const [document_image, setDocumentImage] = React.useState("1");
  const [selfi_image, setSelfiImage] = React.useState("1");



  const handleSizeClick = (state) => {
    setState(state);
    onOpen()
  }

  const submit = () => {
    api
      .put(GetURL("document-name-upload"), {
        selfie_file: selfi_image,
        docs_file: document_image,
        id_desc_file: ""
      })
      .then((response) => {
        onNextStep(currentStep + 1);
      });
  };



  return (

   

      <Box bg="white"  direction={[ "row","column"]} m="auto" p={["2px","20px"]}>
        <P fontSize="16px" textAlign="center" text={<FormattedMessage {...messages.identificationDocuments} />} />
        <P
          fontSize="16px"
          fontFamily="yekan"
          textAlign="center"
          text={<FormattedMessage {...messages.sendPhoto} />}
        />






        <Stack direction={["column","row"]}   m="auto" w={["base","sm","md"]}>
          <Box border="1px dashed #000"  onClick={(e) => handleSizeClick(1)}>
            <Img
              margin="15px auto"
              display="block"
              src={require("images/authdocuments.svg")}
            />
            <P
              display="block"
              fontSize="11px"
              color="#708599"
              margin="0 auto"
              textAlign="center"
              text={<FormattedMessage {...messages.dragPhoto} />}
            />
          </Box>

          <Box onClick={(e) => handleSizeClick(2)}>
            <Img
              margin="15px auto"
              display="block"
              src={require("images/authselfie.svg")}
            />
            <P
              margin="0 auto"
              fontSize="11px"
              color="#708599"
              textAlign="center"
              text={<FormattedMessage {...messages.dragPhoto} />}
            />
          </Box>
        
        </Stack>
        
        <Box direction={["row"]}>
          <ParagraphBox>
            <P
              display="block"
              fontSize="11px"
              color="#708599"
              margin="0 auto"
              textAlign="center"
              text={<FormattedMessage {...messages.Photoofdocuments} />}
            />
          </ParagraphBox>
          <ParagraphBox>
            <P
              display="block"
              fontSize="11px"
              color="#708599"
              margin="0 auto"
              textAlign="center"
              text={<FormattedMessage {...messages.Selfiewithdocuments} />}
            />
          </ParagraphBox>
        </Box>

        <P
          margin="10px auto"
          fontSize="15px"
          textAlign="center"
          color="#050F19"
          text={<FormattedMessage {...messages.Donotedityourphoto} />}
        />

        <Button
          width="100%"
          color="white"
          margin="15px auto"
          textAlign="center"
        
          background="#1652F0"
          
          borderRadius="4px"
          padding="12px 0"
          
          onClick={submit}
        ><FormattedMessage {...messages.nextStep} />
</Button>
        <P
          display="block"
          fontSize="13px"
          color="#708599"
          margin="0 auto"
          textAlign="center"
          text={<FormattedMessage {...messages.BackStep} />}
        />







        <Modal size="lg" onClose={onClose} isOpen={isOpen}>
          <ModalOverlay />
          <ModalContent>

            <ModalCloseButton />
            <ModalBody textAlign="center">
              <UploadFile onLoad={(response => {
                if (state == 1)
                  setSelfiImage(response);
                if (state == 2)
                  setDocumentImage(response);
                if (state == 3)
                  setDocumentImage(response);
              })} />
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>







      </Box>


  );
};

export default StepFour;
