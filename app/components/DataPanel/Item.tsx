import React from "react"
import styled from "styled-components"
import _map from "lodash/map"
import Typography from "components/Typography"

const ItemWrapper = styled.div`
  display: grid;
  animation-name: fadeIn;
  animation-duration: 0.2s;
  animation-timing-function: ease-out;
`
const ItemIcon = styled.div`
  width: 55px;
  height: 55px;
  display: grid;
  margin-bottom: 18px;
  align-items: center;
  justify-items: center;
`
const ItemList = styled.div`
  display: grid;
  grid-row-gap: 6px;
`

type LinkType = {
  key: string | number,
  title: string | JSX.Element,
  body: string | JSX.Element
}

type ItemPropTypes = {
  title: string,
  icon: JSX.Element,
  links: LinkType[],
  onClick: (val: any) => void
}

const Item: React.FC<ItemPropTypes> = ({
  title,
  icon,
  links,
  onClick,
}) => {
  return (
    <ItemWrapper>
      <ItemIcon>
        {icon}
      </ItemIcon>
      <Typography
        variant="title"
        styles={{
          marginBottom: "9px",
        }}
      >
        {title}
      </Typography>
      <ItemList>
        {_map(links, l => (
          <Typography 
            key={l.key}
            color="gray"
            onClick={() => onClick(l)}
          >
            {l.title}
          </Typography>
        ))}
      </ItemList>
    </ItemWrapper>
  )
}

export default Item