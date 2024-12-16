import React from "react"
import _map from "lodash/map"
import {
  Flex,
  Text,
  Progress,
  Menu,
  MenuButton,
  MenuList,
  Image
} from "@chakra-ui/react"
import { DragHandleIcon } from '@chakra-ui/icons'

import NavLink from 'components/RXNavLink';
import {useWindowSize} from 'helper/useWindowSize';

type WalletRowProps = {
  links: {
    disable?: boolean;
    anchor: string;
    path: string;
  }[];
  asset: {
    name: string;
    des?: string;
    icon: string | JSX.Element;
  };
  total?: string;
  available: string;
  percent?: number;
}

const WalletRow = ({ links, percent, available, total, asset }: WalletRowProps) => {
  const { width } = useWindowSize()
  const isMobile = width < 768 ? true : false

  return (
    <>
      {asset && (
        <Flex style={{gridArea: "asset"}} gridGap={{base: "15px", md: "22px"}} alignItems="center" paddingX={{base: "0", md: "44px"}}>
          {typeof asset.icon === "string" ? (
            <Image src={asset.icon} width={{base: "14px", md: "29px"}} height={{base: "14px", md: "29px"}} backgroundColor="#f5f5f5" />
          ) : (
            asset.icon
          )}
          <Flex direction="column" gridGap="5px">
            <Text fontSize={{base: "12px", md: "14px"}}>{asset.name}</Text>
            {asset.des && <Text display={{base: "none", md: "unset"}} fontSize="12px" color="#788ca6" fontFamily="graphikr">{asset.des}</Text>}
          </Flex>
        </Flex>
      )}
      {total && (
        <Flex style={{gridArea: "total"}} justifyContent="center">
          <Text fontSize="14px" fontFamily="yekan">{total}</Text>
        </Flex>
      )}
      {available && (
        <Flex style={{gridArea: "available"}} justifyContent={{base: "start", md: "center"}}> 
          <Text fontSize="14px" fontFamily="yekan">{available}</Text>
        </Flex>
      )}
      {percent && (
        <Flex style={{gridArea: "percent"}} direction="column" gridGap="12px">
          <Progress maxWidth="110px" height="8px" borderRadius="20px" value={percent} />
          <Text fontSize="12px" color="#788ca6">{`% ${percent}`}</Text>
        </Flex>
      )}
      {links && (
        <Flex style={{gridArea: "links"}} alignItems="center" justifyContent={{base: "center", md: "unset"}} gridGap="15px">
          {isMobile ? (
            <Menu>
              <MenuButton>
                <DragHandleIcon color="#788ca6" />
              </MenuButton>
              <MenuList maxWidth="94px">
                <Flex direction="column" gridGap="12px" padding="12px" alignItems="center">
                  {_map(links, link => (
                    link.disable ? (
                      <Text key={link.anchor} fontSize="12px" color="#a2b9f6">{link.anchor}</Text>
                    ) : (
                      <NavLink key={link.anchor} height="auto" to={link.path}>
                        <Text fontSize="12px" color="#1652f0">{link.anchor}</Text>
                      </NavLink>
                    )
                  ))}
                </Flex>
              </MenuList>
            </Menu>
          ) : (
            _map(links, link => (
              link.disable ? (
                <Text key={link.anchor} fontSize="12px" color="#a2b9f6">{link.anchor}</Text>
              ) : (
                <NavLink key={link.anchor} height="auto" to={link.path}>
                  <Text fontSize="12px" color="#1652f0">{link.anchor}</Text>
                </NavLink>
              )
            ))
          )}
        </Flex>
      )}
    </>
  )
}

export default WalletRow