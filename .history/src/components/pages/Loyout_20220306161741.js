import { Outlet, NavLink } from "react-router-dom"
import './loayout.scss'
const Layout = () => {

    

    return (
        <>
            <header className="app__header">
                <h1 className="app__title">
                    <NavLink
                        style={({isActive}) => ({color: isActive ? 'red' : null})}
                        to='/'>
                        <span>Marvel</span> information portal
                    </NavLink>

                </h1>
                <nav className="app__menu">
                    <ul>
                        <li><NavLink style={({isActive}) => ({color: isActive ? '#9F0013' : null})} to='Characters'>Characters</NavLink></li>
                        /
                        <li><NavLink  style={({isActive}) => ({color: isActive ? '#9F0013' : null})} to='Comics'>Comics</NavLink></li>
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