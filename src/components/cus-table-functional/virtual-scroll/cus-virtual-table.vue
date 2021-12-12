<template>
  <div class="table">
    <cus-virtual-head 
      :usersComment="usersComment"
    />

    <RecycleScroller
      class="body__wrapper"
      :items="comments"
      :item-size="40"
      :buffer="2000"
      page-mode
      key-field="id"
      v-slot="{ item }"
    >
      <Item :comment="item"/>
    </RecycleScroller>
  </div>
</template>

<script>
import Item from "./cus-table-item__fc.vue"
import CusVirtualHead from './cus-virtual-head__fc.vue'

export default {
  components: {
    Item,
    CusVirtualHead,
  },
  name: 'Custom-virtual-table',
  props: {
    comments: {
      type: Array,
      default: () => [],
    },
    usersComment: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>

<style scoped>
.table {
	width: 800px;
	margin-bottom: 20px;
}
</style>