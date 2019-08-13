<template>
  <page>
    <div class="main-box">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="form.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="类别">
          <el-select v-model="form.type" placeholder="请选择类别">
            <el-option
              v-for="item in options"
              :key="item.type"
              :label="item.type"
              :value="item.type">
            </el-option>
          </el-select>
          <el-button type="primary" icon="el-icon-plus" @click="dialogVisible = true">添加</el-button>
        </el-form-item>
        <el-form-item label="内容">
          <editor @input="getContent" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog
      title="添加类别"
      :visible.sync="dialogVisible"
      width="400px">
      <el-form ref="typeForm" :model="typeForm" label-width="80px">
        <el-form-item label="类别名称">
          <el-input v-model="typeForm.name" placeholder="请输入类别名称"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddType">确 定</el-button>
      </span>
    </el-dialog>
  </page>
</template>

<script>
import Connect from '../../utils/connect'
import editor from './component/editor.vue'
import page from './component/Page.vue'
import User from '../store/user'

export default {
  name: 'List',
  components: {
    editor,
    page
  },
  data () {
    return {
      data: {
        fullname: '秋也'
      },
      options: [],
      form: {
        title: '',
        type: '',
        content: ''
      },
      typeForm: {
        name: ''
      },
      dialogVisible: false
    }
  },
  mounted: function () {
    const info = User.getInfo()
    const { form } = this
    form['author'] = info.nick
    form['authorId'] = info.id
    this.getTypeList()
  },
  methods: {
    loginout () {
      Connect.getApi(10002, {}, {}, data => {
        console.log(data, 2222)
      }, error => {
        console.log(error, 1111)
      })
    },
    onSubmit () {
      const data = this.form
      if (!data.title) {
        this.$message.warning('标题不能为空！')
        return false
      } else if (!data.type) {
        this.$message.warning('类别不能为空！')
        return false
      }
      Connect.getApi(20001, data, {}, data => {
        this.$message.success(data.message)
      }, error => {
        console.log(error)
      })
    },
    handleAddType () {
      if (this.typeForm.name) {
        const data = {
          type: this.typeForm.name
        }
        Connect.getApi(20003, data, {}, data => {
          this.$message.success(data.message)
          this.dialogVisible = false
          this.typeForm = { name: '' }
          this.getTypeList()
        }, error => {
          this.$message.error(error.message)
        })
      } else {
        this.$message.warning('请输入类别名称！')
      }
    },
    getTypeList () {
      Connect.getApi(20004, {}, {}, data => {
        this.options = data.data
      }, error => {
        console.log(error)
      })
    },
    getContent (e) {
      const { form } = this
      form['content'] = e
    }
  }
}
</script>

<style scoped>
.header{
  background-image: url('../assets/header_bg.jpg');
  background-size: cover;
  height: 200px !important;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.header img{
  width: 80px;
  height: 80px;
  border-radius: 40px;
  cursor: pointer;
}
.header img:hover{
  box-shadow: 0 0 30px 0 #fff;
}
.header span{
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
}

.main{
  display: flex;
  justify-content: center;
}

.main-box{
  width: 700px;
}
</style>
