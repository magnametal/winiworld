import { useEffect, useState } from 'react'
import { useMainContext } from "../context/mainContext";

const useImage = (filename) => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [image, setImage] = useState(null)

    useEffect(() => {
        
        const fetchImage = async (file) => {
            try {
                const response = await import(`../../assets/${filename}`) // change relative path to suit your needs
                setImage(response.default)
            } catch (err) {
                console.log(err);
                setError(err)
            } finally {
                setLoading(false)
            }
        }
        if (filename) {
            fetchImage()
        }
    }, [filename])

    return {
        loading,
        error,
        image,
    }
}

export default useImage