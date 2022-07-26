import React from 'react';
import '../styles/NotFoundPage/notFoundPage.scss'
import { Link } from 'react-router-dom';
const PageNotFound = () => {
    return ( 
        <div className='Not-found'>
           <div className='contenedor'>
           <h1 className='text-error'>Error</h1>
           <h1 className='error-number'>404</h1>
           <h2 className='page'>Pagina no encontrada</h2>
          <button className='btn'><Link to="/">Regresar</Link></button>
           </div>
           
        </div>
    );
}

export default PageNotFound;
