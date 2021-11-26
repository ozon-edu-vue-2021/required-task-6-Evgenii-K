<template>
  <base-radio
    :items="staticPagingTitle"
    :picked="staticPaging"
    @picked="updatePaging"
  />
</template>

<script>
import BaseRadio from '../BaseComponents/BaseRadio'

export default {
  components: {
    BaseRadio,
  },
  name: 'Table-radio-box',
  props: {
    staticPaging: {
      type: Boolean,
    }
  },
  data() {
    return {
      staticPagingTitle: [
        {
          name: true,
          title: 'Пагинация'
        }, {
          name: false,
          title: 'Бесконечный скролл'
        },
      ],
    }
  },
  methods: {
    updatePaging(value) {
      this.$emit('picked', value)
    }
  }
}
</script>

<style>

</style>