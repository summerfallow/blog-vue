<template>
  <page>
    <div class="main">
      <span class="title">归档</span>
      <div>
        <div v-for="(item, i) in listData" :key="i">
          <div v-for="(repo, j) in item.month" :key="j">
            <h3 class="contentTitle" v-if="repo.length">{{ repo[0].create_time | dateformat('YYYY年MM月') }}({{ repo.length }})</h3>
            <ul class="listBox" v-for="(list, k) in repo" :key="k">
              <li>
                <a @click="handleClick(`/detail/${list.id}`)">{{ list.title }}</a>
                <span>{{ list.create_time | dateformat('YYYY-MM-DD') }}</span>
              </li>
            </ul>
          </div>
        </div>
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
      listData: []
    }
  },
  filters: {
    dateformat (dataStr, pattern = 'YYYY.MM.DD HH:mm:ss') {
      return moment(dataStr).format(pattern)
    }
  },
  mounted: function () {
    Connect(20011, null, data => {
      if (data.success) {
        this.refreshList(data.data)
      } else {
        this.$message.error(data.message)
      }
    })
  },
  methods: {
    // 获取列表
    refreshList (event) {
      Connect(20010, null, e => {
        if (e.success) {
          const { data } = e
          const yearData = []
          event.map((item) => {
            const monthData = []
            data.map((repo) => {
              if (item.year === Number(moment(repo.create_time).format('YYYY'))) {
                monthData.push(repo)
              }
            })
            yearData.push(monthData)
          })
          this.handleMonth(yearData)
        } else {
          this.$message.error(e.message)
        }
      })
    },
    handleMonth (event) {
      const data = []
      event.map((item, j) => {
        const year = moment(item[0].create_time).format('YYYY')
        const month = [[], [], [], [], [], [], [], [], [], [], [], []]
        month.map((repo, i) => {
          item.map((list, k) => {
            if (Number(moment(list.create_time).format('M')) === i + 1) {
              month[i].push(list)
            }
          })
        })
        data.push({ month: month.reverse(), year })
      })
      const arr = data.reverse()
      this.listData = arr
    },
    handleClick: function (url) {
      this.$router.push({ path: url })
    }
  }
}
</script>

<style scoped>
  .main {
    width: 100%;
    height: auto;
    margin: 0 auto;
    padding: 0 30px;
    box-sizing: border-box;
  }
  .title {
    display: block;
    color: #333;
    font-size: 24px;
    font-weight: 400;
    line-height: 35px;
    margin-bottom: 15px;
  }
  .contentTitle {
    color: #666;
  }
  .listBox li a {
    cursor: pointer;
    color: #2479CC;
    text-decoration: none;
    font-weight: 500;
    font-size: 16px;
  }
  .listBox li span {
    color: #999;
    font-size: 14px;
    font-style: italic;
  }
</style>
