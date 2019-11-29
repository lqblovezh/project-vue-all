<template lang="pug">
.page-login.ui-user
	v-page(title="短信登录" @back-event="$replaceWithName('login')" user-back)
		.scroll-full.c-bg-f.container.pr
			.panel.flex-tc
				.icon-logo
			form
				InputControl(
					type="phone"
					v-model="phone"
					icon-class="user"
					placeholder="请输入手机号码"
				)

				InputControl(
					type="img-code"
					v-model="imgCode"
					:img-src="picUrl"
					icon-class="envelope"
					placeholder="请输入图片验证码"
					@click-event="getImgCode"
				)

				InputControl(
					type="message-code"
					v-model="code_val"
					icon-class="safe"
					placeholder="请输入短信验证码"
					:btn-txt="btnTxt"
					@click-event="requestPhoneCode"
				)

				button.btn-theme.btn-form.f15(type="submit" @click.prevent="submit_login") 登录
			.flex-bs.c-6.f14.form-line
				a(@click="$replaceWithName('login')") 账号登录
				a(@click="$go('forget-password')") 忘记密码
			.link-register.pa.tc.f14
				a(@click="$replaceWithName('register')") 注册新用户
</template>
<script>
import { mapMutations } from 'vuex'
import { phoneCode } from '@/mixins'
import { SET_USER_INFO } from '@/store/types'
export default {
	mixins: [phoneCode],
	data() {
		return {
			code_val: ''
		}
	},
	methods: {
		...mapMutations('user', {
			setUserInfo: SET_USER_INFO
		}),
		async submit_login() {
			try {
				const {
					data
				} = await this.$services.user.loginByPhone({ code_val: this.code_val, code_id: this.code_id, phone: this.phone})
				console.log(data)
				this.setUserInfo(data)
				this.$back()
				this.$Toast('登录成功')
			} catch(e) {
				this.$catchError(e)
			}
		}
	}
}
</script>
<style lang="stylus"></style>
