<template lang="pug">
.page-login.ui-user
	v-page(title="忘记密码" @back-event="$router.go(-1)" user-back)
		.scroll-full.c-bg-f.container.pr
			.panel.flex-tc
				.icon-logo
			form
				InputControl(type="text" v-model="phone" icon-class="user" placeholder="请输入手机号码" )
				InputControl(type="img-code" icon-class="envelope" :img-src="picUrl" v-model="imgCode" placeholder="请输入图片验证码" @click-event="getImgCode")
				InputControl(type="message-code" v-model="form.code_val" icon-class="safe" placeholder="请输入短信验证码" :btn-txt="btnTxt" @click-event="sendPhoneCode" )
				InputControl(type="password" v-model="form.pass" icon-class="lock" placeholder="请输入新密码" )
				button.btn-theme.btn-form.f15(type="submit" @click.prevent="submit_login") 登录
</template>
<script>
import { phoneCode } from '@/mixins'
export default {
	mixins: [phoneCode],
	data() {
		return {
			form: {
				code_val: '',
				pass: '',
				user_id: ''
			}
		}
	},
	methods: {
		async submit_login() {
			try {
				await this.$services.user.forgetPwd({ ...this.form, phone: this.phone })
				this.$Toast('修改成功')
				this.$back()
			} catch(e) {
				this.$catchError(e)
			}
		},
		async sendPhoneCode() {
			try {
				if (this.phone === '') {
          throw new Error('请填入手机号码')
        }
        if (this.imgCode === '') {
          throw new Error('请填入图像验证码')
        }
				const { data: { user_id }} = await this.$services.user.getResetCode({ phone: this.phone, code_id: this.imgCodeId, code_val: this.imgCode })
				this.countDown()
				this.form.user_id = user_id
				this.$Toast('发送成功，请在手机上查看！')
			} catch (e) {
        this.$catchError(e)
      }
		}
	}
}
</script>
<style lang="stylus">
.page-login
	form
		.btn-form
			margin-top 1.26rem
</style>
