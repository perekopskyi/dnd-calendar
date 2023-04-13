import { Link } from 'react-router-dom'
import styled from '@emotion/styled'

interface ButtonInterface {
  children: React.ReactNode
  to?: string
  onClick?: () => void
}

const StyledButton = styled.button`
  background-color: #4caf50;
  border: none;
  color: #ffffff;
  padding: 15px 32px;
  text-align: center;
  transition-duration: 0.4s;
  margin: 16px 0 0;
  text-decoration: none;
  font-size: 16px;
  cursor: pointer;
  border-radius: 8px;
  &:hover {
    background-color: #3e8e41;
  }
`

export const Button: React.FC<ButtonInterface> = ({
  onClick,
  to,
  children,
}) => {
  if (to) {
    return (
      <Link {...{to}}>
        <StyledButton>{children}</StyledButton>
      </Link>
    )
  }

  return <StyledButton {...{ onClick }}>{children}</StyledButton>
}
