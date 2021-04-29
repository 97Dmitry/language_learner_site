<template>
  <div class="sidebar">
    <div
      class="sidebar__item"
      v-on:click="$router.push('/')"
      style="cursor: pointer"
    >
      Home
    </div>
    <div
      class="sidebar__item"
      v-on:click="$router.push('/practice')"
      style="cursor: pointer"
    >
      Practice
    </div>
    <div
      class="sidebar__item"
      v-on:click="$router.push(`/all_words`)"
      style="cursor: pointer"
    >
      All my study words
    </div>
    <div
      class="sidebar__item"
      v-on:click="$router.push('/expansion')"
      style="cursor: pointer"
    >
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
