import React, {useEffect, useState} from 'react';
import AuthBox from 'components/AuthBox'
import Img from 'components/Img'
import P from 'components/P'
import {Col, Container, Row} from "reactstrap";

import {FormattedMessage} from "react-intl";
import Button from "components/Button";
import ImageUpload from "./FileUpload";


const firstLine = "در این مرحله لازم است تصویر سلفی خود را درحالی که کارت شناسایی معتبر و تعهد نامه رابکس ( به صورت دست نوشت ) را در دست دارید، برای رابکس ارسال کنید.";
const undertaking = "متن تعهدنامه";
const commitment = "اینجانب (نام و نام خانوادگی) به کد ملی (کدملی) و به شماره شناسنامه (شماره شناسنامه) ضمن مطالعه و تأیید و اجرای قوانین استفاده از خدمات سایت رابکس، متعهد می گردم حساب کاربری و حساب بانکی ارائه شده به سایت رابکس را عمدا یا سهوا در اختیار اشخاص غیر قرار ندهم و همچنین رمزارزهای خریداری شده را صرفا برای اهداف قانونی و مشروع مورد استفاده قرار دهم و در غیر این صورت، مسئولیت کیفری و حقوقی هرگونه جرم یا تخلف وقوع یافته و جبران خسارات وارده به هر شخص حقیقی و حقوقی دیگر، بر عهده اینجانب است. جهت احراز هویت و ارائه تعهد به سایت رابکس تاریخ روز و امضا";
const imageUpload = "آپلود تصویر";
const UserAuthPicture = ({dir, onChange}) => {

  
    return <>
       
        <Row>
            <Container>
                <AuthBox>
                    <Row>
                        <Col lg="6">

                            {/* <FormattedMessage {...messages.firstLine}>
                                   (msg)=>{
                                <P text={msg} fontFamily="yekan" fontSize=".9rem" color="rgb(120, 140, 166)"
                                    />
                                   }
                            </FormattedMessage> */}

                            {/*<P text={firstLine} fontFamily="yekan" fontSize=".9rem" color="rgb(120, 140, 166)"*/}
                            {/* /> */}
                        </Col>
                        <Col lg="6">
                            <Img src={require('images/uploadimage.jpg')} className="img-responsive" width="100%"
                                 />
                        </Col>
                    </Row>
                </AuthBox>
                <AuthBox>
                    <Row>
                        <Col lg="6">
                            <P text={undertaking} fontSize=".9rem" color="rgb(6, 92, 202);"
                                />
                            <div className="commitment">
                                <P text={commitment} fontSize=".9rem" color="#788CA6"
                                   lineHeight="28px"
                                    />
                            </div>
                        </Col>
                        <Col lg="6">
                            <P text={imageUpload} fontSize=".9rem" color="rgb(6, 92, 202);"
                                />
                            <div className="commitment">
                                <ImageUpload />
                            </div>
                        </Col>
                    </Row>



                </AuthBox>
            </Container>
        </Row>
       
    </>

}

export  {UserAuthPicture};