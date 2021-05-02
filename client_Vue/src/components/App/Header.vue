<template>
  <header class="header">
    <div class="header-container">
      <div class="header-logo">LL</div>
      <div class="header-nav">
        <router-link class="header-nav__link link" to="/"> Home </router-link>
        <router-link class="header-nav__link link" to="/practice">
          Practice
        </router-link>
        <router-link class="header-nav__link link" to="/all_words">
          All my study words
        </router-link>
        <router-link class="header-nav__link link" to="/expansion">
          Add new word
        </router-link>
      </div>
      <div class="header-auth">
        <div class="header-auth__account">
          Your account <a href="">{{ username }}</a>
        </div>
        <div class="header-auth__logout">
          <span v-on:click.prevent="logout">Logout</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      username: localStorage.username,
    };
  },
  methods: {
    async logout() {
      await this.LOGOUT;
      this.$router.push({
        name: "Authorization",
        query: { message: "logout" },
      });
    },
  },
};
</script>

<style scoped></style>
