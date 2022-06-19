import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

import { useEffect, useState } from 'react';
import MarvelService from '../../services/MarvelService';


const RandomChar = () => {

    const {getCharacter} = MarvelService()

    const [bannerInfo, setBannerInfo] = useState({})

    useEffect(() => {
        
        updateChar()

        const timerId = setInterval(updateChar, 6000000)
        return clearInterval(timerId)
    },[])

    const onCharLoaded = (char) => {
        setBannerInfo(char)
    }

    const updateChar =  () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
            getCharacter(id)
            .then(onCharLoaded)
    }

    return (
        <div className="randomchar">
            <div className="randomchar__block">
                <img src={bannerInfo.thumbnail} alt="Random character" className="randomchar__img"/>
                <div className="randomchar__info">
                    <p className="randomchar__name">{bannerInfo.name}</p>
                    <p className="randomchar__descr">
                        {bannerInfo.description}
                    </p>
                    <div className="randomchar__btns">
                        <a href={bannerInfo.homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={bannerInfo.wiki} className="button button__secondary">
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