<template>
  <div class="modal-window__wrapper" ref="modal-window__wrapper">
    <div class="modal-window">
      <div class="modal-window__title">{{ modalTitle }}</div>
      <div class="modal-window__content">
        <slot></slot>
      </div>
      <div class="modal-window__btn">
        <button>
          <i class="material-icons" v-on:click="$emit('closeModal')">close</i>
        </button>
        <button>
          <i class="material-icons" v-on:click="$emit('sendData')">check</i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Word_ModalWindow",
  emits: ["closeModal", "sendData"],
  props: {
    modalTitle: {
      type: String,
      default: "Title",
    },
  },
  mounted() {
    const vm = this;
    document.addEventListener("click", (item) => {
      if (item.target === vm.$refs["modal-window__wrapper"]) {
        vm.$emit("closeModal");
      }
    });
  },
};
</script>

<style lang="scss">
.modal-window {
  padding: 20px;
  top: 200px;
  width: 400px;
  background: #ffffff;
  box-shadow: 0 0 17px 0 #e7e7e7;

  &__title,
  &__btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__content {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.modal-window__wrapper {
  background: #0000007a;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  position: fixed;
}
</style>
