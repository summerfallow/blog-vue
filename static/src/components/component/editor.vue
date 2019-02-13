<template>
  <div>
    <quill-editor
      v-model="content"
      ref="editor"
      class="editor"
      :options="editorOption"
      @change="onChange">
      <div id="toolbar" slot="toolbar">
        <el-tooltip class="tooltip" content="加粗" placement="top">
          <button type="button" class="ql-bold"></button>
        </el-tooltip>
        <el-tooltip class="tooltip" content="斜体" placement="top">
          <button type="button" class="ql-italic"></button>
        </el-tooltip>
        <el-tooltip class="tooltip" content="下划线" placement="top">
          <button type="button" class="ql-underline"></button>
        </el-tooltip>
        <el-tooltip class="tooltip" content="删除线" placement="top">
          <button type="button" class="ql-strike"></button>
        </el-tooltip>
        <el-tooltip class="tooltip" content="段落" placement="top">
          <button type="button" class="ql-blockquote"></button>
        </el-tooltip>
        <el-tooltip class="tooltip" content="代码" placement="top">
          <button type="button" class="ql-code-block"></button>
        </el-tooltip>
        <el-tooltip class="tooltip" content="一级标题" placement="top">
          <button type="button" class="ql-header" value="1"></button>
        </el-tooltip>
        <el-tooltip class="tooltip" content="二级标题" placement="top">
          <button type="button" class="ql-header" value="2"></button>
        </el-tooltip>
        <el-tooltip class="tooltip" content="数字列表" placement="top">
          <button type="button" class="ql-list" value="ordered"></button>
        </el-tooltip>
        <el-tooltip class="tooltip" content="普通列表" placement="top">
          <button type="button" class="ql-list" value="bullet"></button>
        </el-tooltip>
        <el-tooltip class="tooltip" content="添加缩进" placement="top">
          <button type="button" class="ql-indent" value="-1"></button>
        </el-tooltip>
        <el-tooltip class="tooltip" content="减少缩进" placement="top">
          <button type="button" class="ql-indent" value="+1"></button>
        </el-tooltip>
        <el-tooltip class="tooltip" content="下标" placement="top">
          <button type="button" class="ql-script" value="sub"></button>
        </el-tooltip>
        <el-tooltip class="tooltip" content="上标" placement="top">
          <button type="button" class="ql-script" value="super"></button>
        </el-tooltip>
        <el-tooltip class="tooltip" content="文字顺序" placement="top">
          <button type="button" class="ql-direction" value="rtl"></button>
        </el-tooltip>
        <el-tooltip class="tooltip" content="字号" placement="top">
          <select class="ql-size">
            <option value="small">小</option>
            <option selected>正常</option>
            <option value="large">大号</option>
            <option value="huge">超大</option>
          </select>
        </el-tooltip>
        <el-tooltip class="tooltip" content="标题" placement="top">
          <select class="ql-header">
            <option value="1">一级标题</option>
            <option value="2">二级标题</option>
            <option value="3">三级标题</option>
            <option value="4">四级标题</option>
            <option value="5">五级标题</option>
            <option value="6">六级标题</option>
            <option selected="selected">正常</option>
          </select>
        </el-tooltip>
        <el-tooltip class="tooltip" content="文字颜色" placement="top">
          <select class="ql-color">
            <option selected="selected"></option>
            <option value="#e60000"></option>
            <option value="#ff9900"></option>
            <option value="#ffff00"></option>
            <option value="#008a00"></option>
            <option value="#0066cc"></option>
            <option value="#9933ff"></option>
            <option value="#ffffff"></option>
            <option value="#facccc"></option>
            <option value="#ffebcc"></option>
            <option value="#ffffcc"></option>
            <option value="#cce8cc"></option>
            <option value="#cce0f5"></option>
            <option value="#ebd6ff"></option>
            <option value="#bbbbbb"></option>
            <option value="#f06666"></option>
            <option value="#ffc266"></option>
            <option value="#ffff66"></option>
            <option value="#66b966"></option>
            <option value="#66a3e0"></option>
            <option value="#c285ff"></option>
            <option value="#888888"></option>
            <option value="#a10000"></option>
            <option value="#b26b00"></option>
            <option value="#b2b200"></option>
            <option value="#006100"></option>
            <option value="#0047b2"></option>
            <option value="#6b24b2"></option>
            <option value="#444444"></option>
            <option value="#5c0000"></option>
            <option value="#663d00"></option>
            <option value="#666600"></option>
            <option value="#003700"></option>
            <option value="#002966"></option>
            <option value="#3d1466"></option>
          </select>
        </el-tooltip>
        <el-tooltip class="tooltip" content="背景颜色" placement="top">
          <select class="ql-background">
            <option value="#000000"></option>
            <option value="#e60000"></option>
            <option value="#ff9900"></option>
            <option value="#ffff00"></option>
            <option value="#008a00"></option>
            <option value="#0066cc"></option>
            <option value="#9933ff"></option>
            <option selected="selected"></option>
            <option value="#facccc"></option>
            <option value="#ffebcc"></option>
            <option value="#ffffcc"></option>
            <option value="#cce8cc"></option>
            <option value="#cce0f5"></option>
            <option value="#ebd6ff"></option>
            <option value="#bbbbbb"></option>
            <option value="#f06666"></option>
            <option value="#ffc266"></option>
            <option value="#ffff66"></option>
            <option value="#66b966"></option>
            <option value="#66a3e0"></option>
            <option value="#c285ff"></option>
            <option value="#888888"></option>
            <option value="#a10000"></option>
            <option value="#b26b00"></option>
            <option value="#b2b200"></option>
            <option value="#006100"></option>
            <option value="#0047b2"></option>
            <option value="#6b24b2"></option>
            <option value="#444444"></option>
            <option value="#5c0000"></option>
            <option value="#663d00"></option>
            <option value="#666600"></option>
            <option value="#003700"></option>
            <option value="#002966"></option>
            <option value="#3d1466"></option>
          </select>
        </el-tooltip>
        <el-tooltip class="tooltip" content="文字对齐" placement="top">
          <select class="ql-align">
            <option selected="selected"></option>
            <option value="center"></option>
            <option value="right"></option>
            <option value="justify"></option>
          </select>
        </el-tooltip>
        <el-tooltip class="tooltip" content="插入链接" placement="top">
          <button type="button" class="ql-link"></button>
        </el-tooltip>
        <el-tooltip class="tooltip" content="插入图片" placement="top">
          <button type="button" @click="imgClick">
            <svg viewBox="0 0 18 18">
              <rect class="ql-stroke" height="10" width="12" x="3" y="4"></rect>
              <circle class="ql-fill" cx="6" cy="7" r="1"></circle>
              <polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"></polyline>
            </svg>
          </button>
        </el-tooltip>
      </div>
    </quill-editor>
  </div>
