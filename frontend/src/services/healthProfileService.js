import api from './api';

export const healthProfileService = {
  create: async (profileData) => {
    const response = await api.post('/health-profile/', profileData);
    return response.data;
  },

  get: async () => {
    const response = await api.get('/health-profile/');
    return response.data;
  },

  update: async (profileData) => {
    const response = await api.put('/health-profile/', profileData);
    return response.data;
  },
};
