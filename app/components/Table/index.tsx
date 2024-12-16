import React from "react"
import styled from "styled-components"
import _map from "lodash/map"

type TableProps = {
  columns: {
    title: string | JSX.Element;
    span: string;
    align?: string;
  }[];
  rows: string[] | JSX.Element[];
  empty?: string | JSX.Element;
  areas?: string;
}

const Container = styled.div`
  border-radius: 3px;
  border: 1.5px solid #f4f6fa;
`
const Header = styled.div`
  display: grid;
  height: 45px;
  align-items: center;
  border-bottom: 1.5px solid #f4f6fa;
  @media (max-width: 768px) {
    padding-right: 15px
  }
`
const Body = styled.div`
  display: flex;
  flex-direction: column;
`
  
const Column = styled.div`
  color: #788ca6;
  @media (max-width: 768px) {
    font-size: 12px
  }
`
  
const Row = styled.div`
  display: grid;
  height: 90px;
  align-items: center;
  border-bottom: 1.5px solid #f4f6fa;
  @media (max-width: 768px) {
    padding: 15px 15px 15px 0;
  }
  &:last-child {
    border-bottom: 0;
  }
`

const Table = ({columns, rows, empty, areas}: TableProps) => {
  const gridTemplateColumns = _map(columns, c => c.span).join(" ")
  return (
    <Container>
      <Header style={{gridTemplateColumns}}>
        {_map(columns, (column, i) => (
          <Column
            key={i}
            style={{justifySelf: column.align ? column.align : "center"}}
          >
            {column.title}
          </Column>
        ))}
      </Header>
      <Body>
        {rows.length > 0 ? _map(rows, (row, i) => (
          <Row
            key={i}
            style={{
              gridTemplateColumns,
              gridTemplateAreas: areas ? areas : "unset"
            }}
          >
            {row}
          </Row>
        )) : empty}
      </Body>
    </Container>
  )
}

export default Table