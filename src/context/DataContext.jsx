import { createContext, useState, useEffect } from 'react';
import useAxiosFetch from '../hooks/useAxiosFetch';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
   
    const [search, setSearch] = useState('');

    

    return (
        <DataContext.Provider value={{
            search, setSearch,
   
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;