/**
 *
 * ChangePineCodeModal
 *
 */

 import React, { memo, useState } from "react";
 import Img from "../Img";
 import P from "../P";
 import Button from "../RabexButton";
 import { Box } from "@chakra-ui/layout";

 // import PropTypes from 'prop-types';
// import styled from 'styled-components';

function ChangePineCodeModal() {
  const [Step, setStep] = useState(1);

  const nextStep = () => {
    setStep(Step + 1);
  };

  return (
    
    <>
      <Box padding="0 10px" display={Step == 4 ? "block" : "none"}>
        <Img margin="0 auto" src={require("images/stepone_auth.svg")} />

        <Text
          padding="20px 15px"
          
          fontSize="20px"
          textAlign="center"
        >
          تعیین پین کد کیف پول
        </Text>

        <Box padding="10px 0" bg="#f5f7f7" padding="15px">
          <Text
            color="#707070"
            textAlign="center"
          >
            در صورتی که پین کد کیف پول خود را فراموش کردید، نیاز است یک مرحله احراز هویت انجام داده و یک عکس سلفی همراه با متن دست نوشت و کارت شناسایی معتبر برای رابکس ارسال کنید.
          </Text>
          <Text
            margin="8px 0 0 0"
            color="#707070"
            textAlign="center"
          >بررسی این درخواست تا ۷ روز زمان خواهد برد.</Text>
          <Text
            margin="8px 0 0 0"
            color="#707070"
            textAlign="center"
            
          >
            در صورت قابل قبول بودن مدرک ارسالی، پین کد شما ریست شده و مجدد می‌توانید پین کدی را انتخاب کنید
          </Text>
        </Box>

        <Box marginTop="15px" borderTop="2px solid #b5c0ca" />

        <Img margin="15px auto" src={require("images/notepadblue.svg")} />

        <P fontSize="20px" textAlign="center" text="متن دست نوشته" />

        <P
          fontFamily="yekan"
          margin="5px 0 0 0"
          text="اینجانب،‌ فلان فلانی به کد ملی فلاننننننن درخواست دارم تا پین کد ورود به کیف پول رابکس خود را تغییر دهم."
        />

        <P margin="5px 0 0 0" fontFamily="yekan" text="تاریخ و امضا" />

        <P
          margin="5px 0 0 0"
          fontSize="20px"
          textAlign="center"
          text="مدرک شناسایی معتبر"
        />

        <P
          fontFamily="yekan"
          margin="5px 0 0 0"
          text="کارت ملی جدید، شناسنامه جدید، گواهی نامه، گذرنامه، کارت پایان خدمت"
        />

        <Button
          margin="40px 0 15px 0"
          padding="26px 76px"
          color="#fff"
          onClick={(e) => {
            setStep(Step + 1);
          }}
          background="#1652f0"
        >
          تایید و ادامه
        </Button>
      </Box>

      <Box display={Step == 5 ? "block" : "none"}>
        <Box bg="#fff">
          <Img margin="15px auto" src={require("images/notepadblue.svg")} />

          <P fontSize="20px" textAlign="center" text="متن دست نوشته" />

          <P
            fontFamily="yekan"
            margin="5px 0 0 0"
            text="اینجانب،‌ فلان فلانی به کد ملی فلاننننننن درخواست دارم تا پین کد ورود به کیف پول رابکس خود را تغییر دهم."
          />

          <P margin="5px 0 0 0" fontFamily="yekan" text="تاریخ و امضا" />

          <P
            margin="5px 0 0 0"
            fontSize="20px"
            textAlign="center"
            text="مدرک شناسایی معتبر"
          />

          <P
            fontFamily="yekan"
            margin="5px 0 0 0"
            text="کارت ملی جدید، شناسنامه جدید، گواهی نامه، گذرنامه، کارت پایان خدمت"
          />
        </Box>
      </Box>
    </>
  );
}

ChangePineCodeModal.propTypes = {};

export default ChangePineCodeModal;
