<template>
  <div class="app-loader center">
    <div class="preloader-wrapper big active">
      <div class="spinner-layer" :class="color">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div>
        <div class="gap-patch">
          <div class="circle"></div>
        </div>
        <div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loader",

  computed: {
    color() {
      const colors = [
        "spinner-blue-only",
        "spinner-red-only",
        "spinner-green-only",
        "spinner-blue",
      ];
      return colors[Math.floor(Math.random() * 4)];
    },
  },
};
</script>

<style scoped></style>
