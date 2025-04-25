import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/',
    timeout: 10000,
});


// // Request Interceptor
// apiClient.interceptors.request.use(
//     (config) => {
//         const jwtToken = localStorage.getItem('jwtToken');
//         if(jwtToken){
//             config.headers.Authorization = `Bearer ${jwtToken}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }   
// );


// // Response interceptor
// apiClient.interceptors.response.use(
//     (response) => {
//         response
//     },
//     (error) => {
//         // Handle errors globally
//         if (error.response && error.response.status === 401) {
//             // Handle unauthorized access (e.g., redirect to login)
//             console.error('Unauthorized access - redirecting to login');
//         }
//         return Promise.reject(error);
//     }
// );




export default apiClient;