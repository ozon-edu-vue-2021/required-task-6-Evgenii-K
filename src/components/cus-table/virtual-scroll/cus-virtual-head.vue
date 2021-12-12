<template>
  <div class="head__content">
    <div
      class="head__item"
      v-for="head in headers"
      :key="head.name"
    >
      {{ head.title }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Custom-virtual-head',
  data() {
    return {
      headers: [
        {name: 'id', title: 'Id'},
        {name: 'name', title: 'Пользователи'},
        {name: 'email', title: 'Email'},
      ],
    }
  },
}
</script>

<style>
.head__content {
  display: grid;
  grid-template-columns: 1fr 4.5fr 2.5fr;
  background: #e7f0fd;
  font-weight: bold;
}
.head__item {
  padding: 10px 15px;
}
</style>