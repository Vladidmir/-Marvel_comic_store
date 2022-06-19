const MarvelService = () => {

    const getResource = async (url) => {

        let res = await fetch(url)

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`)

        }
    }

    const getAllCharacters = a() => {
        return getResource(`https://gateway.marvel.com:443/v1/public/characters?apikey=9d205aa87485e0ab8c8309479a2a7183`)
    }

    const getCharacter = (id) => {
        return getResource(`https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=9d205aa87485e0ab8c8309479a2a7183`)

    }


    return {getAllCharacters, getCharacter}
}

export default MarvelService