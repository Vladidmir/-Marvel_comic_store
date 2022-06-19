import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
//Services
import MarvelService from '../../services/MarvelService';
import { useHttp } from '../../hooks/http.hook';

//Components
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage' 
import './randomChar.scss';

//Resources
import mjolnir from '../../resources/img/mjolnir.png';




const RandomChar = () => {

    const {loading, error, clearError} = useHttp()

    const [bannerInfo, setBannerInfo] = useState({})

    const {getCharacter} = MarvelService()

    useEffect(() => {
        updateChar()
        
        const timerId = setInterval(updateChar, 6000000)
        return clearInterval(timerId)
    },[])

    const onCharLoaded = (char) => {
        setBannerInfo(char)
    }


 
    const updateChar =  () => {
        
        if (error) {
            clearError()
        }

        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
            getCharacter(id)
            .then(onCharLoaded)
    }


    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading ? <Spinner/> : null
    const content = !errorMessage && !spinner ? <View char={bannerInfo}/> : null

    return (
        
        <div className="randomchar">

           {errorMessage}
           {spinner}
           {content}

            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button
                    onClick={updateChar}
                    className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

const View = ({char}) => {

    const {name, description, thumbnail, homepage, wiki} = char
    
    let imgStyle = {'objectFit' : 'cover'}
    if( thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'unset'}
    }

    const bannerVariants = {
        visible: {
            opacity: 1,
            translateX:0,
            transition: {
                type: "easeIn"
            }
        },
        hidden: {
            opacity: 0.3,  
            translateX: 300},
    }

    return (
        <motion.div 
            variants={bannerVariants}
            initial='hidden'
            animate='visible'
            className="randomchar__block">
            <img src={thumbnail} style={imgStyle} alt="Random character" className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </motion.div>
    )
}

export default RandomChar;