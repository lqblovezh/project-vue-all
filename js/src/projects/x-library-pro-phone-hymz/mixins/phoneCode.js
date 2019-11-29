import Captcha from 'services/common/captcha'
export default {
  data() {
    return {
      phone: '',
      // 图片验证码地址
      picUrl: '',
      // 图片验证码值
      imgCode: '',
      // 图片验证码id
      imgCodeId: '',
      btnTxt: '发送验证码',
      totalTime: 60,
      canClick: true,
      code_id: ''
    }
  },
  mounted() {
    this.getImgCode()
  },
  methods: {
    /**
     * 获取图像验证码
     */
    async getImgCode() {
      try {
        const { data: { picture, code_img, code_id } } = await this.$services.user.getImageCard()
        this.picUrl = picture || code_img
        this.imgCodeId = code_id
      } catch(e) {}
    },

    async sendRegCode() {
      try {
        const {
          data: {
            code_id
          }
        } = await this.$services.user.sendPhoneCaptcha({
          phone: this.phone,
          code_id_img: this.imgCodeId,
          code_val_img: this.imgCode
        })
        this.countDown()
        this.code_id = code_id
        this.$Toast('发送成功，请在手机上查看！')
      } catch (e) {
        this.$catchError(e)
      }
    },
    /**
     * 点击发送手机验证码
     */
    async requestPhoneCode() {
      try {
        if (this.phone === '') {
          throw new Error('请填入手机号码')
        }
        if (!/^(13[0-9]|147|15[0-3]|15[5-9]|18[0256789])\d{8}$/.test(this.phone)) {
          throw new Error('请输入正确格式的手机号码')
        }
        if (this.imgCode === '') {
          throw new Error('请填入图像验证码')
        }
        const { data: { code_id } } = await Captcha.phoneCaptcha({
          phone: this.phone,
          not_check_user_exist: 1,
          code_id_img: this.imgCodeId,
          code_val_img: this.imgCode
        })
        this.countDown()
        this.code_id = code_id
        this.$Toast('发送成功，请在手机上查看！')
      } catch (e) {
        this.$catchError(e)
      }
    },
    countDown () {
      if (!this.canClick) return  //改动的是这两行代码
      this.canClick = false
      this.btnTxt = this.totalTime + 's后重新发送'
      let clock = window.setInterval(() => {
        this.totalTime--
        this.btnTxt = this.totalTime + 's后重新发送'
        if (this.totalTime < 0) {
          window.clearInterval(clock)
          this.btnTxt = '重新发送验证码'
          this.totalTime = 60
          this.canClick = true  //这里重新开启
        }
      },1000)
    }
  }
}
