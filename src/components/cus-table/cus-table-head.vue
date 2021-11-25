<template>
  <thead>
    <th
      v-for="head in headers"
      :key="head.name"
      @click="$emit('toggle', head.name)"
    >
      <VDropdown
        :offset="[0, 16]"
        :autoHide="false"
      >
        <font-awesome-icon
          class="filterIcon"
          icon="filter"
          @click="$emit('filterProp', head.name)"
        />

        <template #popper>
          <p>Фильтр по полю {{head.title}} {{ head.name === 'id' ? '(только цифры)' : ''}}</p>
          <base-input 
            :type="head.name === 'id' ? 'number' : 'text'"
            class="tooltip-content"
            @input="setFilterText"
            :value="filterText" 
            placeholder="Tooltip content" 
          />
          <font-awesome-icon
            icon="times"
            class="closeIcon"
            v-close-popper
          />
        </template>
      </VDropdown>

      {{ head.title }}
    </th>
  </thead>
</template>

<script>
import BaseInput from '../BaseComponents/BaseInput.vue'

export default {
  name: 'Custom-table-head',
  components: {
    BaseInput,
  },
  data() {
    return {
      headers: [
        {name: 'id', title: 'Id'},
        {name: 'name', title: 'Пользователи'},
        {name: 'email', title: 'Email'},
      ],
    }
  },
  props: {
    filterText: {
      type: String,
      default: '',
    }
  },
  methods: {
    setFilterText(value) {
      this.$emit('input', value)
    }
  },
}
</script>

<style>
  .filterIcon {
    margin-left: auto;
    margin-right: 8px;
  }

  .filterIcon:hover {
    cursor: pointer;
  }

  .closeIcon {
    position: absolute;
    top: 6px;
    right: 6px;
  }

  .closeIcon:hover {
    cursor: pointer;
  }
</style>