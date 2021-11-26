<template>
  <tbody class="tbody">
    <tr
      v-for="(comment, idx) in comments.slice(0, 20)"
      :key="comment.id ? comment.id : idx"
    >
      <td>{{comment.id}}</td>
      <td>{{comment.name}}</td>
      <td>
        <a :href="`mailto:${comment.email}`">{{ comment.email }}</a>
      </td>
    </tr>
  </tbody>
</template>

<script>
export default {
  name: 'Custom-table-body',
  props: {
    comments: {
      type: Array,
      default: () => [],
    }
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