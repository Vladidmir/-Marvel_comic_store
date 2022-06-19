const MarvelService = () => {

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/'
    const _apiKey = 'apikey=9d205aa87485e0ab8c8309479a2a7183'

    const getResource = async (url) => {

        let res = await fetch(url)

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`)

        }
        
        return await res.json()
    }

    const getAllCharacters = async () => {
        return await  getResource(`${_apiBase}characters?${_apiKey}`)
    }

    const getCharacter = async (id) => {
        return await  getResource(`${_apiBase}characters/${id}?${_apiKey}`)

    }


    return {getAllCharacters, getCharacter}
}

export default MarvelService