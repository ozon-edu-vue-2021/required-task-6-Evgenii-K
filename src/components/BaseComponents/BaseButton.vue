<template>
  <button class="button" >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "BaseButton",
};
</script>

<style scoped>
.button {
  background-color: #005bff;
  font-size: 16px;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  transition: 0.2s ease-in;
  text-align: center;
  max-width: max-content;
  flex-shrink: 0;
}
.button:hover {
  background-color: #003ead;
}
.button:active {
  background-color: #005bff;
  box-shadow: 0 0 5px 0 rgba(0, 91, 255, 0.5);
}
.button:disabled {
  background-color: #5a6c7d;
}
</style>
