import { Col, Container, FormGroup, Row, Form } from "reactstrap";

import React, { useEffect, useState } from "react";
import AuthBox from "../../../../components/AuthBox";
import Input from '../../../../components/Input';
import Label from '../../../../components/Label';
import moment from 'moment-jalaali'
import DatePicker from 'react-datepicker2';
// import fa from "moment/src/locale/fa";
import { Helmet } from "react-helmet";
import { FormattedMessage } from "react-intl";
import messages from '../messages'
import { LanguageTools } from '../../../../utils/languageTools'

const language = new LanguageTools();

const UsersInformationForm = ({ onChange }) => {
    // moment.loadPersian(fa);
    // const [msg,setMsg] = useState(0);
    // useEffect(() => {
    //         onChange("hello")
    // }, []);

    const [m, setMsg] = useState(1);

    useEffect(() => {
        onChange(m);
    }, [m]);







    return <>
            <Container dir={language.Dir} className={language.Align} >
                <AuthBox className="mt-5">
                    <Form>
                        <Row form className=" m-auto">

                            <Col md={6}>
                                <FormGroup>
                                    <Label text={<FormattedMessage {...messages.FirstName} />} />
                                    <Input className="form-control text-right" name="name" type="text"  />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label text={<FormattedMessage {...messages.LastName} />}  />
                                    <Input className="form-control text-right" name="lastname" type="text"  />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label text={<FormattedMessage {...messages.FatherName} />}  />
                                    <Input className="form-control text-right" name="fathername" type="text"  />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label text={<FormattedMessage {...messages.NumberId} />}  />
                                    <Input className="form-control text-right" name="number_id" type="text"  />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label text={<FormattedMessage {...messages.NationalCard} />}  />
                                    <Input className="form-control text-right" name="national_card" type="text"  />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label text={<FormattedMessage {...messages.ZipCode} />}  />
                                    <Input className="form-control text-right" name="zipcode" type="text" />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label text={<FormattedMessage {...messages.DatePicker} />}  />
                                    <DatePicker isGregorian={false} timePicker={false} />
                                </FormGroup>
                            </Col>

                        </Row>
                    </Form>
                </AuthBox>

            </Container>

    </>

}


export { UsersInformationForm };

