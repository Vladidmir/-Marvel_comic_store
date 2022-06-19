import { useEffect, useState } from 'react';


//Components
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage' 
import Skeleton from '../skeleton/Skeleton'
import './charInfo.scss';

//Resources
import thor from '../../resources/img/thor.jpeg';

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

    const skeleton = charInfo || loading || error ? null : <Skeleton/>
    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading ? <Spinner/> : null
    const content = !(loading || error || !charInfo ) ? <View char={charInfo}/> : null


    return (
        <div className="char__info">

            {skeleton}
            {errorMessage}
            {spinner}
            {content}

        </div>
    )
}

const View = ({char}) => {

    return (
        <>
             <div className="char__basics">
                <img src={thor} alt="abyss"/>
                <div>
                    <div className="char__info-name">thor</div>
                    <div className="char__btns">
                        <a href="#" className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href="#" className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                In Norse mythology, Loki is a god or jötunn (or both). Loki is the son of Fárbauti and Laufey, and the brother of Helblindi and Býleistr. By the jötunn Angrboða, Loki is the father of Hel, the wolf Fenrir, and the world serpent Jörmungandr. By Sigyn, Loki is the father of Nari and/or Narfi and with the stallion Svaðilfari as the father, Loki gave birth—in the form of a mare—to the eight-legged horse Sleipnir. In addition, Loki is referred to as the father of Váli in the Prose Edda.
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                <li className="char__comics-item">
                    All-Winners Squad: Band of Heroes (2011) #3
                </li>
            </ul>
        </>
        
    )

}

export default CharInfo;