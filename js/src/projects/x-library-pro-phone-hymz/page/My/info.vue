<template lang="pug">
.second-info
	v-page(title="个人资料")
		.scroll-full.c-bg-main
			.info-list.c-bg-f
				ui-cell(
					label="更改头像"
					is-link
					type="img"
				)
					img(
						:src="info.picture"
						@click="openAlbum"
					)
			.info-list.c-bg-f.info-basic
				ui-cell(
					label="用户名"
					editable
					:value="info.username"
					@change-name="nameChangeHandler"
				)
				ui-cell(
					label="性别"
					:value="info.sex"
					type="sex"
					@click-event="openActionSheet('sex')"
					is-link
				)
				ui-cell(
					label="生日"
					:value="info.birthday|formatDate"
					type="birthday"
					@click-event="$refs.picker.open()"
					is-link
				)
			.ui-info-field.c-bg-f.f14.c-main-font
				p 个人简介
				.info-field
					textarea.bb.f14(
						v-model="info.abs"
						@input="limitCharLen"
						placeholder="请简单描述一下自己吧，最多100字"
					)

			BaseButton(
				txt="完成"
				@click-event="save"
				btn-class="info-btn"
				type="theme" pad="0.3rem"
				large
			)
			input(
				type="file"
				ref="pic"
				@change="previewImg($event)"
				accept="image/*"
			)

			mt-actionsheet(:actions="actions" v-model="sheetVisible")
			mt-datetime-picker(
				ref="picker"
				type="date"
				v-model="info.birthday"
				:startDate="new Date(1970)"
				:end-date="new Date()"
			)
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { imageUpload } from '@/mixins'
import { isEmptyObject, formatDate } from '@/common/js/base'
import { SET_USER_INFO } from '@/store/types'
export default {
	mixins: [imageUpload],
	computed: {
		...mapState('user', {
			userInfo: state => state.userInfo
		})
	},
	data() {
		return {
			maxLen: 100,
			actions: [],
			sheetVisible: false,
			info: {}
		}
	},
	mounted() {
		this.info = JSON.parse(JSON.stringify(this.userInfo))
	},
	methods: {
		...mapMutations('user', {
			setUser: SET_USER_INFO
		}),
		...mapActions('user', ['isUserLogin']),
		nameChangeHandler(name) {
			this.$set(this.info, 'username', name)
		},
		limitCharLen() {
			this.info.abs = this.info.abs.substr(0, this.maxLen)
		},
		infoDiff() {
			const attrs = ['username', 'sex', 'abs']
			let temp = {}, birth = formatDate(this.info.birthday)
			if (birth !== this.userInfo.birthday) {
				temp.birthday = birth
			}
			for (let attr of attrs) {
				if (this.info[attr] !== this.userInfo[attr]) {
					temp[attr] = this.info[attr]
				}
			}
			return temp
		},
		async save() {
			const form = this.infoDiff()
			let path = await this.upload()
			if (path) {
				form.picture = path
			}
			if(!isEmptyObject(form)) {
				try {
					const { data } = await this.$services.user.modifyUserInfo({ ...form, id: this.userInfo.id })
					this.setUser(data)
					this.$Toast({
						message: '修改成功'
					})
					// await this.isUserLogin()
				} catch(e) {
					this.$Toast({
						message: e.toString()
					})
				}
			}
		},
	},
	filters: {
		formatDate(date) {
			return formatDate(date)
		}
	}
}
</script>
<style lang="stylus">
.second-info
	.info-btn
		height 0.8rem
		font-size 15px
	.scroll-full
		.info-list
			margin-bottom 0.2rem
			font-size 14px
			&:first-child
				.ui-cell
					padding 0.2rem 0.3rem
		.info-basic
			>.ui-cell
				height 1rem
				&:not(:last-child)
					>div
						border-bottom 1px solid #ebf2f1
	input[type='file']
		display none
	.ui-info-field
		padding 0.3rem
		margin-bottom 0.5rem
		>p
			line-height 0.38rem
			margin-bottom 0.2rem
		.info-field
			position relative
			textarea
				height 2rem
				width 100%
				color #a3a3a3
				border none
				outline none
				line-height 1.5
			.count
				position absolute
				bottom 0.2rem
				right 0.2rem
</style>
