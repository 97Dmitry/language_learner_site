<template>
  <div>
    <button v-on:click.prevent="logout">LOGOUT</button>
    <p v-for="word in WORDS" :key="word.id">
      {{ word.learning_word }}
    </p>
    <div>fffgff</div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Home",
  data() {
    return {};
  },
  components: {},
  computed: {
    ...mapGetters(["WORDS"]),
    ...mapActions(["GET_ALL_WORDS_OF_USER"]),
  },
  async mounted() {
    await this.GET_ALL_WORDS_OF_USER;
  },
  methods: {
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
