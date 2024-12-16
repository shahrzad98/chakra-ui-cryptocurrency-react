import React from 'react';
import { Text } from '@chakra-ui/react';

type PropTypes = {
  /**
   * Applies the theme typography styles.
   */
  variant?: string;
  /**
   * Override or extend the styles applied to the component.
   */
  styles?: object;
  /**
   * The color of the component.
   */
  color?: string;
  /**
   * configure the locale text, It accepts values en and fa inclusive. The default locale of Typography is fa (persian)
   */
  lang?: string;
  /**
   * The content of the component.
   */
  children: any;
  /**
   * Set the handler to handle click event.
   */
  onClick?: () => void;
};

const RABEX_COLOR = '#1652f0';
const DARK_COLOR = '#050f19';
const GRAY_COLOR = '#708599';

const variants = {
  caption: {
    fontSize: {
      base: '12px',
      md: '14px',
    },
    color: GRAY_COLOR,
  },
  title: {
    fontSize: {
      base: '14px',
      md: '18px',
    },
    fontWeight: 'bold',
    color: DARK_COLOR,
  },
  heading: {
    fontSize: {
      base: '18px',
      md: '28px',
    },
    color: DARK_COLOR,
  },
  body: {
    fontSize: {
      base: '14px',
      md: '16px',
    },
    color: DARK_COLOR,
  },
};

const colors = {
  rabex: {
    color: RABEX_COLOR,
  },
  dark: {
    color: DARK_COLOR,
  },
  gray: {
    color: GRAY_COLOR,
  },
};

const langs = {
  en: {
    fontFamily: 'graphik, sans-serif',
    dir: 'ltr',
  },
  fa: {
    fontFamily: 'yekan, sans-serif',
    dir: 'rtl',
  },
};

const Typography: React.FC<PropTypes> = ({
  children,
  styles = {},
  lang = 'fa',
  variant = 'body',
  color = '',
  onClick,
}) => {
  return (
    <Text
      {...variants[variant]}
      {...colors[color]}
      {...langs[lang]}
      {...styles}
      {...(onClick && {
        onClick: () => onClick(),
        cursor: 'pointer',
      })}
    >
      {children}
    </Text>
  );
};

export default Typography;
