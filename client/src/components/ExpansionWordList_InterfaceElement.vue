<template>
  <div style="display: flex">
    <div class="example_table_verb" style="display: flex; margin-right: 40px">
      <button
        style="width: 120px; height: 45px; margin-right: 20px"
        v-on:click.prevent="addVerbLine"
      >
        Add new line for verb
      </button>
      <div>
        <ul id="verb_table">
          <li>
            <div class="input-field inline">
              <input id="verb_inline" type="text" class="validate" />
              <label for="verb_inline">Verb</label>
              <small class="helper-text invalid"></small>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="example_table_noun" style="display: flex; margin-right: 40px">
      <button
        style="width: 120px; height: 45px; margin-right: 20px"
        v-on:click.prevent="addNounLine"
      >
        Add new line for noun
      </button>
      <div>
        <ul id="noun_table">
          <li>
            <div class="input-field inline">
              <input id="noun_inline" type="text" class="validate" />
              <label for="noun_inline">Noun</label>
              <small class="helper-text invalid"></small>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div
      class="example_table_general"
      style="display: flex; margin-right: 40px"
    >
      <button
        style="width: 120px; height: 45px; margin-right: 20px"
        v-on:click.prevent="addGeneralLine"
      >
        Add new line for general
      </button>
      <div>
        <ul id="general_table">
          <li>
            <div class="input-field inline">
              <input id="general_inline" type="text" class="validate" />
              <label for="general_inline">General</label>
              <small class="helper-text invalid"></small>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ExpansionWordList_InterfaceElement",
  data() {
    return {
      verbLine: 1,
      nounLine: 1,
      generalLine: 1,
    };
  },
  methods: {
    addVerbLine() {
      if (this.verbLine < 3) {
        document.getElementById("verb_table").insertAdjacentHTML(
          "afterend",
          `<li style="list-style-type: none"><div class="input-field inline">
          <input id="verb_inline_${this.verbLine}" type="text" class="validate" />
          <label for="verb_inline_${this.verbLine}">Another verb</label>
          <small class="helper-text invalid"></small>
        </div></li>`
        );
        this.verbLine += 1;
      }
    },
    addNounLine() {
      if (this.nounLine < 3) {
        document.getElementById("noun_table").insertAdjacentHTML(
          "afterend",
          `<li style="list-style-type: none"><div class="input-field inline">
          <input id="noun_inline_${this.nounLine}" type="text" class="validate" />
          <label for="noun_inline_${this.nounLine}">Another noun</label>
          <small class="helper-text invalid"></small>
        </div></li>`
        );
        this.nounLine += 1;
      }
    },
    addGeneralLine() {
      if (this.generalLine < 3) {
        document.getElementById("general_table").insertAdjacentHTML(
          "afterend",
          `<li style="list-style-type: none"><div class="input-field inline">
          <input id="general_inline${this.generalLine}" type="text" class="validate" />
          <label for="general_inline${this.generalLine}">Another general</label>
          <small class="helper-text invalid"></small>
        </div></li>`
        );
        this.generalLine += 1;
      }
    },
  },
};
</script>

<style scoped></style>
