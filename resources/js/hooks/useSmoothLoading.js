import { useEffect, useState } from "react";

export function useSmoothLoading(isFetching, minDuration = 300) {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let timeout;

        if (isFetching) {
            setLoading(true);
        } else {
            // mantém carregando por minDuration antes de sumir
            timeout = setTimeout(() => setLoading(false), minDuration);
        }

        return () => clearTimeout(timeout);
    }, [isFetching, minDuration]);

    return loading;
}
