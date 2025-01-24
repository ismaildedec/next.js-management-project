import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/integrity/';

export const fetchBackups = async () => {
    const response = await axios.get(`${API_BASE_URL}api/indices/`);
    return response.data;
};

export const checkBackup = async (id) => {
    const response = await axios.post(`${API_BASE_URL}api/integrity/check/`, { backup_id: id });
    return response.data;
};

export const updateFrequency = async (data) => {
    const response = await axios.post(`${API_BASE_URL}api/integrity/check/`, data);
    return response.data;
};

// utils/notify.js
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const notify = (message, type = 'info') => {
    toast(message, {
        type,
        position: 'bottom-left',
        autoClose: 3000,                            
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
    });
};

// import axios from 'axios';

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/integrity/';

// export const fetchBackups = async () => {
//     const response = await axios.get(`${API_BASE_URL}api/indices/`);
//     return response.data;
// };

// export const checkBackup = async (id) => {
//     try {
//         const response = await axios.post(`${API_BASE_URL}api/integrity/check/`, { backup_id: id });
//         const { health } = response.data;

//         if (health) {
//             return { message: 'Backup integrity is intact.', status: 'success' };
//         } else {
//             return { message: 'Backup integrity check failed.', status: 'error' };
//         }
//     } catch (error) {
//         return { message: 'Error during backup check.', status: 'error' };
//     }
// };

// export const updateFrequency = async (data) => {
//     const response = await axios.post(`${API_BASE_URL}api/integrity/frequency/`, data);
//     return response.data;
// };