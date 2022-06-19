import './randomChar.scss';
import thor from '../../resources/img/thor.jpeg';
import mjolnir from '../../resources/img/mjolnir.png';

import { useEffect, useState } from 'react';
import MarvelService from '../../services/MarvelService';


const RandomChar = () => {

    const {getCharacter, getAllCharacters} = MarvelService()

    const [heroInfo, setHeroInfo] = useState({
        name: null,
        description: null,
        thumbnail: null,
        homepage: null,
        wiki: null,
    })

    useEffect(() => {
        updateChar()
    },[])

    const updateChar =  () => {
        const id = 1011005
            getCharacter(id)
            .then(res => {
                console.log(res)
                  setHeroInfo({
                    name: res.data.results[0].name,
                    description: res.data.results[0].description,
                    thumbnail: res.data.results[0].thumbnail.path + '.' + res.data.results[0].thumbnail.extension,
                    homepage: res.data.results[0].urls[0].url,
                    wiki:res.data.results[0].urls[1].url,
                })
            })
    }

    return (
        <div className="randomchar">
            <div className="randomchar__block">
                <img src={heroInfo.thumbnail} alt="Random character" className="randomchar__img"/>
                <div className="randomchar__info">
                    <p className="randomchar__name">{heroInfo.name}</p>
                    <p className="randomchar__descr">
                        {heroInfo.description}
                    </p>
                    <div className="randomchar__btns">
                        <a href="#" className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href="#" className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

export default RandomChar;