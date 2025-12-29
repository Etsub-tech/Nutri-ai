import axios from "axios";

const API = axios.create({
    baseURL: "https://nutri-ai-g0s0.onrender.com",
});

export default API;