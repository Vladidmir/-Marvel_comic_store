import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

//Services
import MarvelService from '../../services/MarvelService';


//Components
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage'
import './charList.scss';



const CharList = ({onCharSelected}) => {



    const [charList, setCharlist] = useState([])
    const [newItenLoading, setNewItenLoading] = useState(true)
    const [offset, setOffset] = useState(0)
    const [charEnded, setCharEnded] = useState(false)


    const {getAllCharacters, loading, error} = MarvelService()


    useEffect(() => {
        onRequest(offset, true)

    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItenLoading(false) : setNewItenLoading(true)
        getAllCharacters(offset)
            .then(onCharListLoaded)
    }

    const onCharListLoaded = (newCharList) => {

        let ended = false

        if (newCharList.lenght < 9) {
            ended = true
        }

        setCharlist((oldCharlist) => [...oldCharlist, ...newCharList])
        setNewItenLoading(false)
        setOffset(offset => offset + 9)
        setCharEnded(ended)
    }

    const [animateHero, setaAimateHero] = useState('')
    const onselectHero = (key) => {
        setaAimateHero(key)
    }

    function renderItems(arr) {

        const animation = (i) => {
            return animateHero === i
        }
        const liVariants = {
            visible: i => ({
                opacity: 1,
                boxShadow:  animation(i) ?  '-2px 10px 20px -1px rgba(156,28,28,1)' : '',
                translateY :   animation(i) ? -10 : 0,
                scale: animation(i) ? 1.1 : 1
                transition: {
                    duration: animation(i) ?  0.1 : 1,
                },

            }),
            hidden: {
                opacity: 0,
                boxShadow: 'none',
                translateY : 0,
            }
        }

        const items = arr.map((item, i) => {
            let imgStyle = {'objectFit' : 'cover'}
            if( item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'}
            }

            return (

                <motion.li
                    onClick={() => {
                        onCharSelected(item.id)
                        onselectHero(i)
                    }}
                    variants={liVariants}
                    initial='hidden'
                    animate='visible'
                    custom={i}
                    className="char__item"
                    key={item.id}>
                    <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                    <div className="char__name">{item.name}</div>
                </motion.li>
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
    const spinner = loading && !newItenLoading ? <Spinner/> : null


    return (
        <div className="char__list">
            
            {errorMessage}
            {spinner}
            {items}

                <motion.button 
                    onClick={() => onRequest(offset)}
                    disabled={newItenLoading }
                    className="button button__main button__long"
                    style={{'display' : charEnded ? 'none' : 'block' }}
                    >
                    <div className="inner">load more</div>
                </motion.button> 
            
        
        </div>
    )
}

export default CharList;