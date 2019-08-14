<template>
  <page>
    <div class="main">
      <span class="title">标签</span>
      <el-tag
        class="tags"
        v-for="item in options"
        :key="item.id">
        <span @click="handleClick(item)">{{ item.type }}({{ item.num || 0 }})</span>
      </el-tag>
    </div>
  </page>
</template>

<script>
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
      options: []
    }
  },
  mounted: function () {
    this.refreshList()
  },
  methods: {
    // 获取列表
    refreshList (id) {
      Connect(20004, null, data => {
        if (data.success) {
          this.options = data.data
        } else {
          this.$message.error(data.message)
        }
      })
    },
    handleClick (item) {
      this.$router.push({ path: `/tags/${item.type}`, query: { id: item.id } })
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
  .tags {
    margin-right: 10px;
    cursor: pointer;
  }
</style>
