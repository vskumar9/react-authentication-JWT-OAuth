import { useState, useEffect } from "react";
import useToken from "./useToken";

const useUser = () => {
    const [token] = useToken();
    const getPayloadFromToken = token => {
        const encodedPayload = token.split('.')[1];
        return JSON.parse(atob(encodedPayload));
    }

    const [user, setUser] = useState(() => {
        if (token) {
            const payload = getPayloadFromToken(token);
            return payload;
        }
        return null;
    });

    useEffect(() => {
        if(token) {
            setUser(getPayloadFromToken(token));
        }
        else {
            setUser(null);
        }
    }, [token]);

    return user;

}

export default useUser;