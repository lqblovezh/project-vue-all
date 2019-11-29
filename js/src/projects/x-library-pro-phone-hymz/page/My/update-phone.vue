<template lang="pug">
.update-password
	v-page(title="修改手机号")
		.container
			form
				InputControl(
					type="password"
					v-model="pass"
					icon-class="lock"
					placeholder="请输入原密码"
				)

				InputControl(
					type="phone"
					v-model="phone"
					icon-class="phone"
					placeholder="请输入手机号码"
				)

				InputControl(
					type="img-code"
					v-model="imgCode"
					icon-class="lock"
					placeholder="请输入图片验证码"
					:img-src="picUrl"
					@click-event="getImgCode"
				)

				InputControl(
					type="message-code"
					v-model="code"
					icon-class="safe"
					placeholder="请输入短信验证码"
					@click-event="requestPhoneCode"
					:btn-txt="btnTxt"
				)

				a.p-tips(@click="$push('/login/forget-password')") 忘记原密码？

				BaseButton(txt="完成" type="theme" btn-class="comfirm-btn" @click-event="save" large)
		</template>
<script>
import { mapState } from 'vuex'
import Captcha from 'services/common/captcha'
import { phoneCode } from '@/mixins'
export default {
	mixins: [phoneCode],
	data() {
		return {
			pass: '',
			code: ''
		}
	},
	computed: {
		...mapState('user', {
			info: state => state.userInfo
		})
	},
	methods: {
		async save() {
			try {
				await this.sendPhoneRequest()
				await this.$services.user.updatePhone({ code: this.code, pass: this.pass, phone: this.phone })
				this.$set(this.info, 'phone', this.phone)
				this.$back()
				this.$Toast('修改成功')
			} catch(e) {
				this.$catchError(e)
			}
		},
		async sendPhoneRequest() {
			try {
        const { data } = await Captcha.checkCaptcha({
          phone: this.phone,
          code_id: this.code_id,
          code_val: this.code
        })
      } catch (e) {
        this.$catchError(e)
      }
		}
	}
}
</script>
<style lang="stylus">
.comfirm-btn
	margin-top 0.5rem
	height 0.75rem
</style>
