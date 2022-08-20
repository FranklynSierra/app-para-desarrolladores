

import Feed from './Feed';
import React,{useContext} from 'react';
import DataContext from '../../context/DataContext';
import Nav from './nav';

const Crud = () => {
    const {searchResults,fetchError,isLoading}=useContext(DataContext)
    return (

      <>
      <Nav/>
        <main className="Home">
           {isLoading&&<p className='statusMsg'>cargando las publicaciones...</p>}
            {!isLoading&& fetchError&&<p className='statusMsg'>{fetchError}</p>}
            {!isLoading&&!fetchError&&(searchResults.length?<Feed posts={searchResults}/>:<p className='statusMsg'>No hay publicaciones por el momento</p>)}
        </main>
    </>    
    )
}
export default Crud;
