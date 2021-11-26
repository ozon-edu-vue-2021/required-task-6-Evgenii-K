<template>
  <div>
    <radio
      :staticPaging="staticPaging"
      @picked="updatePaging"
    />
    <table class="table">
      <cus-table-head 
        @toggle="toggleSort"
        @filterProp="setFilterProp"
        :filterText="usersComment[filterProp].filter"
        v-model="usersComment[filterProp].filter"
      />
      <cus-table-body :comments="itemsOnPage"/>
    </table>
    <pagination
      v-if="staticPaging"
      :currentPage="currentPage"
      :showNext="filtered.length > endItemOnPage"
      :filteredLength="filtered.length"
      @click="onPaginationClick"
    />
    <div
      v-else
      class="scroll"
      v-detect-viewport="value"
    />
  </div>
</template>

<script>
import CusTableBody from './cus-table-body.vue'
import CusTableHead from './cus-table-head.vue'
import Radio from './cus-table-radio-box'
import Pagination from './cus-table-pagination'
import { orderBy } from 'lodash/collection'

export default {
  components: {
    CusTableBody,
    CusTableHead,
    Radio,
    Pagination,
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
      filterProp: 'id',
      sortProp: 'id',
      staticPaging: true,
      value: {
        callback: this.infGetPage
      },
    }
  },
  watch: {
    filtered() {
      if(this.staticPaging) this.currentPage = 1
    },
  },
  methods: {
    onPaginationClick(value) {
      this.currentPage = value
    },
    updatePaging(value) {
      this.staticPaging = value
      this.currentPage = 1
      if(value) {
        this.getComments()
        return
      }
      this.blockingPromise = this.getPage(1)
    },
    toggleSort(prop) {
      if(!this.staticPaging) return

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
      } catch (error) {
        console.log(error)
      }
    },
    async getPage(number) {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${number}`);
        this.comments = await response.json();
        this.currentPage = number;
      } catch (error) {
        console.log(error)
      }
    },
    async infGetPage() {
      try {
        this.blockingPromise && await this.blockingPromise;
        const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${this.currentPage + 1}`);
        const newComments = await response.json();
        this.comments = [...this.comments, ...newComments];
        this.currentPage++;
      } catch (error) {
        console.log(error)
      }
    }
  },
  created() {
    if (this.staticPaging) {
      this.getComments()
      return
    }
    this.blockingPromise = this.getPage(1)
  },
  computed: {
    startItemOnPage() {
      if(!this.staticPaging) return 0
      return (this.currentPage - 1) * this.maxItemsOnPage
    },
    endItemOnPage() {
      if(!this.staticPaging) return this.comments.length
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
          if (comment[filterProp]?.toString().toLowerCase().indexOf(this.usersComment[filterProp].filter.toLowerCase()) < 0) {
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
.scroll {
  width: 100%;
  height: 32px;
  background: center center no-repeat url('../../assets/dost-loader.svg');
}
</style>