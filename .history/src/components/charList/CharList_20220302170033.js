import { useEffect, useState } from 'react';

//Services
import MarvelService from '../../services/MarvelService';
import { motion } from 'framer-motion';


//Components
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage'
import './charList.scss';


//Resources



const CharList = ({onCharSelected}) => {

    const [charList, setCharlist] = useState([])
    const [loading, setLoading] = useState(false)
    const [newItenLoading, setNewItenLoading] = useState(true)
    const [error, setError] = useState(false)
    const [offset, setOffset] = useState(0)
    const [charEnded, setCharEnded] = useState(false)

    const {getAllCharacters} = MarvelService()

    useEffect(() => {
        onRequest()
        setLoading(true)
    }, [])

    const onRequest = (offset) => {
        setNewItenLoading(true)
        getAllCharacters(offset)
            .then(onCharListLoaded)
            .catch(onError)
    }

    const onCharListLoaded = (newCharList) => {

        let ended = false

        if (newCharList.lenght < 9) {
            ended = true
        }

        setCharlist((oldCharlist) => [...oldCharlist, ...newCharList])
        setLoading(false)
        setNewItenLoading(false)
        setOffset(offset => offset + 9)
        setCharEnded(ended)
    }

    const onError = () => {
        setError(true)
        setLoading(false)
    }

    function renderItems(arr) {

        const items = arr.map((item) => {
            let imgStyle = {'objectFit' : 'cover'}
            if( item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'}
            }

            return (

                <li 
                    onClick={() => onCharSelected(item.id)}
                    className="char__item"
                    key={item.id}>
                    <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                    <div className="char__name">{item.name}</div>
                </li>
            )
        })

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems(charList)

    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading ? <Spinner/> : null
    const content = !(loading || error) ? items : null

    return (
        <div className="char__list">
            
            {errorMessage}
            {spinner}
            {content}

                <motion.button 
                    // initial={{}}
                    animate={{rotate: 360}}
                    transition={{
                        repeat: newItenLoading,
                    }}

                    onClick={() => onRequest(offset)}
                    disabled={newItenLoading}
                    className="button button__main button__long"
                    style={{'display' : charEnded ? 'none' : 'block' }}
                    >
                    <div className="inner">load more</div>
                </motion.button> 
            
        
        </div>
    )
}

export default CharList;