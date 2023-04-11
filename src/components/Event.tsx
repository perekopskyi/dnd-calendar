import styled from '@emotion/styled'
import { EventComponentProps } from '../types'

const EventContainer = styled.div`
  background-color: #fff;
  color: #000;
`

export const Event: React.FC<EventComponentProps> = ({ title }) => {
  return (
    <EventContainer>
      <p>{title}</p>
    </EventContainer>
  )
}
