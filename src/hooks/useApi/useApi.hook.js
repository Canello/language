import { useState } from "react";

export const useApi = (service, initialData = null) => {
    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async (...args) => {
        try {
            const resData = await service(...args);
            setData(resData);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return [fetchData, data, loading, error];
};
