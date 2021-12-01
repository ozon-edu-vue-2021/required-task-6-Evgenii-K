<template>
  <div>
    <radio
      class="radio__button"
      :staticPaging="staticPaging"
      @picked="updatePaging"
    />

    <div v-if="staticPaging === 'virtual'">
      <virtual 
        :comments="comments"
        :usersComment="usersComment"
      />
    </div>

    <div v-else>

      <table class="table">
        <cus-table-head 
          @toggle="toggleSort"
          @filterProp="setFilterProp"
          :filterText="usersComment[filterProp].filter"
          v-model="usersComment[filterProp].filter"
          :usersComment="usersComment"
          :sortProp="sortProp"
          :staticPaging="staticPaging"
        />
        <cus-table-body :comments="itemsOnPage"/>
      </table>
      
      <pagination
        v-if="staticPaging === 'pagination'"
        :currentPage="currentPage"
        :showNext="filtered.length > endItemOnPage"
        :filteredLength="filtered.length"
        @click="onPaginationClick"
      />

      <div
        v-else
        class="scroll"
        v-detect-viewport="{callback: this.infGetPage}"
      />

    </div>
  </div>
</template>

<script>
import CusTableBody from './cus-table-body__fc.vue'
import CusTableHead from './cus-table-head.vue'
import Radio from './cus-table-radio-box'
import Pagination from './cus-table-pagination'
import { orderBy } from 'lodash/collection'
import Virtual from './virtual-scroll/cus-virtual-table.vue'

export default {
  components: {
    CusTableBody,
    CusTableHead,
    Radio,
    Pagination,
    Virtual,
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
      staticPaging: 'pagination',
    }
  },
  watch: {
    filtered() {
      if(this.staticPaging === 'pagination') this.currentPage = 1
    },
    staticPaging() {
      Object.keys(this.usersComment).forEach(key => {
        this.usersComment[key].filter = ''
        this.usersComment[key].sortDir = 'asc'
      })
      this.filterProp = 'id'
      this.sortProp = 'id'
      this.currentPage = 1
    },
  },
  methods: {
    onPaginationClick(value) {
      this.currentPage = value
    },
    updatePaging(value) {
      this.comments = []
      this.staticPaging = value
      this.init()
    },
    toggleSort(prop) {
      if(this.staticPaging !== 'pagination') return
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
    async getPage() {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/comments?_limit=25`);
        this.comments = await response.json();
        this.currentPage = 5
      } catch (error) {
        console.log(error)
      }
    },
    async infGetPage() {
      try {
        await this.blockingPromise
        const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${this.currentPage + 1}`)
        const newComments = await response.json()
        this.comments = [...this.comments, ...newComments]
        this.currentPage++
      } catch (error) {
        console.log(error)
      }
    },
    async init() {
      if (this.staticPaging === 'infinite') {
        return this.blockingPromise = this.getPage()
      }
      this.getComments()
    },
  },
  created() {
    this.init()
  },
  computed: {
    startItemOnPage() {
      if(this.staticPaging !== 'pagination') return 0
      return (this.currentPage - 1) * this.maxItemsOnPage
    },
    endItemOnPage() {
      if(this.staticPaging !== 'pagination') return this.comments.length
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
.scroll {
  width: 100%;
  height: 32px;
  background: center center no-repeat url('../../assets/dost-loader.svg');
}
.radio__button {
  width: 100%;
  justify-content: center;
  padding: 24px 0;
}
</style>