</template>
<script>
import { quillEditor } from 'vue-quill-editor'
// import Quill from 'quill'
// import { ImageResize } from '@/components/ImageResize.js'
// import { uploadImageUrl } from "@/util"
// Quill.register('modules/imageResize', ImageResize)

export default {
  props: {
    /* 编辑器的内容 */
    value: {
      type: String
    },
    /* 图片大小 */
    maxSize: {
      type: Number,
      default: 4096// kb
    }
  },
  data () {
    return {
      content: '',
      uploadUrl: '/wzq/blog/upload-file.do',
      editorOption: {
        modules: {
          toolbar: '#toolbar'
          // imageResize: {
          //     displaySize: true
          // }
        },
        placeholder: '请输入内容...',
        scrollingContainer: 'div'
      }
    }
  },
  methods: {
    onChange () {
      this.$emit('input', this.content)
    },
    /* 选择上传图片切换 */
    onFileChange (e) {
      var fileInput = e.target
      if (fileInput.files.length === 0) {
        return
      }
      if (fileInput.files[0].size > 1024 * 1024 * this.maxSize) {
        this.$Notice.warning({
          title: '超出文件大小限制',
          desc: '文件 ' + fileInput.files[0].name + ' 太大，不能超过 4M。'
        })
        return
      }
      var self = this
      var data = new FormData()
      data.append('file', fileInput.files[0], fileInput.files[0].name)
      this.editor.focus()
      var xhr = new XMLHttpRequest()
      xhr.open('post', this.uploadUrl)
      xhr.responseType = 'json'
      xhr.send(data)
      xhr.onload = function (e) {
        let res = xhr.response
        if (res.success) {
          self.editor.insertEmbed(self.editor.getSelection().index, 'image', res.data.filePath)
        } else {
          self.$message.error('上传失败')
        }
      }
    },
    /* 点击上传图片按钮 */
    imgClick () {
      /* 创建input file 不裁切，自己控制 */
      var input = document.createElement('input')
      input.type = 'file'
      input.name = this.fileName
      input.accept = 'image/jpeg,image/png,image/jpg,image/gif'
      input.onchange = this.onFileChange.bind(this)
      input.click()
    }
  },
  components: {
    quillEditor
  },
  mounted () {
    this.content = this.value
  },
  computed: {
    editor () {
      return this.$refs.editor.quill
    }
  },
  watch: {
    'value' (newVal, oldVal) {
      if (this.editor) {
        if (newVal !== this.content) {
          this.content = newVal
        }
      }
    }
  }
}
</script>

<style>
  .tooltip{
    width: 20px;
    height: 20px;
    line-height: 22px;
  }

  .editor .ql-container{
    min-height: 300px;
  }
</style>
