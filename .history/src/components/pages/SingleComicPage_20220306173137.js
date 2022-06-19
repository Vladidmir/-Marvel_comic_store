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
            .then(onCharLoaded)
    }

    const onCharLoaded = (selectedComicInfo) => {
        setComic(selectedComicInfo)
    }

    return (
        <div className="single-comic">
            <img src={xMen} alt="x-men" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">X-Men: Days of Future Past</h2>
                <p className="single-comic__descr">Re-live the legendary first journey into the dystopian future of 2013 - where Sentinels stalk the Earth, and the X-Men are humanity's only hope...until they die! Also featuring the first appearance of Alpha Flight, the return of the Wendigo, the history of the X-Men from Cyclops himself...and a demon for Christmas!?</p>
                <p className="single-comic__descr">144 pages</p>
                <p className="single-comic__descr">Language: en-us</p>
                <div className="single-comic__price">9.99$</div>
            </div>
            <Link to='' className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComicPage;