//Services
import { useEffect, useState } from 'react';
import MarvelService from '../../services/MarvelService';


//Components
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage'
import './charList.scss';


//Resources
import abyss from '../../resources/img/abyss.jpg';



const CharList = () => {

    const [charList, setCharlist] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const {getCharacter} = MarvelService()

    useEffect(() => {
        getCharacter()
            .then(onCharListLoaded)
            .catch(onError)
    }, [])

    const onCharListLoaded = (charList) => {
        setCharlist(charList)
        setLoading(false)
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

    const items = this.renderItems(charList)
    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading ? <Spinner/> : null
    const content = !(loading || error) ? items : null

    return (
        <div className="char__list">

            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default CharList;