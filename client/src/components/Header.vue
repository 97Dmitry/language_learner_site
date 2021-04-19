<template>
  <div class="header orange">
    <div class="container_header">
      <div class="header__logo">LL</div>
      <div class="header__nav">
        <button v-on:click.prevent="logout">Logout</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
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
