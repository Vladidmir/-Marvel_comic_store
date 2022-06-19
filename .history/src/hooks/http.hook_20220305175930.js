import { useState, useCallback } from "react";

export const useHttp = () => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {

        setLoading(true)

        try {

            const response = await fetch(url, {method, body, headers})
            const data = await response.json()

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${res.status}`)
    
            }
            
            
        } catch (error) {
            
        }

    }


}