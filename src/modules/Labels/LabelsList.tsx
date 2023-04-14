import { useMemo } from 'react'
import styled from '@emotion/styled'
import { Label } from '../../types'
import { useLabelsContext } from './Context'
import {LabelItem} from './Label' 

const LabelsContainer = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  margin-top: 16px;
`

export const LabelsList = () => {
  const { isLoading, labels, error } = useLabelsContext()
  const labelsData = useMemo(() => labels, [labels])

  return (
    <LabelsContainer>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <p>{error}</p>
      ) : (
        labelsData.map(({ color, text }: Label, index) => (
          <LabelItem key={index + `${text}+${color}`} {...{ color, text }} />
        ))
      )}
    </LabelsContainer>
  )
}
