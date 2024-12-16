import React, { useState } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Stack,
  useDisclosure,
  Link
} from "@chakra-ui/react";

import { FormattedMessage } from "react-intl";
import messages from "../../messages";
import { LanguageTools } from "utils/languageTools";

import P from "components/P";
import Button from "components/RabexButton";
import Label from "components/Label";
import Input from "components/Input";

const MobileProfile = () => {
  const language = new LanguageTools();
  const [isMyAccount, setIsMyAccount] = useState(false);

  const ChangeAccount = () => {
    setIsMyAccount(!isMyAccount);
  };

  return (
    <>
     <Box cursor="pointer" padding="20px 15px" onClick={ChangeAccount}>
            <P text="جزءیات حساب کاربری" />
          </Box>

          <Box padding="20px 15px" marginTop="20px" display={isMyAccount ? "block" : "none"}>
            <Box padding="15px" bg="#f4f6fa" border="1px solid #ECEFF1">
              <P text="وضعیت احراز هویت" />
              <P display="inline-block" text="انجام نشده" color="orange.600" />
              <Link
              _hover={{ color: '#fff' }}
              marginLeft="15px"
              marginRight="11px"
              marginTop="31px"
              color="#fff"
              isExternal
              href="http://127.0.0.1/kyc/authorization/2"
            >
              <P
                display="inline-block"
                float="left"
                text="برو به احراز هویت‌"
                textAlign="left"
                color="blue.600"
              />
            </Link>
              
            </Box>

            <Box
              marginTop="15px"
              padding="15px"
              bg="#f4f6fa"
              border="1px solid #ECEFF1"
            >
              <P text="شناسایی دو عاملی" />
              <P display="inline-block" text="غیرفعال" color="orange.600" />
              <P
                display="inline-block"
                float="left"
                text="فعال سازی‌"
                textAlign="left"
                color="blue.600"
              />
            </Box>

            <Box
              marginTop="15px"
              marginBottom="20px"
              padding="15px"
              bg="#f4f6fa"
              border="1px solid #ECEFF1"
            >
              <P text="پین کد کیف پول" />
              <P display="inline-block" text="تعیین نشده" color="orange.600" />
              <P
                display="inline-block"
                float="left"
                text="تعیین پین کد"
                textAlign="left"
                color="blue.600"
              />
            </Box>

            <hr />

            <Label
              margin="20px 0 10ox 0"
              text={<FormattedMessage {...messages.FirstName} />}
            />
            <Input
              disabled="disabled"
              className="form-control text-right"
              name="name"
              border="1px"
              type="text"
              value="سلمان"
            />

            <Label text={<FormattedMessage {...messages.LastName} />} />
            <Input
              disabled="disabled"
              className="form-control text-right"
              name="lastname"
              type="text"
              value="طاقونی"
            />

            <Label text={<FormattedMessage {...messages.Email} />} />
            <Input
              disabled="disabled"
              className="form-control text-right"
              name="email"
              type="text"
              
            />

            <Label text={<FormattedMessage {...messages.Mobile} />} />
            <Input
              disabled="disabled"
              className="form-control text-right"
              name="mobile"
              type="text"
              value={"09133851769"}
              
            />
          </Box>
    </>
  );
};

export default  MobileProfile ;
