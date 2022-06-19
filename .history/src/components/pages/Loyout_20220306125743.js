import { Outlet, NavLink } from "react-router-dom"
import './loayout.scss'
const Layout = () => {
    return (
        <>
            <header className="app__header">
                <h1 className="app__title">
                    <NavLink href="#">
                        <span>Marvel</span> information portal
                    </NavLink>

                </h1>
                <nav className="app__menu">
                    <ul>
                        <li><NavLink href="#">Characters</NavLink></li>
                        /
                        <li><NavLink to='Comics'>Comics</NavLink></li>
                    </ul>
                </nav>
            </header>

            <div>
                <Outlet/>
            </div>

        </>
    )

}
export default Layout