<template>
  <div class="head__content">
    <div
      class="head__item"
      v-for="head in headers"
      :key="head.name"
    >
      <div 
        class="head__item--title"
        @click="$emit('toggle', head.name)"
      >
        {{ head.title }}
        <font-awesome-icon
          :icon="head.name === sortProp 
          ? usersComment[head.name].sortDir === 'asc' ? 'sort-down' : 'sort-up'
          : 'sort'"
        />
      </div>

      <VDropdown
        :offset="[0, 16]"
        :autoHide="false"
      >

        <font-awesome-icon
          class="filterIcon"
          :icon="usersComment[head.name].filter.length ? 'filter' : 'random'"
          @click="$emit('filterProp', head.name)"
        />

        <template #popper>
          <p class="head__dropdown--title">Фильтр по полю {{head.title}} {{ head.name === 'id' ? '(только цифры)' : ''}}</p>
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
    </div>
  </div>
</template>

<script>
import BaseInput from '../../BaseComponents/BaseInput.vue'

export default {
  name: 'Custom-virtual-head',
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
    },
    usersComment: {
      type: Object,
      default: () => {}
    },
    sortProp: {
      type: String,
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
.head__content {
  display: grid;
  grid-template-columns: 1fr 4fr 3fr;
  background: #e7f0fd;
  font-weight: bold;
}
.head__item {
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
}
.head__item--title {
  cursor: pointer;
}
.filterIcon {
  color: #2c3e50;
  margin-left: auto;
  margin-right: 8px;
}
.filterIcon:hover,  .closeIcon:hover {
  cursor: pointer;
}
.closeIcon {
  position: absolute;
  top: 6px;
  right: 6px;
}
.head__dropdown--title {
  margin: 0;
}
</style>