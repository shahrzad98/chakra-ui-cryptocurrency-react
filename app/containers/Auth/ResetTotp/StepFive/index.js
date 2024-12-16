import React, { useEffect, useState } from "react";
import BackgroundBox from "../BackgroundBox";
import P from "../../../../components/P";
import messages from "../messages";
import { FormattedMessage } from "react-intl";

import Input from "../../../../components/Input";
import Img from "../../../../components/Img";
import { Container, Row, Col } from "reactstrap";
import Span from "../../../../components/Span";
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

        <>
            <P color="#fff" fontSize="16px" textAlign="center" text={<FormattedMessage {...messages.Checkingdocuments} />} />

            <Box bg="white" w={"base", "xs", "sm", "lg", "xl"} direction={["row", "column"]} m="auto" p={["2px", "20px"]}>
                <P fontFamily="yekan" textAlign="center" text={<FormattedMessage {...messages.stepfivesectionone} />} />

                <Stack direction={["row", "column"]} m="auto" w={["lg"]}>
                    <Box textAlign="right" borderRadius="2px" padding="40px 20px" border="1px solid #ECEFF1">
                        <Img display="inline" src={require("images/icon/selfie.svg")} />
                        <Box display="inline-block" verticalAlign="middle">
                            <P
                                text="مدارک ارسالی"
                            />
                            <P
                                text="مدارک ارسالی"
                            />
                        </Box>
                    </Box>
                </Stack>
            </Box>

        </>
    );
};

export default StepFour;
