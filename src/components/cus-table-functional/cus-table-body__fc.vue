<template>
  <tbody class="tbody">
    <Item
      v-for="(comment, idx) in comments"
      :key="comment.id ? comment.id : idx"
      :comment="comment"
    />
  </tbody>
</template>

<script>
import Item from './cus-table-item__fc.vue'
export default {
  components: {
    Item,
  },
  name: 'Table-body',
  data() {
    return {
      maxCommentLength: 48,
      maxEmailLength: 24,
    }
  },
  props: {
    comments: {
      type: Array,
      default: () => [],
    }
  },
  methods: {
    maxLengthWord(word, maxLength) {
      if (word.length < maxLength) return word
      return word.substring(0, maxLength) + '...'
    }
  },
  computed: {
    isMaxCommentLength() {
      return this.comment?.name.length > this.maxCommentLength ? this.comment.name : ''
    },
  },
}
</script>

<style scoped>
.tbody td {
	text-align: left;
	padding: 10px 15px;
}
.tbody tr:nth-child(even){
	background: #eff3f4;
}
</style>