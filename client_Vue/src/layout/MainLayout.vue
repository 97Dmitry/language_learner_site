<template>
  <div class="main_layout">
    <Header />
    <SideBar />
    <div class="container content">
      <slot />
    </div>
  </div>
</template>

<script>
import Header from "@/components/App/Header";
import SideBar from "@/components/App/SideBar";

export default {
  name: "MainLayout",
  components: { SideBar, Header },
  data() {
    return {};
  },
  methods: {},
};
</script>
