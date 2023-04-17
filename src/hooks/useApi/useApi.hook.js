import { useState, useEffect } from "react";

export const useApi = (apiFunc, initialState) => {
    const [data, setData] = useState(initialState);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                let res = await apiFunc();
                res = await res.json();
                setData(res.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [apiFunc]);

    return { data, loading, error };
};
