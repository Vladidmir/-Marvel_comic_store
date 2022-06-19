import { Routes, Route, } from "react-router-dom";

//components
import Layout from "../pages/Loyout";
import MainPage from "../pages/MainPage";
import ComicsPage from "../pages/ComicsPage";
import Page404 from "../pages/404";

const App = () => {
    return (
        <div className="app">
            <Routes>
                <Route path="/" element={<Layout/>} >
                    <Route index element={<MainPage/>}/>
                    <Route path="comics" element={<ComicsPage/>} />
                    <Route path="*" element={<Page404/>} />
                </Route> 
            </Routes>
   
        </div>
    )
}

export default App;