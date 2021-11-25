<template>
  <div v-click-outside="closeOutside" class="drop-down-toggle">
    <div @click="open">
      <slot name="drop-down-toggle"></slot>
    </div>
    <div v-show="opened" @click="close" class="drop-down-content">
      <slot name="drop-down-content" class="test"></slot>
    </div>
  </div>
</template>

<script>
import ClickOutside from "vue-click-outside";

export default {
  name: 'BaseDropdown',
  data: () => ({
    opened: false,
  }),
  methods: {
    open() {
      this.opened = true
    },
    closeOutside() {
      if(!this.opened) return
      this.opened = false
      this.$emit('close')
    },
    close() {
      this.opened = false
    }
  },
  directives: {
    ClickOutside,
  },
}
</script>

<style scoped>
.drop-down-toggle{
  position: relative;
}
.drop-down-content {
  position: absolute;
  z-index: 10;
  background-color: #fff;
  border: 2px solid #dce0e6;
  border-radius: 5px;
  display: grid;
  width: 100%;
  padding: 5px 0;
  max-height: 317px;
  overflow: auto;
}
.drop-down-content > div {
  padding: 10px;
}
.drop-down-content > div:hover {
  background-color: rgb(233, 233, 233);
  cursor: pointer;
}
</style>