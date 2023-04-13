import React from 'react'
import DomToImage from 'dom-to-image'
import styled from '@emotion/styled'

interface DownloadButtonProps {
  componentRef: React.MutableRefObject<null>
}

const Button = styled.button`
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
export const DownloadButton: React.FC<DownloadButtonProps> = ({
  componentRef,
}) => {
  const handleDownload = () => {
    const node = componentRef.current

    if (!node) return

    DomToImage.toJpeg(node).then(dataUrl => {
      const link = document.createElement('a')
      link.download = 'calendar.jpeg'
      link.href = dataUrl
      link.click()
    })
  }

  return <Button onClick={handleDownload}>Download as image</Button>
}
