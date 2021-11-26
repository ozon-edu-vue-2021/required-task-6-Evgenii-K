<template>
  <div>
    {{ usersComment[filterProp].filter }}
    <table class="table">
      <cus-table-head 
        @toggle="toggleSort"
        @filterProp="setFilterProp"
        :filterText="usersComment[filterProp].filter"
        v-model="usersComment[filterProp].filter"
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
        v-show="filtered.length > endItemOnPage"
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
      usersComment: {
        id: {
          filter: '',
          sortDir: 'asc',
        },
        name: {
          filter: '',
          sortDir: 'asc',
        },
        email: {
          filter: '',
          sortDir: 'asc',
        },
      },
      filterProp: 'name',
      sortProp: 'id',
    }
  },
  watch: {
    filtered() {
      this.currentPage = 1
    }
  },
  methods: {
    toggleSort(prop) {
      this.currentPage = 1

      if (this.sortProp === prop) {
        this.usersComment[prop].sortDir = this.usersComment[prop].sortDir === 'asc' ? 'desc' : 'asc';
      }

      this.sortProp = prop
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
      const pagesList = Math.ceil(this.filtered.length / this.maxItemsOnPage)
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
      let res

      res = orderBy(this.filtered, this.sortProp, this.usersComment[this.sortProp].sortDir);

      return res.slice(this.startItemOnPage, this.endItemOnPage)
    },
    filtered() {
      return this.comments.filter(comment => {
        for (let filterProp in this.usersComment) {
          if (comment[filterProp].toString().toLowerCase().indexOf(this.usersComment[filterProp].filter.toLowerCase()) < 0) {
            return false;
          }
        }
        return true;
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