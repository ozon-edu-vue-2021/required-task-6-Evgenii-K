<template>
  <tbody class="tbody">
    <tr
      v-for="(comment, idx) in comments"
      :key="comment.id ? comment.id : idx"
    >
      <th 
        scope="row" 
        class="body__id"
      >
        {{comment.id}}
      </th>
      <td
        :title="comment.name"
      >
        {{maxLengthWord(comment.name, maxCommentLength)}}
      </td>
      <td>
        <a 
          class="body__link" 
          :href="`mailto:${comment.email}`"
        >
          {{maxLengthWord(comment.email, maxEmailLength)}}
        </a>
      </td>
    </tr>
  </tbody>
</template>

<script>
export default {
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
      return word.split('').slice(0, maxLength).join('') + '...'
    }
  },
  computed: {
    isMaxCommentLength() {
      return this.comment?.name.length > this.maxCommentLength ? this.comment.name : ''
    },
  }
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
.body__id {
  width: 100px;
}
.body__link {
  color: #005bff;
  text-decoration: none;
}
</style>