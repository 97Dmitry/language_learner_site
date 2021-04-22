<template>
  <div class="expansionWordsList">
    <div class="col s12">
      Input word that you want to add:
      <div class="input-field inline">
        <input id="email_inline" type="email" class="validate" />
        <label for="email_inline">Word</label>
        <small class="helper-text invalid"></small>
      </div>
    </div>
    <div style="">
      <div class="example_table_verb">
        <button
          style="width: 20px; height: 20px; margin-right: 20px"
          v-on:click="addVerbLine"
        >
          +
        </button>
        <div class="input-field inline">
          <input id="verb_inline" type="email" class="validate" />
          <label for="verb_inline">Verb</label>
          <small class="helper-text invalid"></small>
        </div>
      </div>

      <div class="example_table_noun">
        <button
          style="width: 20px; height: 20px; margin-right: 20px"
          v-on:click="addNounLine"
        >
          +
        </button>
        <div class="input-field inline">
          <input id="noun_inline" type="email" class="validate" />
          <label for="noun_inline">Noun</label>
          <small class="helper-text invalid"></small>
        </div>
      </div>

      <div class="example_table_general">
        <button
          style="width: 20px; height: 20px; margin-right: 20px"
          v-on:click="addGeneralLine"
        >
          +
        </button>
        <div class="input-field inline">
          <input id="general_inline" type="email" class="validate" />
          <label for="general_inline">General</label>
          <small class="helper-text invalid"></small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ExpansionWordsList",
  data() {
    return {
      verbLine: 0,
      nounLine: 0,
      generalLine: 0,
    };
  },
  methods: {
    addVerbLine() {
      if (this.verbLine < 3) {
        document
          .getElementsByClassName("example_table_verb")[0]
          .insertAdjacentHTML(
            "afterend",
            `<div class="input-field inline">
          <input id="verb_inline${this.verbLine}" type="text" className="validate" />
          <label htmlFor="email_inline">${this.verbLine}</label>
        </div>`
          );
        this.verbLine += 1;
      }
    },
    addNounLine() {
      if (this.nounLine < 3) {
        document
          .getElementsByClassName("example_table_noun")[0]
          .insertAdjacentHTML(
            "afterend",
            `<div class="input-field inline">
          <input id="noun_inline${this.nounLine}" type="text" className="validate" />
          <label htmlFor="email_inline">${this.nounLine}</label>
        </div>`
          );
        this.nounLine += 1;
      }
    },
    addGeneralLine() {
      if (this.generalLine < 3) {
        document
          .getElementsByClassName("example_table_general")[0]
          .insertAdjacentHTML(
            "afterend",
            `<div class="input-field inline">
          <input id="general_inline${this.generalLine}" type="text" className="validate" />
          <label htmlFor="email_inline">${this.generalLine}</label>
        </div>`
          );
        this.generalLine += 1;
      }
    },
  },
};
</script>

<style scoped></style>
