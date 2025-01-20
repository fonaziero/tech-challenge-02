const apiUrl = import.meta.env.VITE_API_URL;

export const handleRequest = async (endpoint: string, options?: {method: 'GET' | 'POST' | 'PUT' | 'DELETE', headers?: any, body?: any}) => {
    const response = await fetch(`${apiUrl}/${endpoint}`, options);
    return response;
};
