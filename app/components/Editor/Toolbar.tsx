import createToolbarPlugin, { Separator } from '@draft-js-plugins/static-toolbar';
import React from 'react';
//@ts-ignore
// import linkStyles from './linkStyles.module.css';

import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  UnorderedListButton,
  OrderedListButton,
} from '@draft-js-plugins/buttons';
import createLinkPlugin from '@draft-js-plugins/anchor';

export const linkPlugin = createLinkPlugin({
  //@ts-ignore
  placeholder: 'http://…',
});
export const toolbarPlugin = createToolbarPlugin();

const ToolbarComponent = () => {
  const { Toolbar } = toolbarPlugin;
  return (
    <Toolbar>
      {(externalProps: any) => (
        <>
          <BoldButton {...externalProps} />
          <ItalicButton {...externalProps} />
          <UnderlineButton {...externalProps} />
          <Separator {...externalProps} />
          <UnorderedListButton {...externalProps} />
          <OrderedListButton {...externalProps} />
          <Separator {...externalProps} />
          <linkPlugin.LinkButton {...externalProps} />
        </>
      )}
    </Toolbar>
  );
};

export default ToolbarComponent;
