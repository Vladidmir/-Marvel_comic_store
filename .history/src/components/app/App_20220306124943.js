import { Routes, Route, } from "react-router-dom";

//components
import Layout from "../pages/Loyout";
import MainPage from "../pages/MainPage";
import ComicsPage from "../pages/ComicsPage";



const App = () => {

    return (
        <div className="app">
            <Routes path='/' element={<Layout/>} >
                <Route index element={<MainPage/>}/>
                <Route path="comics" element={<ComicsPage/>} />
            </Routes> 
        </div>
    )
}

export default App;