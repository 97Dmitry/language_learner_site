<template>
  <div class="example_table_noun">
    <div>
      <button v-on:click.prevent="addNounLine">Add new line for noun</button>
      <button v-on:click.prevent="deleteNounLine">Delete line</button>
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
</template>

<script>
export default {
  data() {
    return {
      nounLine: 1,
    };
  },
  methods: {
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
  },
};
</script>
