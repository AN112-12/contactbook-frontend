import createApiClient from "./api.service";

class ChatService {
  constructor(baseUrl = "/api/messages") {
    this.api = createApiClient(baseUrl);
  }

  async getMessages() {
    return (await this.api.get("/")).data;
  }

  async sendMessage(data) {
    return (await this.api.post("/", data)).data;
  }
}

export default new ChatService();