import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Button,
  useDisclosure,
  Link,
  color,
  Center,
  Grid,
  GridItem,
  Box,
  Input,
  Flex,
  Img,
  Spacer,
} from '@chakra-ui/react';
import Li from 'components/Li';
import RabexButton from 'components/RabexButton';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import React from 'react';
import NavLink from 'components/RXNavLink';
import { DrawerIcon, LogoWhite, LogoR } from '../../../images/icon';

const Header = () => {
  const [size, setSize] = React.useState('full');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClick = newSize => {
    setSize(newSize);
    onOpen();
  };

  return (
    <>
      <Box dir="rtl" textAlign="center" display={{ base: 'block', lg: 'none' }}>
        <Flex alignItems="center">
          <Box
            onClick={() => handleClick(size)}
            display={{ base: 'block', lg: 'none' }}
            background="#1652f0"
            marginRight="25px"
            marginTop="16px"
          >
            <DrawerIcon />
          </Box>

          <Drawer onClose={onClose} isOpen={isOpen} size={size}>
            <DrawerOverlay>
              <DrawerContent>
                <DrawerBody padding="0" background="#1652F0">
                  {/* <Grid
                    h="50px"
                    templateRows="repeat(1, 1fr)"
                    templateColumns="repeat(5, 1fr)"
                    gap={1}
                  >
                    <GridItem >
                    <LogoWhite width="20" />

                    </GridItem>
                    <GridItem colSpan={3}  />
                    <GridItem  >
                    <DrawerIcon />

                    </GridItem>
                  </Grid> */}

                  <Flex height="41px" alignItems="center">
                    <Box background="#1652f0" color="#fff" marginRight="15px" onClick={onClose}>
                      <DrawerIcon />
                    </Box>

                    <Spacer />

                    <Center marginLeft="18px">
                      <LogoR width="41" height="24" />
                    </Center>
                  </Flex>
                  <Box borderBottom="1px solid #3156fd"></Box>

                  <Box textAlign="right" margin="30px 24px 0 24px" dir="rtl">
                    <ul>
                      <Link fontSize="12px" color="#fff" display="block" className="text-white">
                        <FormattedMessage {...messages.price} />
                      </Link>
                      <Link
                        marginTop="22px"
                        fontSize="12px"
                        color="#fff"
                        display="block"
                        className="text-white"
                        isExternal
                        href="https://rabex.ir/about"
                      >
                        <FormattedMessage {...messages.about} />
                      </Link>
                      <Link
                        _hover={{ color: '#fff' }}
                        fontSize="12px"
                        marginTop="22px"
                        color="#fff"
                        display="block"
                        isExternal
                        href="https://rabex.ir/crypto/"
                      >
                        درباره رمز ارزها
                      </Link>

                      <Link
                        _hover={{ color: '#fff' }}
                        marginTop="22px"
                        fontSize="12px"
                        display="block"
                        color="#fff"
                        isExternal
                        href="https://rabex.ir/help/"
                      >
                        راهنما
                      </Link>
                      <Link
                        _hover={{ color: '#fff' }}
                        marginTop="22px"
                        fontSize="12px"
                        display="block"
                        color="#fff"
                        isExternal
                        href="https://rabex.ir/contact/"
                      >
                        تماس با ما
                      </Link>
                    </ul>
                  </Box>
                  <Box textAlign="center" marginTop="35px" marginRight="20px" marginLeft="20px">
                    <NavLink to="/auth/register" display="block" padding="0">
                      <Box
                        _hover={{ color: '#1652f0' }}
                        lineHeight="41px"
                        margin="0 auto"
                        borderRadius="3px"
                        background="#fff"
                        padding="0"
                        color="#1652f0"
                        w="100%"
                        height="41px"
                      >
                        ایجاد حساب کاربری
                      </Box>
                    </NavLink>
                    <NavLink to="/auth/login" display="block" padding="0">
                      <Box
                        display="block"
                        _hover={{ color: '#fff' }}
                        lineHeight="41px"
                        margin="0 auto"
                        borderRadius="3px"
                        padding="0"
                        border="1px solid #fff"
                        background="#1652f0"
                        color="#fff"
                        marginTop="7px"
                        w="100%"
                        height="41px"
                      >
                        ورود به حساب کاربری
                      </Box>
                    </NavLink>
                  </Box>
                </DrawerBody>
              </DrawerContent>
            </DrawerOverlay>
          </Drawer>

          <Box
            display={{ base: 'flex', lg: 'none' }}
            marginRight="20px"
            alignItems="center"
            height="43px"
            marginLeft="18px"
            marginTop="16px"
          >
            <LogoWhite width="67px" marginTop="18px" marginRight="8px" />
          </Box>

          <Spacer />

          <Flex display={{ base: 'block', lg: 'none' }} marginLeft={{ base: '20px' }} zIndex="9">
            <Box marginTop="16px">
              <NavLink to="/auth/login">
                <Box _hover={{ color: '#fff' }} marginLeft="20px" marginTop="16px" display="inline-block" color="#fff">
                  <FormattedMessage {...messages.loginmenu} />
                </Box>
              </NavLink>

              <NavLink display="inline-block" to="/auth/register">
                <Box
                  borderRadius="4px"
                  border="1px solid #fff"
                  background="#fff"
                  color="#1682f0"
                  display="inline-block"
                  padding="8px 24px"
                >
                  <FormattedMessage {...messages.start} />
                </Box>
              </NavLink>
            </Box>
          </Flex>
        </Flex>
        <Box display={{ base: 'block', lg: 'none' }} marginTop="10px" borderBottom="1px solid #3156fd" />
      </Box>
      <Flex dir="rtl" height={{ lg: '80px' }} alignItems="center">
        <Box display={{ base: 'none', lg: 'block' }} marginRight={{ xl: '268px', lg: '160px' }} marginTop="7px">
          <LogoR height="40px" marginTop="4px" marginLeft="15px" />
        </Box>
        <Box width="67px" marginTop="4px" marginRight="8px">
          <LogoWhite />
        </Box>

        <Box position="absolute" right="0" top="35px" left="0" display={{ base: 'none', lg: 'block' }}>
          <ul>
            <Link
              _hover={{ color: '#fff' }}
              marginLeft="30px"
              marginRight="30px"
              marginTop="31px"
              color="#fff"
              isExternal
              href="https://rabex.ir/about"
            >
              درباره ما
            </Link>
            <Link
              _hover={{ color: '#fff' }}
              marginLeft="30px"
              marginRight="30px"
              marginTop="31px"
              color="#fff"
              isExternal
              href="https://rabex.ir/crypto/"
            >
              درباره رمز ارزها
            </Link>

            <Link
              _hover={{ color: '#fff' }}
              marginLeft="30px"
              marginRight="30px"
              marginTop="31px"
              color="#fff"
              isExternal
              href="https://rabex.ir/help/"
            >
              راهنما
            </Link>
            <Link
              _hover={{ color: '#fff' }}
              marginLeft="30px"
              marginRight="30px"
              marginTop="31px"
              color="#fff"
              isExternal
              href="https://rabex.ir/contact/"
            >
              تماس با ما
            </Link>
          </ul>
        </Box>
        <Spacer />

        <Flex
          display={{ base: 'none', lg: 'block' }}
          marginLeft={{ xl: '268px', lg: '130px' }}
          marginTop={{ lg: '-8px' }}
          zIndex="9"
        >
          <NavLink to="/auth/login">
            <Box _hover={{ color: '#fff' }} marginLeft="20px" marginTop="31px" display="inline-block" color="#fff">
              <FormattedMessage {...messages.loginmenu} />
            </Box>
          </NavLink>

          <NavLink marginTop="16px" display="inline-block" to="/auth/register">
            <Box
              borderRadius="4px"
              border="1px solid #fff"
              background="#fff"
              color="#1682f0"
              display="inline-block"
              padding="11px 36px"
            >
              <FormattedMessage {...messages.start} />
            </Box>
          </NavLink>
        </Flex>
      </Flex>
      <Box display={{ base: 'none', lg: 'block' }} marginTop="6px" borderBottom="1px solid #3156fd" />
    </>
  );
};

export default Header;
