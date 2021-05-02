<template>
  <div class="example_table_general">
    <div>
      <button v-on:click.prevent="addGeneralLine">
        Add new line for general
      </button>
      <button v-on:click.prevent="deleteGeneralLine">Delete line</button>
    </div>
    <div>
      <ul id="general_table">
        <li>
          <div class="input-field inline">
            <input id="general_0" type="text" class="validate general_input" />
            <label for="general_0">General</label>
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
      generalLine: 1,
    };
  },
  methods: {
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
  },
};
</script>
