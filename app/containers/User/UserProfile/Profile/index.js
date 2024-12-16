import ProfileBoxShadow from "./profileboxshadow";
import { Col, Row, FormGroup } from "reactstrap";
import Span from "../../../../components/Span";
import P from "../../../../components/P";
import ImageUpload from "../../../../components/ImageUpload";
import { TabPanel } from "react-tabs";
import React, { useEffect, useState } from "react";
import SuccessAuth from "./SuccessAuth";
import Img from "../../../../components/Img";
import RabexButton from "../../../../components/RabexButton";
import Label from "components/Label";
import Input from "components/Input";
import { FormattedMessage } from "react-intl";
import messages from "../../messages";
import { Box, Stack, Center, Divider,Text } from "@chakra-ui/react";
import { api } from "../../../../utils/network";
import { GetURL } from "../../../../utils/urlMap";
import { Link } from 'react-router-dom';
import { useLocation, useHistory, useParams } from 'react-router-dom';

const Profile = () => {
  const [userProfile, setUserProfile] = useState([]);
  const history = useHistory();

  useEffect(() => {
    api
      .get(GetURL("users-profile-info"))
      .then((response) => {
        setUserProfile(response.data?.data);
      })
      .catch((err) => {});
  }, []);

  return (
    <>
      <ProfileBoxShadow>
        <Stack direction={["column", "row"]}>
          <Box
            width={{ base: "100%", md: "75%", lg: "75%", xl: "75%" }}
            display="inline-block"
            verticalAlign="middle"
          >
            <Img
              display="inline"
              height="50px"
              src={require("images/avatar.svg")}
            />
            <Box display="inline-block" verticalAlign="middle">
              <P
                padding="0 10px 0 0"
                text={
                  userProfile?.base_info?.first_name +
                  " " +
                  userProfile?.base_info?.last_name
                }
              />
              <P padding="0 10px 0 0" text={"0" + userProfile?.mobile} />
              <P padding="0 10px 0 0" />
            </Box>
          </Box>
          <Box width={{ base: "100%", md: "25%", lg: "25%", xl: "25%" }}>
            {userProfile?.verification_status == 0 ? (
              <RabexButton
                display="inline"
                textAlign="center"
                borderRadius="5px"
                color="#fff"
                fontSize="12px"
                heightImg="25px"
                background="#1652f0"
                border="1px solid #0046ff"
                width="100%"
                PaddingImg="0 0 0 8px"
                img={require("images/lock.svg")}
              >
                برو به احراز هویت
              </RabexButton>
            ) : (
              ""
            )}

            {userProfile?.verification_status == 1 ? (
              <RabexButton
                display="inline"
                textAlign="center"
                borderRadius="5px"
                color="#fff"
                fontSize="12px"
                heightImg="25px"
                background="rgb(8, 184, 116)"
                width="100%"
                PaddingImg="0 0 0 8px"
                img={require("images/minisheild.svg")}
              >
                هویت شما تایید شده
              </RabexButton>
            ) : (
              ""
            )}

            {userProfile?.verification_status == 2 ? (
              <RabexButton
                display="inline"
                textAlign="center"
                borderRadius="5px"
                color="#fff"
                fontSize="12px"
                heightImg="25px"
                background="#ff4b4b"
                width="100%"
                PaddingImg="0 0 0 8px"
                border="1px solid #DC2B2B"
                img={require("images/close.svg")}
              >
                احراز هویت شما دارای نقص است
              </RabexButton>
            ) : (
              ""
            )}
          </Box>
        </Stack>
      </ProfileBoxShadow>
      <ProfileBoxShadow>
        <Stack direction={["column", "row"]} spacing="30px">
          <Stack w={["base", "lg", "55%"]}>
            <Stack direction={["column", "row"]} spacing="20px" align="top">
              <Box w={["base", "sm", "50%"]}>
                <Label text={<FormattedMessage {...messages.FirstName} />} />
                <Input
                  disabled="disabled"
                  className="form-control text-right"
                  name="name"
                  border="1px"
                  type="text"
                  value={userProfile?.base_info?.first_name}
                />
              </Box>

              <Box w={["base", "sm", "50%"]}>
                <Label text={<FormattedMessage {...messages.LastName} />} />
                <Input
                  disabled="disabled"
                  className="form-control text-right"
                  name="lastname"
                  type="text"
                  value={userProfile?.base_info?.last_name}
                  
                />
              </Box>
            </Stack>

            <Stack direction={["column", "row"]} spacing="20px" align="top">
              <Box w={["base", "sm", "50%"]}>
                <Label text={<FormattedMessage {...messages.Email} />} />
                <Input
                  disabled="disabled"
                  className="form-control text-right"
                  name="email"
                  type="text"
                  value={userProfile?.base_info?.email}
                  
                />
              </Box>

              <Box w={["base", "sm", "50%"]}>
                <Label text={<FormattedMessage {...messages.Mobile} />} />
                <Input
                  disabled="disabled"
                  className="form-control text-right"
                  name="mobile"
                  type="text"
                  value={"0" + userProfile?.mobile}
                  
                />
              </Box>
            </Stack>
          </Stack>

          <Stack w={["base", "lg", "45%"]}>
            <Box w={["base", "sm", "100%"]}>
              <Center float="right" height="170px"  marginTop="15px">
                <Divider orientation="vertical" />
              </Center>

              <Box
                w={["base", "xs", "sm"]}
                background="#eee"
                margin="0 auto"
                textAlign="center"
              >
                <P textAlign="right" text="وضعیت احراز هویت" />
                <P textAlign="right" text="انجام نشده" />
                
                <Text onClick={() => history.push('/kyc/authorization')}
                 textAlign="left" >
                   برو به احراز هویت
                 </Text>
              
              </Box>

              <Box
                w={["base", "xs", "sm"]}
                background="#eee"
                margin="10px auto"
                textAlign="center"
              >
                <P textAlign="right" text="شناسایی دو عاملی" />
                <P textAlign="right" text="غیر فعال" />

                <P textAlign="left" text="فعالسازی" />
              </Box>

              <Box
                w={["base", "xs", "sm"]}
                background="#eee"
                margin="10px auto"
                textAlign="center"
              >
                <P textAlign="right" text="پین کد کیف پول" />
                <P textAlign="right" text="تعیین نشده" />

                <P textAlign="left" text="تعیین پین کد" />
              </Box>
            </Box>
          </Stack>
        </Stack>
      </ProfileBoxShadow>
    </>
  );
};

export default Profile;
