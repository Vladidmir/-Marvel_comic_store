import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

//Components
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './singleComicPage.scss';


//Servies
import MarvelService from '../../services/MarvelService';

import xMen from '../../resources/img/x-men.png';

const SingleComicPage = () => {

    const [comic, setComic] = useState(null)

    const {comicID} = useParams()

    const {getComic, loading, error, clearError} = MarvelService()

    useEffect(() => {
        updateComic()
    },[comicID])


    const updateComic = () => {
      
        getComic(comicID)
            .then(onComicLoaded)
    }

    const onComicLoaded = (selectedComicInfo) => {
        setComic(selectedComicInfo)
    }

    return (
        <>
        
        </>
       
    )
}

const View = ({comic}) => {
    const {title, description, pageCount, thumbnail, language, price } = comic
    return ( 

        <div className="single-comic">
            <img src={thumbnail} alt="x-men" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">{language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to='' className="single-comic__back">Back to all</Link>
        </div>

    )

}

export default SingleComicPage;