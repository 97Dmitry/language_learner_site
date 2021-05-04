<template>
  <div class="example_table_verb">
    <div>
      <button v-on:click.prevent="addVerbLine">Add new line for verb</button>
      <button v-on:click.prevent="deleteVerbLine">Delete line</button>
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
</template>

<script>
export default {
  data() {
    return {
      verbLine: 1,
    };
  },
  methods: {
    addVerbLine() {
      if (this.verbLine < 3) {
        document.getElementById("verb_table").insertAdjacentHTML(
          "afterend",
          `<li id="verb_li_${this.verbLine}"><div class="input-field inline">
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
  },
};
</script>
