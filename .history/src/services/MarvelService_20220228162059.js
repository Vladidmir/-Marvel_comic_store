const MarvelService = () => {

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=c5d6fc8b83116d92ed468ce36bac6c62';
    const getResource = async (url) => {

        let res = await fetch(url)

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`)

        }
    }

    const getAllCharacters = async () => {
        return await getResource(`${_apiBase}characters?${_apiKey}`)
    }

    const getCharacter = async (id) => {
        return await getResource(`${_apiBase}characters/${id}?${_apiKey}`)

    }


    return {getAllCharacters, getCharacter}
}

export default MarvelService