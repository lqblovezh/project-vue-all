<template lang="pug">
.update-password
	v-page(title="修改密码")
		.container
			form
				ui-field(label="原密码" placeholder="填写原密码" type="password" v-model="form.pwd.val")
				ui-field(label="新密码" placeholder="填写新密码" type="password" v-model="form.new_pwd.val")
				ui-field(label="确认密码" placeholder="再次填写确认" type="password" v-model="form.comfirm_pwd.val")
				a.p-tips(@click="$push('/login/forget-password')") 忘记原密码？
				BaseButton(txt="完成" type="theme" btn-class="comfirm-btn" @click-event="save" large)
</template>
<script>
import validate from '@/common/js/validate'
export default {
	data() {
		return {
			form: {
				pwd: {
					val: '',
					name: '原密码',
					type: 'password'
				},
				new_pwd: {
					val: '',
					name: '新密码',
					type: 'password'
				},
				comfirm_pwd: {
					val: '',
					name: '确认密码',
					type: 'password',
				}
			}
		}
	},
	methods: {
		async save(evt) {
			const form = this.form
			const [old_pass, new_pass, comfirm_pass] = [form.pwd.val, form.new_pwd.val, form.comfirm_pwd.val]
			try {
				await this.$services.user.updatePasswordDefault({old_pass, new_pass, comfirm_pass})
				this.$Toast('修改密码成功')
				this.$back()
			} catch(e) {
				this.$catchError(e)
			}
		},
		checkForm(form) {
			const errors = validate(form)
			if (form.pwd.val === form.new_pwd.val) {
				errors.push(new Error('新密码不允许与旧密码一致'))
			}
			if (form.new_pwd.val !== form.comfirm_pwd.val) {
				errors.push(new Error('请确认新密码是否一致！'))
			}
			if (errors.length) {
				this.$Toast({
					message: errors[0].split(': ')[1]
				})
				return false
			}
			return true
		}
	}
}
</script>
<style lang="stylus">
.comfirm-btn
	margin-top 0.5rem
	height 0.75rem
</style>
