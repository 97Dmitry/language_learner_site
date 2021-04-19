<template>
  <div class="main_layout">
    <Header />
    <div class="container main_layout_container">
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";

export default {
  name: "MainLayout",
  components: { Header },
  data() {
    return {};
  },
  methods: {},
};
</script>
