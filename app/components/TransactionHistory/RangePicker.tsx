import React from "react"
import DatePicker from 'react-multi-date-picker';
import DatePanel from 'react-multi-date-picker/plugins/date_panel';
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import { CalendarIcon } from '@chakra-ui/icons'

import {
  Flex,
  Input
} from '@chakra-ui/react';

type RangePickerPropTypes = {}

const CustomRangeInput = ({openCalendar, value}) => {
  let from = value[0] || ""
  let to = value[1] || ""
  
  value = from && to ? `${to}  الی  ${from}` : from

  return (
    <Flex
      height={{base: "26px", md: "33px"}}
      background='#f7f8fc'
      borderRadius='20px'
      width={{base: "120px", md: "150px"}}
      position="relative"
      color="#233a7d"
      padding={{base: "8px 12px", md: "9px 19px"}}
      direction="row"
      alignItems="center"
    >
      <CalendarIcon fontSize={{base: "11px", md: "15px"}}/>
      <Input
        height='100%'
        width={{base: "77px", md: "93px"}}
        marginRight="5px"
        fontSize={{base: "12px", md: "14px"}}
        fontWeight="bold"
        color="#233a7d"
        border="0"
        padding={{base: "1px 0 0", md: "5px 0 0"}}
        background="transparent"
        textAlign='right'
        placeholder="انتخاب بازه زمانی"
        onFocus={openCalendar}
        value={value}
        readOnly
      />
    </Flex>
  )
}

const RangePicker = ({}: RangePickerPropTypes) => {
  return (
    <DatePicker
      range
      calendar={persian}
      locale={persian_fa}
      format="MM-DD"
      plugins={[<DatePanel />]}
      //@ts-ignore
      render={<CustomRangeInput />}
    />
  )
}

export default RangePicker