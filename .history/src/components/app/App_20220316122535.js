import { Routes, Route,  } from "react-router-dom";

//components
import Layout from "../pages/Loyout";
import MainPage from "../pages/MainPage";
import ComicsPage from "../pages/ComicsPage";
import SinglePage from "../pages/SinglePage";
import SingleComicLayout from "../pages/singleComicLayout/SingleComicLayout";
import SingleCharacterLayout from '../pages/singleCharacterLayout/SingleCharacterLayout'
// import SingleComicPage from "../pages/SingleComicPage";
import Page404 from "../pages/404";

const App = () => {
    return (
        <div className="app">
            <Routes>
                <Route path="/" element={<Layout/>} >
                    <Route index element={<MainPage/>}/>
                    <Route path="comics" element={<ComicsPage/>} />
                    <Route path="comics/:id" element={<SinglePage dataType='comic' Component={SingleComicLayout} />}/>
                    <Route path="/characters/:id" element={<SinglePage dataType='character' Component={SingleCharacterLayout}/>} />
                    <Route path="*" element={<Page404/>} />
                </Route> 
            </Routes>
   
        </div>
    )
}

export default App;