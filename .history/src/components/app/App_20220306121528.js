import { useState } from "react";

//components
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import decoration from '../../resources/img/vision.png';
import ErrorBoundary from  '../errorBoundary/ErrorBoundary'
import ComicsList from "../comicsList/ComicsList";



const App = () => {

  

    return (
        <div className="app">
            <AppHeader/>

        </div>
    )
}

export default App;