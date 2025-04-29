import { useState } from 'react'

const useToken = () => {

    const[token, setTokenInternal] = useState(() => {
        return localStorage.getItem('token') || null;        
    });

    const setToken = newToken =>
    {
        localStorage.setItem('token', newToken);
        setTokenInternal(newToken);
    }

    return [token, setToken];
}

export default useToken
