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
        const res =   getResource(`${_apiBase}characters?${_apiKey}`)
    }

    const getCharacter = async (id) => {
        const res = await  getResource(`${_apiBase}characters/${id}?${_apiKey}`)
        return _transformCharacter(res)
    }

    const _transformCharacter = (res) => {
        return {
            name: res.data.results[0].name,
            description: res.data.results[0].description,
            thumbnail: res.data.results[0].thumbnail.path + '.' + res.data.results[0].thumbnail.extension,
            homepage: res.data.results[0].urls[0].url,
            wiki:res.data.results[0].urls[1].url,
        }
    }


    return {getAllCharacters, getCharacter}
}

export default MarvelService