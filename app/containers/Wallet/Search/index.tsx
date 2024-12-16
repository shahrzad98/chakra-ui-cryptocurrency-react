import { SearchIcon } from '@chakra-ui/icons';
import React from "react"
import {
  Flex,
  Text,
  Modal,
  Input,
  InputGroup,
  InputRightElement,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import BTCIcon from 'images/btc.svg'

import List from "./List"

type SearchPropTypes = {}

const Search = ({}: SearchPropTypes) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  return (
    <>
      {/*@ts-ignore*/}
      <Flex onClick={() => onOpen()} ref={btnRef} alignItems="center" heigh="100%" width={{base: "100%", md: "auto"}}>
        <Flex cursor="pointer" marginTop={{base: "16px", md: "0px"}} padding={{base: "16px", md: "5px 16px"}} background="#f7f8fc" height={{base: "37px", md: "28px"}} width={{base: "100%", md: "265px"}} borderRadius="3px" gridGap="15px" alignItems="center">
          <SearchIcon color="#b5c0ca"/>
          <Text fontSize="12px" color="#b5c0ca">جستجو...</Text>
        </Flex>
      </Flex>
      <Modal
        onClose={onClose}
        size="sm"
        //@ts-ignore
        finalFocusRef={btnRef}
        isOpen={isOpen}
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>

          <ModalHeader padding="22px 0 15px" marginX="24px" borderBottom="4px solid #f3f5f7">
            <Flex alignItems="center" gridGap="18px">
              <ChevronRightIcon onClick={() => onClose()} cursor="pointer" color="#7e8b9a" height="24px" width="24px"/>
              <Text fontSize="18px" color="#7e8b9a">رمز ارز خود را انتخاب کنید</Text>
            </Flex>
          </ModalHeader>
          <ModalBody paddingY="16px">
            <Flex direction="column" gridGap="24px" marginBottom="30px">
              <InputGroup>
                <Input variant='filled' placeholder='جستجو' dir="ltr" textAlign="right" />
                <InputRightElement children={<SearchIcon color="#b5c0ca"/>} />
              </InputGroup>
              <List
                items={[
                  {
                    name: "بیت کوین",
                    des: "BTC",
                    icon: <BTCIcon width="32px" height="32px" />,
                    value: "16,837,837"
                  },
                  {
                    name: "تتر",
                    des: "USDT",
                    icon: <BTCIcon width="32px" height="32px" />,
                    value: "16,837,837"
                  },
                  {
                    name: "بیت کوین کش",
                    des: "BCH",
                    icon: <BTCIcon width="32px" height="32px" />,
                    value: "16,837,837"
                  },
                ]}
              />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Search