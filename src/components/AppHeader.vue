<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <a href="/" class="navbar-brand">Ứng dụng Quản lý danh bạ</a>
    <div class="mr-auto navbar-nav">
      <li class="nav-item">
        <router-link :to="{ name: 'contactbook' }" class="nav-link">
          Danh bạ
          <i class="fas fa-address-book"></i>
        </router-link>
      </li>
    </div>
    <div class="navbar-nav ml-auto">
      <li class="nav-item" v-if="!currentUser">
        <router-link :to="{ name: 'login' }" class="nav-link">
          Đăng nhập
          <i class="fas fa-sign-in-alt"></i>
        </router-link>
      </li>
      <li class="nav-item" v-else>
        <a href="#" class="nav-link" @click.prevent="logout">
          Đăng xuất ({{ currentUser.username }})
          <i class="fas fa-sign-out-alt"></i>
        </a>
      </li>
    </div>
  </nav>
</template>

<script>
import AuthService from "@/services/auth.service";

export default {
  computed: {
    currentUser() {
      return AuthService.getCurrentUser();
    },
  },
  methods: {
    logout() {
      AuthService.logout();
      this.$router.push({ name: "login" }).then(() => {
        // reload để cập nhật lại trạng thái currentUser trên header
        this.$router.go(0);
      });
    },
  },
};
</script>