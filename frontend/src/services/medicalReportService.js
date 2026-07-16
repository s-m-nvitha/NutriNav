import api from './api';

export const medicalReportService = {

  upload: async (file) => {

    const formData = new FormData();

    formData.append(
      'file',
      file
    );


    const response = await api.post(
      '/medical-reports/upload',
      formData
    );


    return response.data;
  },


  getAll: async () => {

    const response = await api.get(
      '/medical-reports/'
    );

    return response.data;
  },

};