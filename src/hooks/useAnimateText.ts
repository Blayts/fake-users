import { useLayoutEffect, useState } from 'react';

export function useAnimateText(text: string, ms: number, completeCallback?: Function) {
    const [value, setValue] = useState('');

    useLayoutEffect(() => {
        const id = setInterval(() => {
            setValue((prev) => {
                const value = text.slice(0, prev.length + 1);
                if(value.length >= text.length) {                    
                    clearInterval(id);
                    
                    if(typeof(completeCallback) === 'function') {
                        setTimeout(completeCallback, ms);
                    }
                }
                return value;
            })

        }, ms);
        return () => clearInterval(id);
    }, []);
    
    return value;
}