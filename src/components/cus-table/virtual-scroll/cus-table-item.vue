<template>
  <div class="body__content">
    <div 
      class="body__id"
    >
      {{comment.id}}
    </div>
    <div 
      :title="comment.name"
    >
      {{maxLengthWord(comment.name, maxCommentLength)}}
    </div>
    <div>
      <a 
        class="body__link" 
        :href="`mailto:${comment.email}`"
      >
        {{maxLengthWord(comment.email, maxEmailLength)}}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Table-item',
  data() {
    return {
      maxCommentLength: 48,
      maxEmailLength: 24,
    }
  },
  props: {
    comment: {
      type: Object,
      default: () => {},
    }
  },
  methods: {
    maxLengthWord(word, maxLength) {
      if (word.length < maxLength) return word
      return word.split('').slice(0, maxLength).join('') + '...'
    },
  },
  computed: {
    isMaxCommentLength() {
      return this.comment?.name.length > this.maxCommentLength ? this.comment.name : ''
    },
  }
}
</script>

<style scoped>
.body__content {
  display: grid;
  grid-template-columns: 1fr 4.5fr 2.5fr;
}
.body__content div {
	padding: 10px 15px;
  border-bottom: solid 1px #b8b7b7;
}
.body__id {
  text-align: center;
  font-weight: 700;
}
.body__link {
  color: #005bff;
  text-decoration: none;
}
</style>