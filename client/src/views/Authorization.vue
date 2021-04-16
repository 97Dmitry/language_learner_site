<template>
  <div class="auth">
    <form class="card auth-card" v-on:submit.prevent="submitHandler()">
      <div class="card-content">
        <span class="auth-title">Words learning</span>
        <div class="input-field">
          <input id="username" type="text" v-model="username" />
          <label for="username">Username</label>
          <small
            class="helper-text invalid"
            v-for="(error, index) of v$.username.$errors"
            :key="index"
          >
            {{ printError(error.$validator, error.$params) }}</small
          >
        </div>
        <div class="input-field">
          <input id="password" type="password" v-model="user_password" />
          <label for="password">Password</label>
          <small
            class="helper-text invalid"
            v-for="(error, index) of v$.user_password.$errors"
            :key="index"
          >
            {{ printError(error.$validator, error.$params) }}</small
          >
        </div>
        <div>
          <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
          >
            Login
            <i class="material-icons right">send</i>
          </button>
        </div>

        <p class="center">
          Do you have no an account?
          <router-link to="/registration">Register now</router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import messages from "@/utils/messages";
import useVuelidate from "@vuelidate/core";
import { minLength, required } from "@vuelidate/validators";

export default {
  name: "Login",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      username: "",
      user_password: "",
    };
  },
  validations() {
    return {
      username: { required },
      user_password: { required, minLength: minLength(6) },
    };
  },
  computed: {
    ...mapGetters(["ERROR"]),
  },
  mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message]);
    }
  },
  methods: {
    ...mapActions(["LOGIN"]),
    async submitHandler() {
      this.v$.$touch();
      if (this.v$.$error) {
        return;
      }

      const formData = {
        username: this.username,
        user_password: this.user_password,
      };
      try {
        await this.AUTHORIZATION(formData);

        if (this.ERROR) {
          this.$error(this.ERROR);
        } else {
          this.$message("Success authorization");
          await this.$router.push({ name: "Main" });
        }
      } catch (e) {
        console.log(e);
      }
    },

    printError($name, $param) {
      if ($name === "required") {
        return "Field cannot be empty";
      } else if ($name === "minLength") {
        return "Minimal long must be " + $param.min + " symbol";
      }
    },
  },
};
</script>

<style scoped>
button {
  margin-top: 15px;
  margin-bottom: 25px;
}
</style>
