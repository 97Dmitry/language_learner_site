<template>
  <div class="sidebar">
    <div class="sidebar__item" v-on:click="$router.push('/')">Home</div>
    <div class="sidebar__item" v-on:click="$router.push('/practice')">
      Practice
    </div>
    <div class="sidebar__item">All my study words</div>
    <div class="sidebar__item" v-on:click="$router.push('/expansion')">
      Add new word
    </div>
    <div class="sidebar__item">Redact word</div>
    <div class="sidebar__item">Delete word</div>
  </div>
</template>

<script>
export default {
  name: "SideBar",
};
</script>

<style scoped></style>
