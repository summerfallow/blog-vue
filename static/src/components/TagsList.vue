<template>
  <page>
    <div class="main">
      <ul class="blogBox">
        <li
          v-for="item in tableData.data"
          :key="item.id">
          <div class="title">
            <h3><a @click="handleClick(`/detail/${item.id}`)">{{ item.title }}</a></h3>
            <span>{{ item.author }}  {{ item.create_time | dateformat }}</span>
          </div>
          <div class="content" v-html="getContent(item.content)"></div>
          <a class="readAll" @click="handleClick(`/detail/${item.id}`)">阅读全文 »</a>
        </li>
      </ul>
      <div class="pagination">
        <el-pagination
          layout="prev, pager, next"
          @current-change="paginationChange"
          :current-page="tableData.current"
          :total="tableData.total">
        </el-pagination>
      </div>
    </div>
  </page>
</template>

<script>
import moment from 'moment'
import Connect from '../../utils/connect'
import page from './component/Page.vue'

export default {
  name: 'List',
  components: {
    page
  },
  data () {
    return {
      data: {
        fullname: '秋也'
      },
      tableData: {
        data: [],
        current: 1,
        total: 0
      }
    }
  },
  filters: {
    dateformat (dataStr, pattern = 'MM月DD，YYYY') {
      return moment(dataStr).format(pattern)
    }
  },
  mounted: function () {
    this.refreshList()
  },
  methods: {
    // 获取列表
    refreshList (current = 1) {
      const { tableData } = this
      const { id } = this.$route.query
      Connect(20005, {current, type: id}, data => {
        if (data.success) {
          tableData['data'] = data.data
          tableData['current'] = Number(data.current)
          tableData['total'] = Number(data.total)
        } else {
          this.$message.error(data.message)
        }
      })
    },
    // 翻页回调
    paginationChange (e) {
      this.refreshList(e)
    },
    handleClick: function (url) {
      this.$router.push({ path: url })
    },
    getContent (value) {
      const til = value.substring(1, value.indexOf('>') + 1)
      const content = value.substring(0, value.indexOf(`</${til}`) + til.length + 2)
      return content
    }
  }
}
</script>

<style scoped>
  .main {
    width: 1080px;
    height: auto;
    margin: 0 auto;
  }
  .blogBox {
    margin: 0;
    padding: 0;
  }
  .blogBox li {
    list-style: none;
    margin: 0;
    padding: 0;
    border-bottom: 1px dashed #ccc;
    padding-bottom: 20px;
  }
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .title h3 a {
    color: #333;
    text-decoration: none;
  }
  .title h3 a:hover, .readAll {
    color: #2479CC;
    text-decoration: none;
    cursor: pointer;
  }
  .readAll {
    font-size: 14px;
    font-weight: 400;
  }
  .content {
    padding: 20px;
    background: #eee;
    margin-bottom: 20px;
    border-radius: 10px;
  }
  .pagination {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin: 15px 0;
  }
</style>
