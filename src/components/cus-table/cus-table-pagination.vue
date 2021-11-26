<template>
  <div
    class="pagination__wrapper"
  >
    <button
      v-show="currentPage > 1"
      @click="$emit('click', value = currentPage - 1)"
    >
      Назад
    </button>
    <div 
      class="pagination"
      v-for="page in pages"
      :key="page"
    >
      <p
        class="pagination__number"
        :class="page === currentPage ? 'pagination__active' : ''"
        @click="$emit('click', page)"
      >{{page}}</p>
    </div>
    <button
      v-show="showNext"
      @click="$emit('click', value = currentPage + 1)"
    >
      Вперёд
    </button>
  </div>
</template>

<script>
export default {
  name: 'Table-pagination',
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    showNext: {
      type: Boolean,
      default: false
    },
    staticPaging: {
      type: Boolean,
    },
    filteredLength: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      maxItemsOnPage: 10,
    }
  },
  computed: {
    pages() {
      if (this.staticPaging) return

      const pagesList = Math.ceil(this.filteredLength / this.maxItemsOnPage)
      if (this.currentPage <= 3) {
        if (pagesList < 5) return pagesList
        return 5
      }
  
      if (this.currentPage >= pagesList - 2) {
        return [
          pagesList - 4,
          pagesList - 3,
          pagesList - 2,
          pagesList - 1,
          pagesList
        ];
      }

      return [
        this.currentPage - 2,
        this.currentPage - 1,
        this.currentPage,
        this.currentPage + 1,
        this.currentPage + 2
      ]
    },
  }
}
</script>

<style scoped>
.pagination__wrapper {
  display: flex;
  flex-wrap: wrap;
  max-width: 400px;
}
.pagination {
  padding: 12px;
}
.pagination__number {
  cursor: pointer;
}
.pagination__number:hover {
  color: #005bff;
}
.pagination__active {
  color: #005bff;
}
</style>