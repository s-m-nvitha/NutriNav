import api from "./api";

export const chatService = {
  async sendMessage(message) {
    const response = await api.post("/chat/", {
      message,
    });

    return response.data;
  },
};