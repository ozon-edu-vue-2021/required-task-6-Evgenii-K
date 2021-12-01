<template functional>
  <tr class="body__content">
    <th 
      scope="row" 
      class="body__id"
    >
      {{props.comment.id}}
    </th>
    <td
      :title="$options.isMaxCommentLength(props.comment)"
    >
      {{$options.maxLengthWord(props.comment.name, $options.maxCommentLength)}}
    </td>
    <td>
      <a 
        class="body__link" 
        :href="`mailto:${props.comment.email}`"
      >
        {{$options.maxLengthWord(props.comment.email, $options.maxEmailLength)}}
      </a>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'Table-item',
  maxCommentLength: 48,
  maxEmailLength: 24,
  props: {
    comment: {
      type: Object,
      default: () => {},
    }
  },
  maxLengthWord(word, maxLength) {
    if (word.length < maxLength) return word
    return word.split('').slice(0, maxLength).join('') + '...'
  },
  isMaxCommentLength(comment) {
    return comment?.name.length > this.maxCommentLength ? comment.name : ''
  },
}
</script>

<style scoped>
.body__content:nth-child(even){
	background: #eff3f4;
}
.body__content td {
	text-align: left;
	padding: 10px 15px;
}
.body__id {
  width: 100px;
}
.body__link {
  color: #005bff;
  text-decoration: none;
}
</style>