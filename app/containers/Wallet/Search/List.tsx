import React from "react"
import {
  Flex,
  Text,
  Image,
} from '@chakra-ui/react';
import _map from "lodash/map"

type listPropTypes = {
  items: {
    name: string;
    des?: string;
    icon: string | JSX.Element;
    value: string
  }[];
}

const List = ({ items }: listPropTypes) => {
  return (
    <Flex direction="column" gridGap="30px">
      {_map(items, item => (
        <Flex alignItems="center" justifyContent="space-between">
          <Flex gridGap="10px" alignItems="center">
            {typeof item.icon === "string" ? (
              <Image src={item.icon} width="32px" height="32px" backgroundColor="#f5f5f5" />
            ) : (
              item.icon
            )}
            <Flex direction="column">
              <Text fontSize="16px" fontFamily="yekanb">{item.name}</Text>
              {item.des && <Text fontSize="14px" color="#788ca6" fontFamily="graphikr">{item.des}</Text>}
            </Flex>
          </Flex>
          <Text fontSize="16px" fontFamily="yekan">{item.value}</Text>
        </Flex>
      ))}
    </Flex>
  )
}

export default List