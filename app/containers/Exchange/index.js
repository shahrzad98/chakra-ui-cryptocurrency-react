/**
 *
 * UserProfile
 *
 */

import React, { useEffect, useRef, useState } from "react";

import { FormattedMessage } from "react-intl";
import { LanguageTools } from "../../utils/languageTools";
import TitleBar from "../../components/TitleBar";

import messages from "./messages";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  Box,
  Button,
  Collapse,
  Select,
  Spacer,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { GetURL } from "../../utils/urlMap";
import { api } from "../../utils/network";

const Exchange = () => {
  const language = new LanguageTools();
  const history = useHistory();
  const [assets, setAssets] = useState([]);
  const [quote, setQuote] = useState([]);

  const [currencyPair, setCurrencyPair] = useState({
    base: {
      id: 0,
      symbol: "",
    },
    quote: {
      id: 0,
      symbol: "",
    },
  });

  const [toggles, setToggles] = useState({
    quote: false,
    next_step: false,
  });

  const bg = useColorModeValue("gray.400", "gray.800");

  const getCurrencyPairs = (id, name) => {
    setCurrencyPair({ ...currencyPair, base: { id: id, name: name } });
    if (id > 0) {
      api.post(GetURL("exchange-market"), { base: id }).then((response) => {
        setQuote(response.data?.data);
        setToggles({ ...toggles, quote: true });
      });
    }
  };

  const setPriceTicker = (sym) => {
    const q = quote[sym];
    setCurrencyPair({
      ...currencyPair,
      quote: {
        symbol: q?.symbol,
        id: q?.id,
        name: q?.quote_exchange_asset?.exchange_asset_names[0]?.name,
      },
    });
    setToggles({ ...toggles, next_step: true });
  };

  useEffect(() => {
    api.get(GetURL("exchange-asset")).then((response) => {
      setAssets(response.data?.data);
    });
  }, []);

  return (
    <Box
      w={["base", "md", "lg", "2xl"]}
      dir={language.Dir}
      className={language.Align}
    >
      <Helmet>
        <FormattedMessage {...messages.exchange}>
          {(msg) => <title>{msg}</title>}
        </FormattedMessage>
      </Helmet>

      <TitleBar
        background="rgb(22, 82, 240)"
        text={<FormattedMessage {...messages.exchange} />}
        color="#fff"
        icon={require("images/icons_wallet.svg")}
      >
        <FormattedMessage {...messages.exchange} />
      </TitleBar>

      <Stack direction={["row", "column"]} bg={bg} p="2.5">
        <Stack direction={["column", "row"]}>
          <Box m="auto" w="sm">
            <FormattedMessage {...messages.base_exchange_currency} />
          </Box>

          <Select
            w="xs"
            m="auto"
            onChange={(e) => {
              const selectedId = parseInt(e.target?.value) - 1;
              if (selectedId >= 0)
                getCurrencyPairs(
                  parseInt(e.target.value),
                  assets[selectedId]?.exchange_asset_names[0]?.name
                );
            }}
          >
            <option />
            {assets.map((value, key) => {
              return (
                <option key={key} value={value?.id}>
                  {value?.exchange_asset_names[0]?.name}
                </option>
              );
            })}
          </Select>
        </Stack>

        <Collapse in={toggles.quote}>
          <Stack direction={["column", "row"]} variant="filled">
            <Box m="auto" w="sm">
              <FormattedMessage {...messages.intent_exchange_currency} />
            </Box>

            <Select
              w="xs"
              m="auto"
              onChange={(e) => setPriceTicker(e.target.value)}
            >
              <option />
              {quote.map((value, key) => {
                return (
                  <option key={key} value={key}>
                    {value?.quote_exchange_asset?.exchange_asset_names &&
                      value?.quote_exchange_asset?.exchange_asset_names[0]
                        ?.name}
                  </option>
                );
              })}
            </Select>
          </Stack>
        </Collapse>

        <Collapse in={toggles.next_step}>
          <Box
            mt={["30px"]}
            onClick={(e) => {
              history.push("exchange/online", { currencyPair });
            }}
          >
            <Button m="auto" w="100%" bg="blue.600" color="white">
              <FormattedMessage {...messages.proceed_to_exchange} />
            </Button>
          </Box>
        </Collapse>
      </Stack>
    </Box>
  );
};

export default Exchange;
