import axios from "axios";

// Base URL for all API calls
const API_BASE_URL ="https://xeno-assignment-production.up.railway.app/api";//http://localhost:5000/api/dashboard



// Create an Axios instance with default configurations
export const api = axios.create({
    baseURL: "https://xeno-assignment-production.up.railway.app/api",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // Ensure cookies are sent with every request
});

// Dashboard API to fetch user details
export const getUserDetails = async () => {
    return api.get("/api/dashboard"); // Use the `api` instance to make the request
};

// Campaigns-related endpoints
export const getCampaigns = () => api.get("/campaigns");
export const getCampaignStats = (id) => api.get(`/campaigns/${id}/stats`);
export const createCampaign = (data) => api.post("/campaigns", data);

// Messages-related endpoints
export const sendMessages = (id) => api.post(`/messages/${id}/send`);
export const getMessageLogs = (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    return api.get(`/messages?${params}`);
};

export const calculateAudienceSize = (data) => {
    return api.post("/customers/audience/size", data);
};

// DELETE a campaign by ID
export const deleteCampaign = (id) => api.delete(`/campaigns/${id}`);


export default api;
