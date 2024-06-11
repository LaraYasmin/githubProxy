import api from "./utils/api";

const getUsers = async (token) => {
    try {
        const response = await api.get('/api/users', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.users;
    } catch (error) {
        console.error('Error fetching users', error);
        throw error;
    }
};

export { getUsers };

const getUserDetails = async (token, username) => {
    try {
        const response = await api.get(`/api/users/${username}/details`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user details', error);
        throw error;
    }
};

export { getUserDetails };

const getUserRepos = async (token, username) => {
    try {
        const response = await api.get(`/api/users/${username}/repos`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user repos', error);
        throw error;
    }
};

export { getUserRepos };