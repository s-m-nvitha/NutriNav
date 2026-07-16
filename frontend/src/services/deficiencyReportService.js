import api from './api';

export const deficiencyReportService = {

  getAll: async () => {
    const response = await api.get('/deficiency-reports/');
    return response.data;
  },


  getRecommendations: async () => {
    const response = await api.get(
      '/deficiency-reports/recommendations'
    );

    return response.data;
  },

};