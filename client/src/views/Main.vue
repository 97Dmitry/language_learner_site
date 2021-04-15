<template>
  <div>
    <button v-on:click.prevent="logout">LOGOUT</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Home",
  data() {
    return {};
  },
  components: {},
  methods: {
    ...mapActions(["LOGOUT"]),
    async logout() {
      await this.LOGOUT();
      this.$router.push({
        name: "Authorization",
        query: { message: "logout" },
      });
    },
  },
};
</script>

<style></style>
