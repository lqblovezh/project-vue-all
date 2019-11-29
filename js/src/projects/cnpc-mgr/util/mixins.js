//共用方法
export const main = {
  data() {
    return {
      tableData: [],
      total: 0,
      page: {
        pageOffset: 10,
        pageNum: 1,
      },
      query: {},
      ids: [],
      dialogVisible: false,
      detailVisible: false,
      detailInfo: {},
      productType: null,
      status: [
        {
          value: '0',
          label: '未上架',
        },
        {
          value: '1',
          label: '已上架',
        },
      ],
    }
  },
  created() {
    this.getList({ ...this.query, ...this.page })
  },
  methods: {
    seareHandeler() {
      //搜索
      this.page.pageNum = 1
      console.log(this.query)
      this.getList({ ...this.query })
    },
    getList(obj) {
      console.log(obj)
      if (this.service) {
        this.service
          .getList({ ...this.parameter, ...this.page, ...this.query, ...obj })
          .then(res => {
            console.log(res.data)
            this.tableData = res.data
            if (res.page) {
              this.total = res.page.total
            }
          })
      }
    },
    //获取选中值 el-table 内置方法
    handleSelectionChange(val) {
      this.ids = val.map(el => {
        return el.id
      })
      this.multipleSelection = val
    },
    update(e, dom) {
      this.$refs[dom].src = URL.createObjectURL(e.target.files[0])
    },
    //获取搜索时间
    getTime(time) {
      if (!time) {
        time = ['', '']
      }
      this.query.time_start = time[0]
      this.query.time_end = time[1]
      this.query.start_time = time[0]
      this.query.end_time = time[1]
    },
    handleSizeChange(val) {
      //处理size变化
      this.page.pageOffset = val
      this.getList({ ...this.page, ...this.query })
    },
    handleCurrentChange(val) {
      //处理页码变化
      this.page.pageNum = val
      this.getList({ ...this.page, ...this.query })
    },
    handleClose() {
      //关闭模态框时初始化form
      //this.$refs.detailDialog.resetFields()
      this.detailVisible = false
      this.dialogVisible = false
    },
    del(ids) {
      if (!ids) {
        if (!this.ids.length) return this.$message.warning('请先选中')
        ids = this.ids
      }
      this.$confirm('你真的要删除该数据吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          console.log(ids)
          this.service.del({ id: ids }).then(
            res => {
              this.getList({ ...this.page, ...this.query })
              this.$message.success('删除成功')
              this.detailVisible = false
            },
            ({ payload, message }) => {
              this.$message.error((payload && payload.message) || message)
            }
          )
        })
        .catch(() => {})
    },
    dels(id) {
      this.$confirm('是否删除？')
        .then(_ => {
          let index =
            this.detailInfo.relation &&
            this.detailInfo.relation.findIndex(item => item.id === id)
          if (index > -1) {
            this.detailInfo.relation.splice(index, 1)
          }
        })
        .catch(_ => {})
    }, //删除或多个单个
    save() {
      console.log(this.detailInfo)
      if (!this.detailInfo) {
        return
      }
      this.service.save({ ...this.detailInfo, ...this.parameter }).then(
        res => {
          if (res.status) {
            this.$message.success('保存成功')
            this.getList(this.query)
            this.dialogVisible = false
            if (this.$refs.child) {
              this.$refs.child.dialogVisible = false
            }
          } else {
            this.$message.error(res.message || '保存失败')
          }
        },
        err => {
          this.$message.error(err.payload.message)
        }
      )
    },
    derivedData() {
      //导出数据
      console.log('daochu')
      this.service.derivedData(this.query).then(res => {
        if (res.data) {
          window.location.href = res.data
        }
      })
    },
    detail(id) {
      if (!id) {
        this.detailInfo = {
          relation: [],
        }
        this.$refs.child.dialogVisible = true
        this.isShowUeditor = true
        return
      }
      this.service.detail({ id }).then(res => {
        this.detailInfo = res.data
        this.isShowUeditor = true
        this.$refs.child.dialogVisible = true
        log(res, 'detail')
      })
    },
    showDetail(id, type) {
      // 查看详情
      this.service.detail({ id }).then(res => {
        this.detailInfo = res.data
        this.productType = type
        this.detailVisible = true
      })
    },
    async previewImg(e, size, key, type) {
      let node = e.target
      let file = node.files[0]
      this.$refs.updateImg.setAttribute('type', 'text')
      this.$refs.updateImg.setAttribute('type', 'file')
      if (file && type) {
        const types = type.split('/')
        if (!types.includes(file.type.split('/')[1])) {
          return this.$message.error(`只能上传${type}格式`)
        }
      }
      if (size) {
        let files = this.$isFileBig(file, size)
        if (!files) return
      }
      const { url, path } = await this.$globalUpdateFile(file, size)
      if (key) {
        this.$set(this.detailInfo, key, path)
        this.$set(this.detailInfo, key + '_src', url)
      } else {
        this.$set(this.detailInfo, 'img', path)
        this.$set(this.detailInfo, 'img_src', url)
      }
    },
    uechange(item, name, val) {
      item[name] = val
    },
    opneDetailDialog(type, id) {
      this.service.detail({ id }).then(res => {
        this.detailInfo = res.data
        this.detailVisible = true
      })
    },
  },
}
