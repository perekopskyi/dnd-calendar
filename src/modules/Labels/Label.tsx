import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { Label as LabelType } from '../../types'

const StyledLabel = styled.div`
  display: flex;
  align-items: center;
  margin: 0.2rem 0;
  cursor: pointer;
`

const Dot = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: red;
  margin-right: 0.5rem;
  ${({ color }) =>
    css`
      background: ${color || '#ccc'};
      color: black;
    `}
`

export const LabelItem = ({ color, text }: LabelType) => {
  const onClick = () => {
    // TODO open modal and change lable
  }

  return (
    <StyledLabel {...{ onClick }}>
      <Dot {...{ color }} />
      <span>{text}</span>
    </StyledLabel>
  )
}
