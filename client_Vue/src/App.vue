<template>
  <div>
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import MainLayout from "@/layout/MainLayout";
import EmptyLayout from "@/layout/EmptyLayout";

export default {
  name: "App",
  components: {
    MainLayout,
    EmptyLayout,
  },
  data() {
    return {};
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || "empty") + "-layout";
    },
  },
};
</script>

<style>
@import "~materialize-css/dist/css/materialize.min.css";
@import "assets/css/styles.scss";
</style>
