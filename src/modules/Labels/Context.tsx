import { createContext, useContext, useEffect, useState } from 'react'
import { ChildrenInterface, Label, LabelWithId } from '../../types'
import { useLabelsApi } from '../../api/labelsApi'

interface LabelsContextData {
  isLoading: boolean
  labels: LabelWithId[]
  error: string | null
  setLabels: (labels: LabelWithId[]) => void
  create: (label: Label) => any
  read: () => any
  update: (labels: LabelWithId[]) => any
}

export const LabelsContext = createContext<LabelsContextData>({
  isLoading: false,
  labels: [],
  error: null,
  setLabels: () => {},
  create: () => {},
  read: () => {},
  update: () => {}
})

export const LabelsProvider = ({ children }: ChildrenInterface) => {
  const [labels, setLabels] = useState<Array<LabelWithId>>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const labelsApi = useLabelsApi()

  useEffect(() => {
    fetchLabelsData()
  }, [])

  const fetchLabelsData = async () => {
    setIsLoading(true)
    try {
      const labels = await labelsApi.read()
      if (labels) {
        setLabels(labels)
      }
      setIsLoading(false)
    } catch (error) {
      setError('Error fetching labels data')
      setIsLoading(false)
    }
  }

  const handleCreate = async (label: Label) => {
    setIsLoading(true)
    try {
      const res = await labelsApi.create(label)
      if (res) {
        setLabels(res)
      }
    } catch (error) {
      console.log('error:', error)
      setError('Create error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdate = async (labels: Array<LabelWithId>) => {
    setIsLoading(true)
    try {
      const res = await labelsApi.update(labels)
      if (res) {
        setLabels(res)
      }
    } catch (error) {
      console.log('error:', error)
      setError('Update error')
    } finally {
      setIsLoading(false)
    }
  }

  // const handleDelete = async (labels: Label[]) => {
  //   setIsLoading(true)
  //   try {
  //     await labelsApi.remove(labels)
  //   } catch (error) {
  //     console.log('error:', error)
  //     setError('Remove error')
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  // update the `value` prop of the `LabelsContext.Provider` component to include the `api` state variable
  const value = {
    isLoading,
    labels,
    error,
    setLabels,
    create: handleCreate,
    read: fetchLabelsData,
    update: handleUpdate,
    // remove: handleDelete,

  }

  return (
    <LabelsContext.Provider value={value}>{children}</LabelsContext.Provider>
  )
}

export const useLabelsContext = () => useContext(LabelsContext)
