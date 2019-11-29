<template lang="pug">
.page-register.ui-user
	v-page(title="用户注册" @back-event="$replaceWithName('login')" user-back)
		.scroll-full.c-bg-f.container.pr
			.panel.flex-tc
				.icon-logo
			form
				InputControl(type="text" v-if="!env_ctx" v-model="form.name" icon-class="user" placeholder="请输入用户名" )
				InputControl(type="phone" v-model="phone" icon-class="phone" placeholder="请输入手机号码" )
				InputControl(type="img-code" icon-class="envelope" :img-src="picUrl" v-model="imgCode" placeholder="请输入图片验证码" @click-event="getImgCode")
				InputControl(type="message-code" v-model="form.code_val" icon-class="safe" placeholder="请输入短信验证码" @click-event="sendRegCode" :btn-txt="btnTxt")
				InputControl(type="password" v-model="form.pass" icon-class="lock" placeholder="请输入登陆密码" )
				.form-tips.flex-ac.c-6(@click="isSelected = !isSelected")
					.icon(:class="[isSelected ? 'icon-checkbox-active' : 'icon-checkbox']")
					|我已阅读并同意
					span.c-theme 《用户服务协议》
				button.btn-form.c-f.f15(type="submit" @click.prevent="submit_login" :class="[isSelected?'btn-theme':'btn-register']") 注册
</template>
<script>
import { phoneCode } from '@/mixins'
const { ec } = __PROJECT_INFO__
export default {
	mixins: [phoneCode],
	data() {
		return {
			isSelected: false,
			// 图片验证码地址
			form: {
				name: '',
				pass: '',
				code_val: '',
      },
      env_ctx: ec
		}
	},
	methods: {
		async submit_login() {
			if (!this.isSelected) {
				return
			}
			try {
				await this.$services.user.register({...this.form, code_id: this.imgCodeId, phone: this.phone })
				this.$Toast('注册成功')
				this.$replaceWithName('login')
			} catch(e) {
				this.$catchError(e)
			}
		}
	}
}
</script>
<style lang="stylus">
.page-register
	form
		.form-tips
			margin-top 0.4rem
			padding-left 0.24rem
			> .icon
				margin-right 0.1rem
.btn-register
	background-color #48b1a2
</style>
