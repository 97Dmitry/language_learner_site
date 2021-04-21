<template>
  <div class="expansionWordsList">
    <div class="row">
      <div class="col s12">
        Input word that you want to add:
        <div class="input-field inline">
          <input id="email_inline" type="email" class="validate" />
          <label for="email_inline">Word</label>
          <span
            class="helper-text"
            data-error="wrong"
            data-success="right"
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ExpansionWordsList",
  data() {
    return {};
  },
  methods: {
    add() {},
  },
};
</script>

<style scoped></style>
