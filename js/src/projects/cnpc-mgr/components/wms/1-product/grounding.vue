<script>
import { getList as getClass } from 'services/x-library-pro/implement/mgr/columnSetting'

export default {
  props: {
    currentShelf: Object,
    columnList: Array,
    type: {
      type: String,
      default: 'column',
    },
    optionsType: {
      type: Boolean,
      default: false,
    },
    caseType: {
      type: Boolean,
      default: false,
    }, //是否显示案件类别
  },
  created() {
    this.getTypes()
    console.log(this.currentShelf)
    if (this.caseType) {
      this.getCase()
    }
    if (this.columnList[0]) {
      this.getTypes(this.columnList[0].id)
    }
  },
  data() {
    return {
      flag: true,
      types: {
        list: [],
        value: this.columnList[0] ? this.columnList[0].id : null,
      },
      options: {
        list: [],
        value: this.columnList[1] ? this.columnList[1].id : null,
      },
      cases: {
        list: [],
        value: null,
      },
    }
  },
  methods: {
    submit() {
      if (this.optionsType && !this.options.value) {
        return this.$message.error('请选择二级分类')
      } else if (!this.types.value) {
        return this.$message.error('请选择一级分类')
      }
      this.$emit('upShelf', {
        class_id: this.optionsType ? this.options.value : this.types.value,
        case_id: this.cases.value,
        book_price: this.currentShelf && this.currentShelf.books_price,
      })
    },
    getTypes(pid = 'root', clear) {
      getClass({ type: this.type, pid }).then(res => {
        if (pid != 'root') {
          this.options.list = res.data
          if (clear) {
            this.options.value = null
          }
        } else {
          this.types.list = res.data
        }
      })
    },
    getCase(pid = 'root') {
      getClass({ type: 'case', pid }).then(res => {
        this.cases.list = res.data
      })
    },
    back() {
      this.$emit('back')
    },
  },
  watch: {
    types() {
      if (!this.flag) {
        this.$emit('back')
      }
    },
    'types.value'(newDate, oldDate) {
      this.getTypes(newDate,true)
    },
  },
}
</script>


<template lang="pug">
.div
	el-dialog(
		:center="false"
		:visible.sync="flag"
		v-if="flag"
		:close-on-click-modal="false"
		:before-close="back"
		width="410px"
		title='设置'
	)

		VaForm(v-if="optionsType")
			form#pustSetForm
				.group
					.label 价格：
					input.form-control.info(v-va="{ type:'required' }" v-model="currentShelf.books_price")
		.content
			span(v-text="optionsType?'一级栏目：':'分类'")
			el-select(v-model="types.value")
				el-option(v-for="item in types.list"
				:label="item.name"
				:key="item.id"
				:value="item.id")
		.content(v-if='optionsType')
			span 二级栏目：
			el-select(v-model="options.value")
				el-option(v-for="item in options.list"
				:label="item.name"
				:key="item.id"
				:value="item.id")
		//- .content(v-if="caseType")
		//- 	span 品类维:
		//- 	el-select(v-model="cases.value")
		//- 		el-option(v-for="item in cases.list"
		//- 		:label="item.name"
		//- 		:key="item.id"
		//- 		:value="item.id")
		.content
			el-button(type="primary" plain @click="submit") 确定
</template>


<style lang="stylus" scoped>
.classfiyList
  margin-top 20px
  >>> .el-tree-node
    line-height 40px
  .checkbox
    float right
  .list
    width 100%
.content
  text-align center
  padding 10px
  span
    line-height 40px
    margin-right 15px
    font-size 16px
    color #333
</style>
