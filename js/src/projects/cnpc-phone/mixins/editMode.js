import { mapState, mapMutations } from 'vuex'
import { TOGGLE_EDIT_MODE } from '@/store/types'
export default {
	computed: {
		...mapState({
			isEditMode: state => state.editMode
		})
	},
	methods: {
		...mapMutations([TOGGLE_EDIT_MODE]),
		toggleEditMode() {
      if (this.isEditMode) {
        this.changeListStatus(false)
      }
      this.TOGGLE_EDIT_MODE(!this.isEditMode)
    },
    changeListStatus(status) {
      this.list.forEach(item => {
        this.$set(item, 'checked', status)
      })
    },
    toggleItemSelectedStatus(item) {
      this.$set(item, 'checked', !item.checked)
    },
    selectAll() {
      this.changeListStatus(true)
    },
	},
	beforeDestroy(){
		this.TOGGLE_EDIT_MODE(false)
	}
}
