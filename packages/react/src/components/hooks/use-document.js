import { useEffect, useState } from 'react'

const useDocument = () => {
  const [myDocument, setMyDocument] = useState(null)
   
  useEffect(() => {
    setMyDocument(document)
  }, [])

  return myDocument
}

export default useDocument;