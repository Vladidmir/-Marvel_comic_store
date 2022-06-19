import './comicsList.scss';
import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';
import {useState, useEffect } from 'react';

//Services
import MarvelService from '../../services/MarvelService';

//Components
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage'

const ComicsList = () => {

    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setnewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [comicsEnded, setComicsEnded] = useState(false);

    const {getAllComics, loading, error} = MarvelService();

    useEffect(() => {
        onRequest(offset, true)
    }, [])

    const onRequest = (offset, initial) => {

        initial ? setnewItemLoading(false) : setnewItemLoading(true)
        getAllComics(offset)
            .then(onComicsListLoaded)
    }

    const onComicsListLoaded = (newComicsList) => {

        let ended = false
        if (newComicsList.length < 8) {
            ended = true
        }

        setComicsEnded([...comicsList, ...newComicsList])
        setnewItemLoading(false)
        setOffset(offset => offset + 8)
        setComicsEnded(ended)

    }

    function renderItems(arr) {

        const items = arr.map((item, i) => {

            return (

                <li 
                    className="comics__item"
                    key={i}
                    >

                    <a href="#">
                        <img src={item.thumbnail} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </a>
                </li>
    
            )

        })

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems(comicsList)
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;

    return (
        <div className="comics__list">

            {items}
            {errorMessage}
            {spinner}
            
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}


export default ComicsList;