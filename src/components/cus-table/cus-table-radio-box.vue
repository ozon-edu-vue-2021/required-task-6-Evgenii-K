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
      type: String,
    }
  },
  data() {
    return {
      staticPagingTitle: [
        {
          name: 'pagination',
          title: 'Пагинация'
        }, {
          name: 'infinite',
          title: 'Бесконечный скролл'
        },
        { 
          name: 'virtual',
          title: 'Виртуальный скролл'
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