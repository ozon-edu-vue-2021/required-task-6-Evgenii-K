<template>
  <div>
    {{ filters[filterProp] }}
    <table class="table">
      <cus-table-head 
        @toggle="toggleSort"
        @filterProp="setFilterProp"
        :filterText="filters[filterProp]"
        v-model="filters[filterProp]"
      />
      <cus-table-body :comments="itemsOnPage"/>
    </table>
    <div
      class="pagination__wrapper"
    >
      <button
        v-show="currentPage > 1"
        @click="currentPage--"
      >
        Назад
      </button>
      <div 
        class="pagination"
        v-for="page in pages"
        :key="page"
      >
        {{page}}
      </div>
      <button
        v-show="filteredCats.length > endItemOnPage"
        @click="currentPage++"
      >
        Вперёд
      </button>
    </div>
  </div>
</template>

<script>
import CusTableBody from './cus-table-body.vue'
import CusTableHead from './cus-table-head.vue'
import { orderBy } from 'lodash/collection';

export default {
  components: {
    CusTableBody,
    CusTableHead,
  },
  name: 'Table',
  data() {
    return {
      comments: [],
      maxItemsOnPage: 10,
      currentPage: 1,
      filters: {
        id: '',
        name: '',
        email: 'wil',
      },
      filterText: '',
      filterProp: 'name',
      filterName: 'name',
      filterEmail: '',
      filterIdMin: 25,
      filterIdMax: this.comments?.length | 0,
      currentSortDir:'asc',
      currentSort:'',
    }
  },
  methods: {
    toggleSort(prop) {
      if(prop === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
      }
      this.currentSort = prop;
    },
    setFilterProp(name) {
      this.filterProp = name
    },
    async getComments() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/comments')

        if (response.status !== 200) return console.log('Ошибка сервера');
        
        this.comments = await response.json()

        console.log(this.comments)

      } catch (error) {
        console.log(error)
      }
    },
  },
  mounted() {
    this.getComments()
  },
  computed: {
    pages() {
      const pagesList = Math.ceil(this.filteredCats.length / this.maxItemsOnPage)
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
    startItemOnPage() {
      return (this.currentPage - 1) * this.maxItemsOnPage
    },
    endItemOnPage() {
      return this.currentPage * this.maxItemsOnPage
    },
    itemsOnPage() {
      let res;

      res = orderBy(this.filteredCats, [this.currentSort], [this.currentSortDir]);

      return res
        .slice(this.startItemOnPage, this.endItemOnPage)
    },
    filteredCats() {
      return this.comments.filter(comment => {
        // const prop = comment[this.filterProp].toLowerCase()
        // const search = this.filters[this.filterProp].toLowerCase()
        for (let filterProp in this.filters) {
          if (comment[filterProp].toString().toLowerCase().indexOf(this.filters[filterProp].toLowerCase()) < 0) {
            return false;
          }
          // if (comment[filterProp] === undefined || comment[filterProp] != filter[key])
            
        }
        return true;
        // return prop.indexOf(search) >= 0;
      })
    },

  },
}
</script>

<style scoped>
.table {
	width: 800px;
	margin-bottom: 20px;
  border-spacing: 0px;
}
.table thead th {
	font-weight: bold;
	text-align: left;
	padding: 10px 15px;
	background: #e7f0fd;
}
.pagination__wrapper {
  display: flex;
  flex-wrap: wrap;
  max-width: 400px;
}
.pagination {
  padding: 12px;
}
</style>