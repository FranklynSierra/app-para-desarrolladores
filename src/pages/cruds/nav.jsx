import { Link } from 'react-router-dom';
import React,{useContext} from 'react';
import DataContext from '../../context/DataContext';

const Nav = () => {
    const {search,setSearch}=useContext(DataContext)
    return (
        <nav className="Nav">
            <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="search">Search Posts</label>
                <input
                    id="search"
                    type="text"
                    placeholder="Buscar publicacion"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>
         
        </nav>
    )
}
export default Nav;
