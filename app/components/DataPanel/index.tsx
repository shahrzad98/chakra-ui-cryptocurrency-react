import React from "react"
import styled from "styled-components"
import _map from "lodash/map"
import Typography from "components/Typography"
import { ChevronLeftIcon } from "@chakra-ui/icons"
import { FormattedMessage } from 'react-intl';
import messages from './messages';

import Item from "./Item"

type contentType = {
  key: string | number,
  title: string | JSX.Element,
  body: string | JSX.Element
}

type DataType = {
  title: string,
  icon: JSX.Element,
  key: string | number,
  links: contentType[],
}

type DataPanelPropTypes = {
  data: DataType[],
}

const Wrapper = styled.div`
  display: grid;
  `
const ItemsWrapper = styled.div`
  display: grid;
  grid-gap: 60px;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
`

const Content = styled.div`
  display: grid;
  grid-row-gap: 16px;
  animation-name: fadeIn;
  animation-duration: 0.2s;
  animation-timing-function: ease-out;
`
const Body = styled.div`
  line-height: 30px;
`
const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  grid-column-gap: 5px;
  margin-bottom: 16px;
`

const DataPanel: React.FC<DataPanelPropTypes> = ({
  data
}) => {
  const [content, setContent] = React.useState<contentType | null>(null)

  return (
    <Wrapper>
      {content ? (
        <Content>
          <Breadcrumb>
            <Typography
              variant="caption"
              onClick={() => {
                setContent(null)
              }}
            >
              <FormattedMessage {...messages.home} />
            </Typography>
            <ChevronLeftIcon
              fontSize="20px"
              color="#708599"
            />
            <Typography variant="caption">{content.title}</Typography>
          </Breadcrumb>
          <Typography>
            <strong>{content.title}</strong>
          </Typography>
          <Body>{content.body}</Body>
        </Content>
      ) : (
        <ItemsWrapper>
          {_map(data, item => (
            <Item
              key={item.key}
              icon={item.icon}
              title={item.title}
              links={item.links}
              onClick={val => setContent(val)}
            />
          ))}
        </ItemsWrapper>
      )}
    </Wrapper>
  )
}

export default DataPanel