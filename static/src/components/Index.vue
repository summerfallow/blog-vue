<template>
  <page>
    <div class="main-box">
      <el-button @click="handleVisible">创建博文</el-button>
      <el-table
        :data="tableData.data"
        style="width: 100%">
        <el-table-column
          prop="title"
          label="主题">
        </el-table-column>
        <el-table-column
          prop="typeName"
          label="类型">
        </el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">
            <div>{{ scope.row.create_time | dateformat }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="author"
          label="作者">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row.id)" type="primary" icon="el-icon-edit" circle></el-button>
            <el-button @click="handleRemove(scope.row.id)" type="danger" icon="el-icon-delete" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        layout="prev, pager, next"
        @current-change="paginationChange"
        :current-page="tableData.current"
        :total="tableData.total">
      </el-pagination>
    </div>
    <el-dialog
      title="添加博文"
      @close="resetForm('form')"
      :visible.sync="visible"
      width="800px">
      <el-form :model="form" ref="form" label-width="80px">
        <el-input v-model="form.id" type="hidden"></el-input>
        <el-form-item label="标题">
          <el-input v-model="form.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="类别">
          <el-select v-model="form.type" placeholder="请选择类别">
            <el-option
              v-for="item in options"
              :key="item.type"
              :label="item.type"
              :value="item.id">
            </el-option>
          </el-select>
          <el-button type="primary" icon="el-icon-plus" @click="handleTypeVisible">添加</el-button>
        </el-form-item>
        <el-form-item label="内容">
          <editor :value="form.content" @input="getContent" />
        </el-form-item>
        <el-form-item>
          <el-button @click="handleVisible">取 消</el-button>
          <el-button type="primary" @click="onSubmit('form')">保 存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      title="添加类别"
      @close="resetForm('typeForm')"
      :visible.sync="typeVisible"
      width="400px">
      <el-form :model="typeForm" ref="typeForm" label-width="80px">
        <el-form-item label="类别名称">
          <el-input v-model="typeForm.name" placeholder="请输入类别名称"></el-input>
        </el-form-item>
      </el-form>
      <el-tag
        class="tags"
        v-for="tag in options"
        @close="handleRemoveType(tag.id)"
        :key="tag.id"
        closable>
        {{tag.type}}
      </el-tag>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleTypeVisible">取 消</el-button>
        <el-button type="primary" @click="handleAddType">确 定</el-button>
      </span>
    </el-dialog>
  </page>
</template>

<script>
import moment from 'moment'
import Connect from '../../utils/connect'
import editor from './component/editor.vue'
import page from './component/Page.vue'
import User from '../store/user'

export default {
  name: 'Index',
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
        id: '',
        title: '',
        type: '',
        content: ''
      },
      typeForm: {
        name: ''
      },
      visible: false,
      typeVisible: false,
      setContent: null,
      tableData: {
        current: 1,
        total: 0,
        data: []
      }
    }
  },
  filters: {
    dateformat (dataStr, pattern = 'YYYY.MM.DD HH:mm:ss') {
      return moment(dataStr).format(pattern)
    }
  },
  created: function () {
    this.refreshList()
  },
  mounted: function () {
    const info = User.getInfo()
    const { form } = this
    form['author'] = info.nick
    form['authorId'] = info.id
    this.getTypeList()
  },
  methods: {
    // 获取列表
    refreshList (current = 1) {
      const { tableData } = this
      Connect(20005, {current}, data => {
        if (data.success) {
          tableData['data'] = data.data
          tableData['current'] = Number(data.current)
          tableData['total'] = Number(data.total)
        } else {
          this.$message.error(data.message)
        }
      })
    },
    // 添加文章弹窗
    handleVisible () {
      if (this.visible) {
        this.resetForm('form')
      }
      this.visible = !this.visible
    },
    // 添加类型弹窗
    handleTypeVisible () {
      if (this.typeVisible) {
        this.resetForm('typeForm')
      }
      this.typeVisible = !this.typeVisible
    },
    // 添加文章
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          console.log('error submit!!')
          return false
        }
        const data = this.form
        Connect(data.id ? 20007 : 20001, data, data => {
          if (data.success) {
            this.$message.success(data.message)
            this.refreshList()
            this.handleVisible()
          } else {
            this.$message.error(data.message)
          }
        })
      })
    },
    // 删除文章
    handleRemove (id) {
      this.$confirm('是否删除文章?', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        Connect(20006, {id}, data => {
          if (data.success) {
            this.$message.success(data.message)
            this.refreshList()
          } else {
            this.$message.error(data.message)
          }
        })
      }).catch(() => {})
    },
    // 添加类型
    handleAddType () {
      if (this.typeForm.name) {
        const data = {
          type: this.typeForm.name
        }
        Connect(20003, data, data => {
          if (data.success) {
            this.$message.success(data.message)
            this.dialogVisible = false
            this.typeForm = { name: '' }
            this.getTypeList()
          } else {
            this.$message.error(data.message)
          }
        })
      } else {
        this.$message.warning('请输入类别名称！')
      }
    },
    // 获取类型列表
    getTypeList () {
      Connect(20004, null, data => {
        if (data.success) {
          this.options = data.data
        } else {
          this.$message.error(data.message)
        }
      })
    },
    // 修改文章
    handleEdit (id) {
      Connect(20008, {id}, e => {
        if (e.success) {
          const { data } = e
          this.form.id = data.id
          this.form.title = data.title
          this.form.type = data.type
          this.form.content = data.content
          this.handleVisible()
        } else {
          this.$message.error(e.message)
        }
      })
    },
    resetForm (formName) {
      const { form, typeForm } = this
      if (formName === 'form') {
        form['id'] = ''
        form['title'] = ''
        form['content'] = ''
        form['type'] = ''
      } else {
        typeForm['name'] = ''
      }
      // this.$refs[formName].resetFields()
    },
    // 删除文章类型
    handleRemoveType (id) {
      console.log(id)
      this.$confirm('是否删除此类型?', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        Connect(20009, {id}, data => {
          if (data.success) {
            this.$message.success(data.message)
            this.getTypeList()
          } else {
            this.$message.error(data.message)
          }
        })
      }).catch(() => {})
    },
    getContent (e) {
      const { form } = this
      form['content'] = e
    },
    // 翻页回调
    paginationChange (e) {
      this.refreshList(e)
    }
  }
}
</script>

<style scoped>
.main-box{
  width: 100%;
}

.tags {
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
