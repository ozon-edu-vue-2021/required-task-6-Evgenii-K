<template>
  <div id="app">
    <cus-table/>
  </div>
</template>

<script>
import cusTable from './components/cus-table'

export default {
  components: { cusTable },
  name: 'App',
};
</script>

<style>
#app {
  display: grid;
  justify-content: center;
  align-items: start;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  background-color: #fff;
  box-sizing: border-box;
}

html,
body,
#app {
  min-height: 100%;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}

* {
  box-sizing: border-box;
}
</style>
