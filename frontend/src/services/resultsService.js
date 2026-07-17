import api from "./api";

export const resultsService = {
  async getRecommendations() {
    const response = await api.get(
      "/deficiency-reports/recommendations"
    );

    return response.data;
  }
};