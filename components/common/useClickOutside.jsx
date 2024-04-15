import { useState, useEffect, useRef } from 'react';

export default function useComponentVisible(initialIsVisible) {
    const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
    const ref = useRef(null);

    const handleClickOutside = (event) => {
        // console.log('ref.current: ', ref?.current);
        if (ref.current && !ref.current.contains(event.target)) {
            setIsComponentVisible(false);
        } else if (ref.current && ref.current.contains(event.target)) {
            // console.log('same');
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    // useEffect(() => console.log('isComponentVisible: ', isComponentVisible), [isComponentVisible])

    return { ref, isComponentVisible, setIsComponentVisible };
}