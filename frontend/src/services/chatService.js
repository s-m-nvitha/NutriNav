import api from "./api";

export const chatService = {
  async sendMessage(message) {
    const response = await api.post("/chat/", {
      message,
    });

    return response.data;
  },

  async getHistory() {
    const response = await api.get("/chat/history");
    return response.data;
  },
};