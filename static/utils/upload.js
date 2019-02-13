const uploadFile = {
  init: function (type, maxSize, url) {
    /* 创建input file 不裁切，自己控制 */
    const input = document.createElement('input')
    input.type = 'file'
    input.name = this.fileName
    input.accept = type
    input.onchange = this.onFileChange.bind(this, maxSize, url)
    input.click()
  },
  onFileChange: function (e, maxSize = 6096, url) {
    var fileInput = e.target
    if (fileInput.files.length === 0) {
      return
    }
    if (fileInput.files[0].size > 1024 * 1024 * maxSize) {
      this.$message.warning(`超出文件大小限制 文件${fileInput.files[0].name}太大，不能超过 4M。`)
      return
    }
    var self = this
    var data = new FormData()
    data.append('file', fileInput.files[0], fileInput.files[0].name)
    this.editor.focus()
    var xhr = new XMLHttpRequest()
    xhr.open('post', url)
    xhr.responseType = 'json'
    xhr.send(data)
    xhr.onload = function (e) {
      let res = xhr.response
      if (typeof res === 'string') {
        res = JSON.parse(res)
      }
      if (res.code === 200) {
        self.editor.insertEmbed(self.editor.getSelection().index, 'image', res.data)
      } else {
        self.$message.error('上传失败')
      }
    }
  }
}

export default uploadFile
