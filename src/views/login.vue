<template>
  <div class="page">
    <h4>
      Đăng nhập
      <i class="fas fa-sign-in-alt"></i>
    </h4>
    <Form @submit="handleLogin" :validation-schema="loginSchema">
      <div class="form-group">
        <label for="username">Tên đăng nhập</label>
        <Field
          name="username"
          type="text"
          class="form-control"
          v-model="user.username"
        />
        <ErrorMessage name="username" class="error-feedback" />
      </div>
      <div class="form-group">
        <label for="password">Mật khẩu</label>
        <Field
          name="password"
          type="password"
          class="form-control"
          v-model="user.password"
        />
        <ErrorMessage name="password" class="error-feedback" />
      </div>
      <div class="form-group mt-3">
        <button class="btn btn-primary btn-block" :disabled="loading">
          <span v-show="loading" class="spinner-border spinner-border-sm"></span>
          Đăng nhập
        </button>
      </div>
      <div class="form-group">
        <div v-if="message" class="alert alert-danger mt-2" role="alert">
          {{ message }}
        </div>
      </div>
    </Form>

    <p class="mt-3">
      Chưa có tài khoản?
      <router-link :to="{ name: 'register' }">Đăng ký ngay</router-link>
    </p>
  </div>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import AuthService from "@/services/auth.service";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const loginSchema = yup.object().shape({
      username: yup.string().required("Tên đăng nhập không được để trống."),
      password: yup.string().required("Mật khẩu không được để trống."),
    });
    return {
      user: {
        username: "",
        password: "",
      },
      loading: false,
      message: "",
      loginSchema,
    };
  },
  methods: {
    async handleLogin() {
      this.loading = true;
      this.message = "";
      try {
        await AuthService.login(this.user);
        this.$router.push({ name: "contactbook" });
      } catch (error) {
        this.loading = false;
        this.message =
          error.response?.data?.message ||
          "Đăng nhập thất bại. Vui lòng kiểm tra lại tài khoản.";
      }
    },
  },
};
</script>

<style scoped>
.page {
  max-width: 400px;
  margin: auto;
}
.error-feedback {
  color: red;
  font-size: 0.9em;
}
</style>