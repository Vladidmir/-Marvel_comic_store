import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

//Components
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage' 
import Skeleton from '../skeleton/Skeleton'
import './charInfo.scss';

//Resources

//Services
import MarvelService from '../../services/MarvelService';




const CharInfo = ({charId}) => {

    const [charInfo, setCharInfo] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const {getCharacter} = MarvelService()

    useEffect(() => {
        updateChar()
    },[charId])


    const updateChar = () => {
        if(!charId) {
            return
        }

        onCharLoading()
        getCharacter(charId)
            .then(onCharLoaded)
            .catch(onError)
    }

    const onCharLoaded = (selectedCharInfo) => {
        setCharInfo(selectedCharInfo)
        setLoading(false)
    }

    const onCharLoading = () => {
        setLoading(true)
    }

    const onError = () => {
        setLoading(false)
        setError(true)
    }

    const infoHeroVariants = {
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

    const skeleton = charInfo || loading || error ? null : <Skeleton/>
    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading ? <Spinner/> : null
    const content = !(loading || error || !charInfo ) ? <View char={charInfo}/> : null


    return (
        <motion.div
        variants={infoHeroVariants}
        initial='hidden'
        animate='visible'
        >
        <div className="char__info">
         

            {skeleton}
            {errorMessage}
            {spinner}
            {content}


        </div>
        </motion.div>

    )
}

const View = ({char}) => {

    const {name, description, thumbnail, homepage, wiki, comics, id} = char

    let imgStyle = {'objectFit' : 'cover'}
    if( thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'unset'}
    }


    return (
        <>
             <motion.div
        variants={infoHeroVariants}
        initial='hidden'
        animate='visible'
        >
            <div className="char__basics">
                <img src={thumbnail} style={imgStyle} alt="abyss"/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">{description}</div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">

            {comics.lenght > 0 ? null : 'There is no comics with this character'}

            {comics.map((item, i) => {
                if (i > 9) return
                return (

                    <li
                        key={id}
                        className="char__comics-item">
                        {item.name}
                    </li>

                )
            })}
                 
            </ul>
            </motion.div>
        </>

        
        
    )

}

export default CharInfo;