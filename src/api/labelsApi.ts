import { Label, LabelWithId } from '../types'
import { useLabelsContext } from '../modules/Labels/Context'

export interface LabelsApi {
  create: (label: Label) => Promise<LabelWithId[]>
  read: () => Promise<LabelWithId[]>
  update: (labels: Label[]) => Promise<LabelWithId[]>
  // remove: (labels: Label[]) => void
}

const DB_NAME = 'labels-db'
const STORE_NAME = 'labels-store'

const openDB = (): Promise<IDBDatabase> =>
  new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1)

    request.onerror = () => {
      reject(request.error)
    }

    request.onsuccess = () => {
      resolve(request.result)
    }

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = request.result
      if (event.oldVersion < 1) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true })
      }
    }
  })

const saveToDB = async (label: Label): Promise<Array<LabelWithId>> => {
  const db = await openDB()

  return new Promise<Array<LabelWithId>>((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite')
    const store = transaction.objectStore(STORE_NAME)

    const addRequest = store.put(label)

    addRequest.onerror = () => {
      return reject(addRequest.error)
    }

    transaction.oncomplete = () => {
      const transaction2 = db.transaction(STORE_NAME, 'readonly')
      const store2 = transaction2.objectStore(STORE_NAME)

      const getAllRequest = store2.getAll()

      getAllRequest.onsuccess = () => {
        const labelsWithId = getAllRequest.result as LabelWithId[]
        db.close()
        return resolve(labelsWithId)
      }

      getAllRequest.onerror = () => {
        db.close()
        return reject(getAllRequest.error)
      }
    }

    transaction.onerror = () => {
      db.close()
      return reject(transaction.error)
    }
  })
}

const readFromDB = async (): Promise<LabelWithId[]> => {
  const db = await openDB()

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly')
    const store = transaction.objectStore(STORE_NAME)
    const request = store.getAll()

    request.onsuccess = () => {
      db.close()
      return resolve(request.result)
    }

    request.onerror = () => {
      db.close()
      return reject(request.error)
    }
  })
}

const updateInDB = async (labels: Label[]): Promise<LabelWithId[]> => {
  const db = await openDB()

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite')
    const store = transaction.objectStore(STORE_NAME)

    transaction.oncomplete = () => {
      const getAllRequest = store.getAll()
      getAllRequest.onsuccess = () => {
        const labelsWithId = getAllRequest.result as LabelWithId[]
        db.close()
        return resolve(labelsWithId)
      }
    }

    transaction.onerror = () => {
      db.close()
      return reject(transaction.error)
    }

    for (const label of labels) {
      store.put(label)
    }
  })
}

  const removeLabels = async (labelsToRemove: LabelWithId[]): Promise<LabelWithId[]>  => {
    const db = await openDB()

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite')
      const store = transaction.objectStore(STORE_NAME)

      // TODO
    })
  }

export const useLabelsApi = (): LabelsApi => {
  const { labels } = useLabelsContext()

  

  return {
    create: saveToDB,
    read: readFromDB,
    update: updateInDB,
    // remove: removeLabels,
  }
}
