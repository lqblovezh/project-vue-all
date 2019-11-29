import { getTask } from 'services/common'
export default {
	data() { },
	methods: {
		openActionSheet (type) {
			this.actions = type === 'img' ? [{name: '拍照', method: this.takePic}, { name: '相册', method: this.openAlbum}] : [{ name: '请选择', method: this.selectSex}, { name: '男', method: this.selectSex }, { name: '女', method: this.selectSex }]
			this.sheetVisible = true
		},
		takePic() {},
		openAlbum() {
			this.$refs.pic.click()
		},
		selectSex(sex_obj) {
			if (this.info.sex !== sex_obj.name) {
				// this.info.sex = sex_obj.name
				this.$set(this.info, 'sex', sex_obj.name)
			}
		},
		previewImg(evt) {
			let file = evt.target.files[0],
				url = URL.createObjectURL(file)
			this.$set(this.info, 'picture', url)
		},
		async upload() {
			const pic = this.$refs.pic.files[0]
			try {
        if (pic) {
					const { data: { path } } = await getTask(pic)
					return path
        }
      } catch(e) {
        throw new Error('图片更新失败')
      }
		}
	}
}