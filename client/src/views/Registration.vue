<template>
  <div class="auth">
    <form
      class="card auth-card col s12 m2"
      v-on:submit.prevent="submitHandler()"
    >
      <div class="card-content">
        <span class="auth-title">Registration</span>
        <div class="input-field">
          <input
            id="username"
            type="text"
            v-model.trim="username"
            :class="{ invalid: v$.username.$error }"
          />
          <label for="username">Имя аккаунта</label>
          <small
            class="helper-text invalid"
            v-for="(error, index) of v$.username.$errors"
            :key="index"
          >
            {{ printError(error.$validator, error.$params) }}
          </small>
        </div>
        <div class="input-field">
          <input
            id="email"
            type="email"
            v-model.trim="user_email"
            :class="{ invalid: v$.user_email.$error }"
          />
          <label for="email">Электронная почта</label>
          <small
            class="helper-text invalid"
            v-for="(error, index) of v$.user_email.$errors"
            :key="index"
          >
            {{ printError(error.$validator, error.$params) }}
          </small>
        </div>
        <div class="input-field">
          <input
            id="password"
            type="password"
            v-model.trim="user_password"
            :class="{ invalid: v$.user_password.$error }"
          />
          <label for="password">Пароль</label>
          <small
            class="helper-text invalid"
            v-for="(error, index) of v$.user_password.$errors"
            :key="index"
          >
            {{ printError(error.$validator, error.$params) }}
          </small>
        </div>
        <div class="input-field">
          <input
            id="passwordConfirmation"
            type="password"
            v-model.trim="passwordConfirmation"
            :class="{ invalid: v$.passwordConfirmation.$error }"
          />
          <label for="passwordConfirmation">Пароль</label>
          <small
            class="helper-text invalid"
            v-for="(error, index) of v$.passwordConfirmation.$errors"
            :key="index"
          >
            {{ printError(error.$validator, error.$params) }}
          </small>
        </div>
        <div>
          <p>
            <label>
              <input
                type="checkbox"
                v-on:click="agree = !agree"
                v-model="agree"
              />
              <span>С правилами согласен</span>
            </label>
          </p>
        </div>
        <div class="d-grid gap-2">
          <div>
            <button
              class="btn waves-effect waves-light auth-submit"
              type="submit"
            >
              Зарегистрироваться
              <i class="material-icons right">send</i>
            </button>
          </div>
        </div>
        <p class="text-center" style="color: #0f0f0f; margin-top: 5px">
          Уже есть аккаунт?
          <router-link to="/authorization">Войти!</router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import useVuelidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";

export default {
  name: "Registration",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      user_email: "",
      user_password: "",
      passwordConfirmation: "",
      username: "",
      agree: false,
    };
  },
  validations() {
    return {
      user_email: { required, email },
      user_password: { required, minLength: minLength(6) },
      passwordConfirmation: { required, minLength: minLength(6) },
      username: { required, minLength: minLength(4) },
      agree: { checked: (v) => v },
    };
  },
  computed: {
    ...mapGetters(["ERROR"]),
  },
  methods: {
    ...mapActions(["REGISTRATION"]),
    async submitHandler() {
      this.v$.$touch();
      if (this.v$.$error) {
        return;
      } else if (this.user_password !== this.passwordConfirmation) {
        this.$error("Passwords must coincidence");
        return;
      }
      const formData = {
        username: this.username,
        user_password: this.user_password,
        user_email: this.user_email,
      };
      try {
        await this.REGISTRATION(formData);

        if (this.ERROR) {
          this.$error(this.ERROR);
        } else {
          this.$message("Success authorization");
          this.user_email = "";
          this.user_password = "";
          this.passwordConfirmation = "";
          this.username = "";
          this.agree = false;
        }
      } catch (e) {
        console.log(e);
      }
      // this.$router.push({ name: "Home" });
    },

    printError($name, $param) {
      if ($name === "required") {
        return "Field cannot be empty";
      } else if ($name === "user_email") {
        return "Input correct email";
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
