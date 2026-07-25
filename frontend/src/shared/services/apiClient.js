import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
    withCredentials: true, // required to send/receive the httpOnly auth cookie
    headers: {
        'Content-Type': 'application/json',
    },
});

// Normalize errors into a consistent shape: { statusCode, message }
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const statusCode = error.response?.status || 500;
        const message =
            error.response?.data?.message || error.message || 'Something went wrong';

        return Promise.reject({ statusCode, message });
    }
);

export default apiClient;