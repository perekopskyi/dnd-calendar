import React from 'react'
import DomToImage from 'dom-to-image'
import { Button } from './common/Button'

interface DownloadButtonProps {
  componentRef: React.MutableRefObject<null>
}

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
