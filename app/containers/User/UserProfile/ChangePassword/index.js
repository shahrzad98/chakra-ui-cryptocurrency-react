import React from "react";
import { Col, Row, FormGroup, Container } from "reactstrap";
import RabexButton from "../../../../components/RabexButton";
import Label from "components/Label";
import Input from "components/Input";
import { FormattedMessage } from "react-intl";
import messages from "../../messages";

const ChangePassword = () => {
  return (
    <>
      <Container>
        <Row className="align-items-lg-center">
          <Col md={4}>
            <FormGroup>
              <Label
                text={<FormattedMessage {...messages.CurrentPassword} />}
              />
              <Input
                typename="password"
                className="form-control text-right"
                name="name"
                type="text"
                
              />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label text={<FormattedMessage {...messages.NewPassword} />} />
              <Input
                typename="password"
                className="form-control text-right"
                name="lastname"
                type="text"
                
              />
            </FormGroup>
          </Col>

          <Col md={4}>
            <FormGroup>
              <Label text={<FormattedMessage {...messages.NewPassword} />} />
              <Input
                typename="password"
                className="form-control text-right"
                name="email"
                type="text"
                
              />
            </FormGroup>
          </Col>

          <Col lg="12">
            <RabexButton
              color="#fff"
              text={<FormattedMessage {...messages.ChangePassword} />}
              background="rgb(8, 184, 116)"
              borderRadius="3px"
              padding="10px 30px"
              
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ChangePassword;
