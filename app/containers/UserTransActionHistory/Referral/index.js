import React from "react";
import { Col, Container, Row } from "reactstrap";

import "react-tabs/style/react-tabs.css";
import { FormattedMessage } from "react-intl";
import messages from "components/TransactionHistory/messages";
import { LanguageTools } from "utils/languageTools";
import TitleBar from "components/TitleBar";
import P from "components/P";
import Input from "components/Input";
import Label from "components/Label";
import RabexButton from "components/RabexButton";
import Img from "components/Img";
import BackgroundBody from "./backgroundBody";
import BackgroundBox from "./backgroundBox";
import BackgroundBoxDashed from "./backgroundBoxDashed";

const Referral = ({ dir }) => {
  const language = new LanguageTools();

  return (
    <>
      <Container dir={language.Dir} className={language.Align}>
        <TitleBar
          text={<FormattedMessage {...messages.InviteFriends} />}
          fontSize="20px"
          padding="6px 0 0 0"
          color="#fff"
          height="70px"
          icon={require("images/gift.svg")}
          background="rgb(22, 82, 240)"
        />

        <BackgroundBody>
          <P
            text={<FormattedMessage {...messages.Title} />}
            margin="0 0 1rem 0"
            fontSize="22px"
            textAlign="center"
          />

          <Row>
            <Col lg="10" xs="12">
              <P
                color="#212529"
                fontFamily="yekan"
                textAlign="right"
                text="کد دعوت خود را از قسمت زیر کپی کرده و برای دوستانتان ارسال کنید. در صورت ثبت نام دوست شما در رابکس با استفاده از کد دعوت (یا لینک دعوت) شما، درصدی از کل معاملات او (جمع خریدها و فروش) به شما تعلق خواهد گرفت
"
                lineHeight="28px"
                padding="0 10px 0 0"
                borderRight="3px solid rgb(6, 92, 202)"
              />
            </Col>
          </Row>

          <Row className="mt-5">
            <Col lg="4">
              <Label text="تعداد دوستان دعوت شده:" />
              <Input
                pleaceholder="۱ نفر "
                status="disabled"
                className="form-control"
                background="#FCFCFC"
                border="1px solid #ECEFF1"
              />
            </Col>
            <Col lg="4">
              <Label text="تعداد دوستان دعوت شده:" />
              <div className="d-flex">
                <Input
                  borderRadius="0px 4px 4px 0px"
                  pleaceholder="۱ نفر "
                  status="disabled"
                  className="form-control"
                  background="#FCFCFC"
                  border="1px solid #ECEFF1"
                />
                <Button
                  padding="1rem 0.75rem"
                  border="1px solid rgb(236, 239, 241)"
                  background="rgb(250, 251, 252)"
                  img={require("images/icon_feather_copy.svg")}
                />
              </div>
            </Col>
            <Col lg="4">
              <Label text="تعداد دوستان دعوت شده:" />
              <div className="d-flex">
                <Input
                  borderRadius="0px 4px 4px 0px"
                  pleaceholder="۱ نفر "
                  status="disabled"
                  className="form-control"
                  background="#FCFCFC"
                  border="1px solid #ECEFF1"
                />
                <Button
                  padding="1rem 0.75rem"
                  border="1px solid rgb(236, 239, 241)"
                  background="rgb(250, 251, 252)"
                  img={require("images/icon_feather_copy.svg")}
                />
              </div>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col lg="4">
              <BackgroundBox>
                <P margin="90px 0 0 0" text="۰ تومان" />
                <Img
                  display="inline-block"
                  src={require("images/icon_simple_addthis.svg")}
                  height="18px"
                />
                <P
                  display="inline-block"
                  margin="18px 10px 0 0"
                  text="کل سود شما"
                />
              </BackgroundBox>
            </Col>
            <Col lg="4">
              <BackgroundBox>
                <P margin="90px 0 0 0" text="۰ تومان" />
                <Img
                  display="inline-block"
                  src={require("images/icon_simple_addthis.svg")}
                  height="18px"
                />
                <P
                  display="inline-block"
                  margin="18px 10px 0 0"
                  text="باقی مانده قابل برداشت"
                />
              </BackgroundBox>
            </Col>
            <Col lg="4">
              <BackgroundBoxDashed>
                <RabexButton
                  borderRadius="8px"
                  margin="50px 0 0 0"
                  text="برداشت"
                  padding="18px 50px"
                  background="rgb(22,82,240)"
                  color="#fff"
                />
                <P
                  color="rgb(120, 140, 166)"
                  position="absolute"
                  bottom="5px"
                  right="0"
                  left="0"
                  textAlign="center"
                  text="حداقل برداشت: ۵۰۰,۰۰۰ تومان"
                />
              </BackgroundBoxDashed>
            </Col>
          </Row>
        </BackgroundBody>
      </Container>
    </>
  );
};

export { Referral };
