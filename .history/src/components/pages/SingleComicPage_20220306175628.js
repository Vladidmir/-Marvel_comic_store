import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

//Components
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './singleComicPage.scss';


//Servies
import MarvelService from '../../services/MarvelService';


const SingleComicPage = () => {

    const [comicInfo, setComicInfo] = useState(null)

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
        setComicInfo(selectedComicInfo)
    }

    
    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading ? <Spinner/> : null
    const content = !(loading || error || !comicID ) ? <View comicInfo={comicInfo}/> : null

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({comicInfo}) => {
    const {title, description, pageCount, thumbnail, language, price} = comicInfo;
   console.log(comicInfo)
    return ( 

        <div className="single-comic">
            <img src=''alt="x-men" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to='/comics' className="single-comic__back">Back to all</Link>
        </div>

    )

}

export default SingleComicPage;