<template>
  <page>
    <div class="main">
      <div class="title">
        <h3>{{ detailData.title }}</h3>
        <span>{{ detailData.author }}  {{ detailData.create_time | dateformat }}</span>
      </div>
      <div class="content" v-html="detailData.content"></div>
    </div>
    <footers></footers>
  </page>
</template>

<script>
import moment from 'moment'
import Connect from '../../utils/connect'
import page from './component/Page.vue'
import footers from './component/Footer'

export default {
  name: 'List',
  components: {
    page,
    footers
  },
  data () {
    return {
      data: {
        fullname: '秋也'
      },
      detailData: {}
    }
  },
  filters: {
    dateformat (dataStr, pattern = 'MM月DD，YYYY') {
      return moment(dataStr).format(pattern)
    }
  },
  mounted: function () {
    const { id } = this.$route.params
    if (id) {
      this.refreshList(id)
    }
  },
  methods: {
    // 获取列表
    refreshList (id) {
      Connect(20008, {id}, data => {
        if (data.success) {
          this.detailData = data.data
        } else {
          this.$message.error(data.message)
        }
      })
    }
  }
}
</script>

<style scoped>
  .main {
    width: 100%;
    height: auto;
    margin: 0 auto;
    padding: 0 20px;
    box-sizing: border-box;
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
  }
  .content {
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 10px;
  }
  .content >>> pre {
    border: 1px solid #fff;
    border-left: 5px solid rgb(202, 10, 186);
    padding: 10px 15px;
    background-color: #23241f;
    color: #f8f8f2;
    overflow: visible;
    white-space: pre-wrap;
    margin-bottom: 5px;
    margin-top: 5px;
    border-radius: 3px;
  }
</style>
