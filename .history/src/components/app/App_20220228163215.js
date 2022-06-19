



//components
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import decoration from '../../resources/img/vision.png';


import MarvelService from "../../services/MarvelService";
import { useEffect } from "react";


const App = () => {

    const {getAllCharacters} = MarvelService()
    useEffect(() => {
        getAllCharacters().then(res => console.log(res.data.results))
    })
    return (
        <div className="app">
            <AppHeader/>
            <main>
                <RandomChar/>
                <div className="char__content">
                    <CharList/>
                    <CharInfo/>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>
        </div>
    )
}

export default App;