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
  // data() {
  //   return {
  //     slots: []
  //   }
  // },
  // created() {
  //   this.slots = this.$slots.default.
  //     map(post => post = {...post.data.attrs, scopedSlots: post.data.scopedSlots})
  // },
  // methods: {
  //   renderColumns(row, slots) {
  //     return slots.map((column) => {
  //       return <td key={column.prop}>{column.scopedSlots && column.scopedSlots.body ? column.scopedSlots.body({ row }) : row[column.prop]}</td>
  //     });
  //   },

  // },
  // computed: {
  //   renderRows() {
  //     return this.comments.slice(0, 3).map((row, index) => {
  //       return <tr key={row.id || index}>{...this.renderColumns(row, this.slots)}</tr>;
  //     })
  //   },
  //   renderBlock(block) {
  //     console.log(block);
  //     console.log(this.$createElement('tbody', block));
  //     return this.$createElement('tbody', block)
  //   }
  // },
  // watch: {
  //   renderRows() {
  //     this.renderBlock(this.renderRows)
  //   }
  // }
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