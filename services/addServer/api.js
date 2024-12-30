import axios from 'axios';
const API_BASE_URL = 'http://localhost:8080/manage/api';
export const serverService = {
    getAllServers: () =>
        axios.get(`${API_BASE_URL}/servers/`),
    getServerTypes: () =>
        axios.get(`${API_BASE_URL}/server-types/`),
    addServer: (serverData) =>
        axios.post(`${API_BASE_URL}/servers/`, serverData, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
};