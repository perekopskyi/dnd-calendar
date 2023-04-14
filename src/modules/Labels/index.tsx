import { useState } from 'react'
import { ROUTES } from '../../App'
import { Button } from '../../components/common/Button'
import { Main } from '../../components/styledComponents'
import { useLabelsContext } from './Context'
import { LabelsList } from './LabelsList'

export const Labels = () => {
  const { create } = useLabelsContext()
  const [text, setText] = useState<string>('')
  const [color, setColor] = useState<string>('#c7c7c7')

  const onSubmit = () => {
    const body = { text, color }
    create(body)
  }

  return (
    <Main>
      <Button to={ROUTES.MAIN}>Back</Button>
      <h2>Labels</h2>

      <div style={{ display: 'flex', flexDirection: 'column', width: 500 }}>
        <div>
          <label htmlFor="text" style={{ marginRight: 16 }}>
            Text:
          </label>
          <input id="text" onChange={event => setText(event.target.value)} />
        </div>
        <div style={{ marginTop: 8 }}>
          <label htmlFor="color" style={{ marginRight: 8 }}>
            Color:
          </label>
          <input
            id="color"
            type="color"
            onChange={event => {
              setColor(event.target.value)
            }}
            value={color}
          />
        </div>
        <Button onClick={onSubmit}>Add</Button>
      </div>

      <LabelsList />
    </Main>
  )
}
