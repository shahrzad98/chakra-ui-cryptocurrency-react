import React, { useRef, useState } from "react";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogOverlay,
  Box,
  Button,
  ButtonGroup,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  InputRightElement,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  useToast,
  VStack,
} from "@chakra-ui/react";

import messages from "../messages";
import { FormattedMessage } from "react-intl";
import { ArrowUpDownIcon } from "@chakra-ui/icons";

const TradeBox = ({
  baseAsset,
  quoteAsset,
  rate,
  price,
  buyOrSell,
  onSubmit,
  gas,
  colorScheme,
}) => {
  const [order, setOrder] = useState({ qty: 0, price: rate });
  const toast = useToast();
  const cancelRef = useRef();
  const [isOpen, setIsOpen] = useState();

  const ConfirmOrder = () => {
    return (
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogBody>
            <FormattedMessage {...messages.exchange_confirm_order} />
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              colorScheme="red"
              ref={cancelRef}
              onClick={() => setIsOpen(false)}
            >
              <FormattedMessage id="action.cancel" />
            </Button>

            <Button
              colorScheme="green"
              ml={3}
              onClick={() => {
                onSubmit(order);
                setIsOpen(false);
              }}
            >
              <FormattedMessage id="action.confirm" />
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

  return (
    <Box p="2.5" borderColor={"gray.400"} borderWidth="1px" borderRadius="10px">
      <ConfirmOrder />
      <Box color="white" fontSize={["10pt"]} m="5px">
        {buyOrSell} {baseAsset}
      </Box>

      <VStack direction="row" spacing={4}>
        <FormattedMessage {...messages.exchange_rate}>
          {(msg) => (
            <InputGroup>
              <InputRightElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em"
                textAlign="center"
                children={<FormattedMessage {...messages.asset_price} />}
              />

              <Input
                type="number"
                color="yellow.500"
                defaultValue={price}
                onChange={(e) =>
                  setOrder({ ...order, price: parseFloat(e.target.value) })
                }
              />

              <InputLeftAddon
                bg={"gray.600"}
                color="white"
                textAlign="center"
                fontSize="8pt"
                children={` ${quoteAsset} `}
              />
            </InputGroup>
          )}
        </FormattedMessage>

        <FormattedMessage {...messages.gas}>
          {(msg) => (
            <Box color="yellow.400" fontSize="8pt" margin="-2.5">
              {msg} : {gas} {baseAsset}
            </Box>
          )}
        </FormattedMessage>

        <FormattedMessage {...messages.exchange_amount}>
          {(msg) => (
            <InputGroup>
              <InputRightElement children={<ArrowUpDownIcon color="white" />} />
              <Input
                color="yellow.400"
                value={order.qty}
                type="number"
                onChange={(e) => {
                  if (e.target.value <= gas) {
                    setOrder({
                      ...order,
                      qty: e.target.value ? parseFloat(e.target.value) : 0,
                    });
                  } else {
                    setOrder({ ...order, qty: gas });
                    toast({
                      title: (
                        <FormattedMessage {...messages.insufficient_gas} />
                      ),
                      status: "error",
                      isClosable: true,
                      duration: 3000,
                    });
                  }
                }}
                placeholder={`${msg} ${quoteAsset}`}
              />
              <InputLeftAddon
                fontSize="8pt"
                textAlign="center"
                bg={"gray.600"}
                color="white"
                children={`${baseAsset}`}
              />
            </InputGroup>
          )}
        </FormattedMessage>

        <Slider
          h="30px"
          aria-label="slider-ex-4"
          value={(100 * order.qty) / gas}
          focusThumbOnChange={false}
          onChange={(e) => setOrder({ ...order, qty: e })}
        >
          <SliderTrack bg="gray.700">
            <SliderFilledTrack bg="tomato" />
          </SliderTrack>
          <SliderThumb boxSize={3} />
        </Slider>

        <InputGroup color="white">
          <InputRightElement
            children={<FormattedMessage {...messages.exchange_amount} />}
          />

          <Input
            fontSize="8pt"
            color="yellow.400"
            value={rate * order.qty}
            onChange={(e) =>
              setOrder({
                ...order,
                qty: parseFloat(e.target.value / rate).toFixed(6),
              })
            }
          />

          <InputLeftAddon
            bg={"gray.600"}
            color="white"
            fontSize="8pt"
            children={`${quoteAsset}`}
          />
          {/* <u> {parseFloat(rate * order.qty).toFixed(6)}</u> {quoteAsset}{" "} */}
        </InputGroup>

        <ButtonGroup colorScheme={colorScheme} isAttached w={"100%"}>
          <Button w="100%" onClick={() => setIsOpen(true)}>
            <FormattedMessage {...messages.submit_order} /> {buyOrSell}
          </Button>
        </ButtonGroup>
      </VStack>
    </Box>
  );
};

export default TradeBox;
