import api from "./api";

export const progressService = {

  async getProgress() {

    const response = await api.get("/progress/");

    return response.data;

  }

};