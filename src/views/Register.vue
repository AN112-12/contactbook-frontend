<template>
  <div class="page">
    <h4>
      Đăng ký tài khoản
      <i class="fas fa-user-plus"></i>
    </h4>
    <Form
      v-if="!successful"
      @submit="handleRegister"
      :validation-schema="registerSchema"
    >
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
      <div class="form-group">
        <label for="confirmPassword">Nhập lại mật khẩu</label>
        <Field
          name="confirmPassword"
          type="password"
          class="form-control"
          v-model="user.confirmPassword"
        />
        <ErrorMessage name="confirmPassword" class="error-feedback" />
      </div>
      <div class="form-group mt-3">
        <button class="btn btn-primary btn-block" :disabled="loading">
          <span v-show="loading" class="spinner-border spinner-border-sm"></span>
          Đăng ký
        </button>
      </div>
      <div class="form-group">
        <div v-if="message" class="alert alert-danger mt-2" role="alert">
          {{ message }}
        </div>
      </div>
    </Form>

    <div v-if="successful" class="alert alert-success mt-3">
      Đăng ký thành công! Đang chuyển đến trang đăng nhập...
    </div>

    <p class="mt-3">
      Đã có tài khoản?
      <router-link :to="{ name: 'login' }">Đăng nhập</router-link>
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
    const registerSchema = yup.object().shape({
      username: yup
        .string()
        .required("Tên đăng nhập không được để trống.")
        .min(3, "Tên đăng nhập phải ít nhất 3 ký tự.")
        .max(30, "Tên đăng nhập tối đa 30 ký tự."),
      password: yup
        .string()
        .required("Mật khẩu không được để trống.")
        .min(6, "Mật khẩu phải ít nhất 6 ký tự."),
      confirmPassword: yup
        .string()
        .required("Vui lòng nhập lại mật khẩu.")
        .oneOf([yup.ref("password")], "Mật khẩu nhập lại không khớp."),
    });
    return {
      user: {
        username: "",
        password: "",
        confirmPassword: "",
      },
      loading: false,
      message: "",
      successful: false,
      registerSchema,
    };
  },
  methods: {
    async handleRegister() {
      this.loading = true;
      this.message = "";
      this.successful = false;
      try {
        await AuthService.register({
          username: this.user.username,
          password: this.user.password,
        });
        this.successful = true;
        setTimeout(() => {
          this.$router.push({ name: "login" });
        }, 1500);
      } catch (error) {
        this.successful = false;
        this.message =
          error.response?.data?.message ||
          "Đăng ký thất bại. Vui lòng thử lại.";
      } finally {
        this.loading = false;
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