import React, { useState, useEffect } from 'react';

import { api } from 'utils/network';
import { GetURL } from '../../../utils/urlMap';

import { Flex,  Menu, MenuButton, MenuList, MenuItem, MenuDivider,  Center } from '@chakra-ui/react';
import { Text } from '@chakra-ui/layout';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Account, Avatar, Bell, Logout, MenuIcon, Refer, Ticket } from '../../../images/icon';
import { useWindowSize } from '../../../helper';
import TokenManager from '../../../utils/TokenManager';
import { useHistory } from 'react-router-dom';

const HeaderDropDownProfile = () => {
  const [userInfo, setUserInfo] = useState();
  const [fill, setFill] = useState('#808080');
  const [open, setOpen] = useState(false);
  const history = useHistory();

  useEffect(() => {
    api
      .get(GetURL('users-profile-info'))
      .then(response => {
        setUserInfo(response?.data);
      })
      .catch(err => {
        history.push('/auth/login');
      });
  }, [setUserInfo]);

  const {width} = useWindowSize();

  return (
    <Flex alignItems={'center'}>
      <Menu preventOverflow>
          <Avatar size="sm" name={userInfo?.username} />
        <Menu isOpen={open} onClose={() => setOpen(false)} onOpen={() => setOpen(true)}>
          <MenuButton
            onClick={() => setOpen(true)}
            color="#fff"
            border="none"
            px={4}
            py={2}
            transition="all 0.2s"
            borderWidth="1px"
            _hover={{ boxShadow: 'none', border: 'none' }}
            _expanded={{ bg: '#1652f0', border: 'none', boxShadow: 'none' }}
            _focus={{ boxShadow: 'none', border: 'none' }}
          >
            {userInfo?.base_info.first_name + ' ' + userInfo?.base_info.last_name} <ChevronDownIcon />
          </MenuButton>
          {open && (
            <MenuList padding="0" borderRadius="3px">
              <MenuItem
                onMouseEnter={() => setFill('#fff')}
                height="50px"
                _hover={{
                  backgroundColor: '#1652f0',
                  color: '#fff',
                  fill: fill,
                }}
                color="#788ca6"
                zIndex={999}
              >
                <Account width={15} margin="0 20px" />

                <Text margin="0 20px">حساب کاربری</Text>
              </MenuItem>
              <MenuDivider margin="0" color="#707070" />
              <MenuItem
                onMouseEnter={() => setFill('#fff')}
                height="50px"
                _hover={{
                  backgroundColor: '#1652f0',
                  color: '#fff',
                  fill: 'fill',
                }}
                zIndex={999}
                color="#788ca6"
              >
                <Refer width={15} />
                <Text margin="0 20px">دعوت از دوستان</Text>
              </MenuItem>
              <MenuDivider margin="0" color="#707070" />
              <MenuItem
                onMouseEnter={() => setFill('#fff')}
                height="50px"
                margin="0"
                _hover={{
                  backgroundColor: '#1652f0',
                  color: '#fff',
                  fill: fill,
                }}
                zIndex={999}
                color="#788ca6"
              >
                <Ticket fill={fill} />
                <Text margin="0 20px"> تیکت </Text>
              </MenuItem>
              <MenuDivider margin="0" color="#707070" />
              <MenuItem
                onMouseEnter={() => setFill('#fff')}
                onClick={e => {
                  TokenManager.clear();
                  window.location.reload();
                }}
                height="50px"
                margin="0"
                _hover={{
                  backgroundColor: '#1652f0',
                  color: '#fff',
                  fill: 'fill',
                }}
                zIndex={999}
                color="#788ca6"
              >
                <Logout />
                <Text margin="0 20px">خروج از حساب</Text>
              </MenuItem>
            </MenuList>
          )}
        </Menu>
        {width > 420 && (
          <>
            <Center margin="0 5px">
              <Bell />
            </Center>
            <Center margin="0 15px">
              <MenuIcon />
            </Center>
          </>
        )}
      </Menu>
    </Flex>
  );
};

export default HeaderDropDownProfile;
