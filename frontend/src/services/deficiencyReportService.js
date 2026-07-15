import api from './api';

export const deficiencyReportService = {
  getAll: async () => {
    const response = await api.get('/deficiency-reports/');
    return response.data;
  },
};