<template>
  <div>
    <!--    <div>{{ WORDS[0].learning_word }}</div>-->
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
    ...mapActions(["LOGOUT", "GET_ALL_WORDS_OF_USER"]),
  },
  async mounted() {
    await this.GET_ALL_WORDS_OF_USER;
  },
  methods: {},
};
</script>

<style></style>
