<template>
  <base-dropdown @close="blurHandler">
    <template slot="drop-down-toggle">
      <div
        @click="clickOnInput"
      >
        <base-input
          :id="propName"
          :label="label"
          type="text"
          v-model="value"
          :readonly="readonly"
          :required="required"
        />
      </div>
    </template>

    <template 
      slot="drop-down-content"
      v-if="itemsAfterFilter.length"
    >
      <div 
        v-for="(item) in itemsAfterFilter" 
        :key="item.id"
        @click="selectHandler(item)"
      >
        {{ item[propName] }}
      </div>
    </template>

    <template 
      v-else
      slot="drop-down-content"
    >
      <div>
        Ничего не найдено
      </div>
    </template>
  </base-dropdown>
</template>

<script>
import BaseDropdown from './BaseDropdown.vue'
import BaseInput from './BaseInput.vue'
import _ from 'lodash'

export default {
  props: {
    items: {
      type: Array,
      default: () => ({})
    },
    propName: {
      type: String,
      default: 'name'
    },
    selected: {
      type: Object,
      default: () => ({})
    },
    label: {
      type: String,
      default: ''
    },
    readonly: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      value: '',
      itemsAfterFilter: []
    }
  },
  watch: {
    value() {
      if(!this.items.length) return
        
      if (this.value === '') {
        this.itemsAfterFilter = this.items
      }

      this.debounceMethod()
    }
  },
  mounted() {
    if(this.items.length) {

      this.itemsAfterFilter = this.items

      this.isSelected()
    }
  },
  methods: {
    selectHandler(item) {
      this.$emit('update', item)
      this.value = item[this.propName]
    },
    blurHandler() {
      const target = this.items.filter(item => item[this.propName].toLowerCase() === this.value.toLowerCase())

      if (!target.length) {
        this.isSelected()
      } else {
        this.value = target[0][this.propName]
        this.$emit('update', target[0])
      }
    },
    clickOnInput() {
      this.value = ''
    },
    isSelected() {
      this.value = this.selected[this.propName] 
        ? this.selected[this.propName]
        : ''
    },
    debounceMethod: 
      _.debounce(function () {
        console.log('Button clicked!', this.value)

        if (this.value === '') {
          this.itemsAfterFilter = this.items
        } else {
          this.itemsAfterFilter = this.items.filter(item => 
            item[this.propName].toLowerCase().includes(this.value.toLowerCase())
          )
        }
      }, 1000)
  },
  components: { BaseDropdown, BaseInput },
}
</script>

<style>

</style>