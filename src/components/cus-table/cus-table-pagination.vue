<template>
  <div class="pagination__wrapper">
    <font-awesome-icon
      class="pagination__icon--angle"
      icon="angle-double-left"
      v-show="currentPage > 1"
      @click="$emit('click', 1)"
    />
    <font-awesome-icon
      class="pagination__icon--angle"
      icon="angle-left"
      v-show="currentPage > 1"
      @click="$emit('click', value = currentPage - 1)"
    />
    <div
      v-for="page in pages"
      :key="page"
      class="pagination__number"
      :class="page === currentPage ? 'pagination__active' : ''"
      @click="$emit('click', page)"
    >
      {{page}}
    </div>
    <font-awesome-icon
      class="pagination__icon--angle"
      icon="angle-right"
      v-show="showNext"
      @click="$emit('click', value = currentPage + 1)"
    />
    <font-awesome-icon
      class="pagination__icon--angle"
      icon="angle-double-right"
      v-show="showNext"
      @click="$emit('click', pagesList)"
    />
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
    pagesList() {
      return Math.ceil(this.filteredLength / this.maxItemsOnPage)
    },
    pages() {
      if (this.staticPaging) return

      if (this.currentPage <= 3) {
        if (this.pagesList < 5) return this.pagesList
        return 5
      }
  
      if (this.currentPage >= this.pagesList - 2) {
        return [
          this.pagesList - 4,
          this.pagesList - 3,
          this.pagesList - 2,
          this.pagesList - 1,
          this.pagesList
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
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
}
.pagination__number {
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  padding: 0px 12px;
}
.pagination__number:hover, .pagination__icon--angle:hover {
  color: #005bff;
}
.pagination__active {
  color: #005bff;
  font-weight: 700;
}
.pagination__icon--angle {
  margin: 0px 12px;
  color: #2c3e50;
  cursor: pointer;
  width: 20px;
  height: 20px;
}
</style>