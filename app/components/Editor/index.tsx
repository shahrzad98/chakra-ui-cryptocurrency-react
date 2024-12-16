import React from 'react';
import { EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js';

import Editor, { createEditorStateWithText } from '@draft-js-plugins/editor';
import Toolbar, { toolbarPlugin, linkPlugin } from './Toolbar';

import styled from 'styled-components';

import 'draft-js/dist/Draft.css';
import '@draft-js-plugins/static-toolbar/lib/plugin.css';
import draftToHtml from 'draftjs-to-html';
import { convertToHTML } from 'draft-convert';

type EditorPropTypes = {
  initialValue?: string;
  onChange: (content: string) => void;
};

const Container = styled.div`
  box-sizing: border-box;
  border: 1px solid #ddd;
  cursor: text;
  border-radius: 2px;
  min-height: 100px;
  width: 100%;
  background: #fefefe;
  position: relative;
  & > div:nth-child(1) {
    border: 0;
    height: 40px;
  }
  & > div:nth-child(1) button {
    height: auto;
    padding: 6px;
  }
  & .public-DraftEditor-content {
    padding: 1rem;
    min-height: 100px;
  }
`;

const handleContent = (content: string) => {
  if (content.length > 2) {
    const blocksFromHTML = convertFromHTML(content);
    const state = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap);
    return EditorState.createWithContent(state);
  }
  return createEditorStateWithText('');
};

const MyEditor: React.FC<EditorPropTypes> = ({ initialValue, onChange }) => {
  const [editorState, setEditorState] = React.useState(() => handleContent(initialValue || ''));

  const handleOnChange = (editorState: any) => {
    convertToHTML(editorState.getCurrentContent());
    setEditorState(editorState);

    const content = draftToHtml(convertToRaw(editorState.getCurrentContent()), undefined, true);

    onChange(content);
  };

  return (
    <Container>
      <Toolbar />
      <Editor editorState={editorState} onChange={handleOnChange} plugins={[toolbarPlugin, linkPlugin]} />
    </Container>
  );
};

export default MyEditor;
