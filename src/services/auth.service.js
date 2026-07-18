import createApiClient from "./api.service";

class AuthService {
  constructor(baseUrl = "/api/auth") {
    this.api = createApiClient(baseUrl);
  }

  async login(credentials) {
    const response = await this.api.post("/login", credentials);
    if (response.data?.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  }

  async register(data) {
    return (await this.api.post("/register", data)).data;
  }

  logout() {
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn() {
    return !!this.getCurrentUser();
  }
}

export default new AuthService();