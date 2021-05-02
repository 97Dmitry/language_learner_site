<template>
  <div class="main_layout">
    <Header />
    <div class="container content">
      <slot />
    </div>
  </div>
</template>

<script>
import Header from "@/components/App/Header";

export default {
  name: "MainLayout",
  components: { Header },
  data() {
    return {};
  },
  methods: {},
};
</script>
