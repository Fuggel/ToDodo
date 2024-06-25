import { useState, useEffect } from "react";


export const useLocalStorage = <T>(key: string, fallbackState: T) => {
    const [value, setValue] = useState(JSON.parse(localStorage.getItem(key)!) ?? fallbackState);

    useEffect(() => {
        if (value == null) {
            setValue(fallbackState);
            return;
        }

        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key, fallbackState]);

    return [value, setValue];
};