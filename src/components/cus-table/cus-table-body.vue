<template>
  <tbody class="tbody">
    <tr
      v-for="(comment, idx) in comments.slice(0, 20)"
      :key="comment.id ? comment.id : idx"
    >
      <th scope="row" class="body__id">{{comment.id}}</th>
      <td>{{maxLengthWord(comment.name, 48)}}</td>
      <td>
        <a class="body__link" :href="`mailto:${comment.email}`">{{maxLengthWord(comment.email, 24)}}</a>
      </td>
    </tr>
  </tbody>
</template>

<script>
export default {
  name: 'Table-body',
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