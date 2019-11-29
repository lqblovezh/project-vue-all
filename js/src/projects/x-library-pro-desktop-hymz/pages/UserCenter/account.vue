<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  data() {
    return {
      rules: {
        username: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'change',
          },
        ],
        birthday: [
          {
            type: 'string',
            required: true,
            message: '请选择日期',
            trigger: 'change',
          },
        ],
        sex: [
          {
            required: true,
            message: '请至少选择一个性别',
            trigger: 'change',
          },
        ],
        abs: [
          { required: true, message: '请填写个人简介', trigger: 'blur' },
          {
            min: 1,
            max: 100,
            message: '长度在 1 到 100 个字符',
            trigger: 'change',
          },
        ],
      },
      detailInfo: {},
    }
  },
  methods: {
    submitForm() {
      this.$refs.detailInfo.validate(valid => {
        if (valid) {
          this.$services.user
            .modifyUserInfo(this.detailInfo)
            .then(res => {
              this.setUserInfo(res.data)
              this.$message.success('保存成功')
            })
            .catch(({ payload, message }) => {
              this.$message.error(message || payload.message)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async previewImg(e, size, key, type) {
      let node = e.target
      let file = node.files[0]
      this.$refs.updateImg.setAttribute('type', 'text')
      this.$refs.updateImg.setAttribute('type', 'file')
      if (file && type) {
        const types = type.split('/')
        if (!types.includes(file.type.split('/')[1])) {
          return this.$message.error(`只能上传${type}格式`)
        }
      }
      if (size) {
        let files = this.$isFileBig(file, size)
        if (!files) return
      }
      const { url, path } = await this.$globalUpdateFile(file, size)
      this.$set(this.detailInfo, 'img', path)
      this.$set(this.detailInfo, 'picture', url)
    },
    ...mapMutations('user', {
      setUserInfo: 'SET_USER_INFO',
    }),
  },
  computed: {
    setBaseUrl() {
      return staticUrl + 'images/avatar.png'
    },
    ...mapGetters('user', ['userInfo']),
  },
  watch: {
    userInfo: {
      handler() {
        this.detailInfo = JSON.parse(JSON.stringify(this.userInfo))
      },
      immediate: true,
    },
  },
}
</script>

<template lang="pug">
.rightBox
  UserTitlePanel(name="账户设置" :icon="false")
  .img-box
    img(:src="detailInfo.picture||setBaseUrl")
    el-button(type="warning" size="mini" @click="$refs.updateImg.click()" plain) 修改
    span.tips 只能上传jpg/png/jpeg格式文件，文件不能超过500kb，图片尺寸需大于200*200。
    input.hide(type="file" @change="previewImg($event,500,null,'jpg/png/jpeg')" ref="updateImg" accept="image/jpeg,image/jpg,image/png")
  .info
    el-form(:model="detailInfo" :rules="rules" ref="detailInfo" label-width="100px" class="demo-detailInfo")
      el-form-item(label="用户昵称" prop="username")
        el-input(v-model="detailInfo.username")
      el-form-item(label="生日" required)
        el-col(:span="11")
          el-form-item(prop="birthday")
            el-date-picker(type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="detailInfo.birthday" style="width: 100%;")
      el-form-item(label="性别" prop="sex")
        el-radio-group(v-model="detailInfo.sex")
          el-radio(label="男")
          el-radio(label="女")
      el-form-item(label="个人简介" prop="abs")
        el-input(type="textarea" v-model="detailInfo.abs" placeholder="可以简单描述一下自己……" maxlength="100" show-word-limit)
      el-form-item
        el-button(type="theme" @click="submitForm" ) 保存
</template>

<style lang="stylus" scoped>
.img-box
  padding 20px
  margin-bottom 20px
  border-bottom 1px solid #e9e2d1
  .tips
    font-size 12px
    letter-spacing 0px
    color #c2c2c2
    margin-left 20px
  .hide
    display none
  img
    width 96px
    height 96px
    border-radius 50%
    background-color #f1f0bd
.info
  .el-input
    width 200px
  .el-textarea
    width 520px
    height 140px
  >>> textarea
    width 100%
    height 100%
    resize none
</style>
