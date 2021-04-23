<template>
  <form>
    <div class="col s12">
      Input word that you want to add:
      <div class="input-field inline">
        <input
          id="learning_word"
          type="text"
          class="validate"
          v-model="learning_word"
        />
        <label for="learning_word">Word</label>
        <small class="helper-text invalid"></small>
      </div>
    </div>
    <div style="display: flex">
      <div class="example_table_verb" style="display: flex; margin-right: 40px">
        <div style="display: flex; flex-direction: column">
          <button
            style="
              width: 120px;
              height: 45px;
              margin-right: 20px;
              margin-bottom: 10px;
            "
            v-on:click.prevent="addVerbLine"
          >
            Add new line for verb
          </button>
          <button
            style="width: 120px; height: 45px; margin-right: 20px"
            v-on:click.prevent="deleteVerbLine"
          >
            Delete line
          </button>
        </div>
        <div>
          <ul id="verb_table">
            <li>
              <div class="input-field inline">
                <input id="verb_0" type="text" class="validate verb_input" />
                <label for="verb_0">Verb</label>
                <small class="helper-text invalid"></small>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="example_table_noun" style="display: flex; margin-right: 40px">
        <div style="display: flex; flex-direction: column">
          <button
            style="
              width: 120px;
              height: 45px;
              margin-right: 20px;
              margin-bottom: 10px;
            "
            v-on:click.prevent="addNounLine"
          >
            Add new line for verb
          </button>
          <button
            style="width: 120px; height: 45px; margin-right: 20px"
            v-on:click.prevent="deleteNounLine"
          >
            Delete line
          </button>
        </div>
        <div>
          <ul id="noun_table">
            <li>
              <div class="input-field inline">
                <input id="noun_0" type="text" class="validate noun_input" />
                <label for="noun_0">Noun</label>
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
        <div style="display: flex; flex-direction: column">
          <button
            style="
              width: 120px;
              height: 45px;
              margin-right: 20px;
              margin-bottom: 10px;
            "
            v-on:click.prevent="addGeneralLine"
          >
            Add new line for verb
          </button>
          <button
            style="width: 120px; height: 45px; margin-right: 20px"
            v-on:click.prevent="deleteGeneralLine"
          >
            Delete line
          </button>
        </div>
        <div>
          <ul id="general_table">
            <li>
              <div class="input-field inline">
                <input
                  id="general_0"
                  type="text"
                  class="validate general_input"
                />
                <label for="general_0">General</label>
                <small class="helper-text invalid"></small>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <button style="margin-top: 20px" class="btn" v-on:click.prevent="setData">
      Add to study
    </button>
  </form>
</template>

<script>
export default {
  name: "ExpansionWordList_InterfaceElement",
  data() {
    return {
      verbLine: 1,
      nounLine: 1,
      generalLine: 1,
      learning_word: null,
    };
  },
  emits: ["allData"],
  methods: {
    addVerbLine() {
      if (this.verbLine < 3) {
        document.getElementById("verb_table").insertAdjacentHTML(
          "afterend",
          `<li id="verb_li_${this.verbLine}" style="list-style-type: none"><div class="input-field inline">
          <input id="verb_${this.verbLine}" type="text" class="validate verb_input"/>
          <label for="verb_${this.verbLine}">Another verb</label>
          <small class="helper-text invalid"></small>
        </div></li>`
        );
        this.verbLine += 1;
      }
    },
    deleteVerbLine() {
      const target = document.querySelector(`#verb_li_${this.verbLine - 1}`);
      if (target) {
        target.remove();
        this.verbLine -= 1;
      }
    },
    addNounLine() {
      if (this.nounLine < 3) {
        document.getElementById("noun_table").insertAdjacentHTML(
          "afterend",
          `<li id="noun_li_${this.nounLine}" style="list-style-type: none"><div class="input-field inline">
          <input id="noun_${this.nounLine}" type="text" class="validate noun_input"/>
          <label for="noun_${this.nounLine}">Another noun</label>
          <small class="helper-text invalid"></small>
        </div></li>`
        );
        this.nounLine += 1;
      }
    },
    deleteNounLine() {
      const target = document.querySelector(`#noun_li_${this.nounLine - 1}`);
      if (target) {
        target.remove();
        this.nounLine -= 1;
      }
    },
    addGeneralLine() {
      if (this.generalLine < 3) {
        document.getElementById("general_table").insertAdjacentHTML(
          "afterend",
          `<li id="general_li_${this.generalLine}" style="list-style-type: none"><div class="input-field inline">
          <input id="general_${this.generalLine}" type="text" class="validate general_input"/>
          <label for="general_${this.generalLine}">Another general</label>
          <small class="helper-text invalid"></small>
        </div></li>`
        );
        this.generalLine += 1;
      }
    },
    deleteGeneralLine() {
      const target = document.querySelector(
        `#general_li_${this.generalLine - 1}`
      );
      if (target) {
        target.remove();
        this.generalLine -= 1;
      }
    },
    setData() {
      const learning_word = this.learning_word;
      const verb = [];
      const noun = [];
      const general = [];
      for (const i of document.querySelectorAll(".verb_input")) {
        verb.push(i.value);
      }
      for (const i of document.querySelectorAll(".noun_input")) {
        noun.push(i.value);
      }
      for (const i of document.querySelectorAll(".general_input")) {
        general.push(i.value);
      }
      this.$emit("allData", learning_word, verb, noun, general);
    },
  },
};
</script>

<style scoped></style>
