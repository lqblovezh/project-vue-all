import Order from '../../mgr/Order'
/**
 * 获取订单列表
 * @param {Object} data
 * @param {String} data.name - 选填字段 订单名称
 * @param {String} data.pageNum - 页数
 * @param {String} data.pageOffset - 分页条数
 */
export async function getList(data = {}) {
  return Order.getList(data).then(res => {
    const data = res.data.map(el => {
      return {
        id: el.id,
        nick_name: el.nick_name,
        order: el.order_number,
        phone: el.phone,
        money: el.pay_price,
        pay_type: el.pay_type,
        from: el.source,
        order_type: el.is_pay,
        create_time: el.create_time,
      }
    })
    return {
      data,
      page: res.page,
    }
  })
}

/**
 * 删除订单
 * @param {Array} data.id - 必有 订单id
 */
export async function del(data) {
  // 不支持该功能   订单不能删除
  return Order.del({ id: data.id[0] })
}

/**
 * 获取订单详情
 * @param {String} data.id - 必有 订单id
 */
export async function detail(data) {
  const marks = await Order.getMarksInfo({ order_id: data.id })
  const operationInfo = marks.data.map(el => {
    return {
      id: el.id,
      name: el.user_name,
      create_time: el.create_time,
      order_type: el.is_pay,
      abs: el.content,
    }
  })
  return Order.detail(data).then(res => {
    const obj = res.data
    if (obj.is_pay == '订单已关闭') {
      obj.is_pay = '已关闭'
    } else if (obj.is_pay == '等待支付') {
      obj.is_pay = '待支付'
    } else if (obj.is_pay == '订单已关闭') {
      obj.is_pay = '已关闭'
    }
    return {
      data: {
        id: obj.id,
        order_type: obj.is_pay,
        orderInfo: [
          {
            id: obj.id,
            phone: obj.phone,
            money: obj.pay_price,
            from: obj.from,
            nick_name: obj.nick_name,
            order_type: obj.is_pay,
            price: obj.pay_price,
            pay_type: obj.pay_type,
            order: obj.order_number,
            create_time: obj.create_time,
            pay_time: obj.pay_time,
            close_time: obj.close_time,
          },
        ],
        googsInfo: [
          {
            id: obj.id,
            time: obj.day,
            name: obj.goods_name,
            price: obj.pay_price,
            abs: obj.remarks,
          },
        ],
        operationInfo,
      },
    }
  })
}

/**
 * 导出订单
 * @param {String} data.id - 必有 订单id
 */
export async function derivedData(data) {
  return Order.educe(data)
}

/**
 * 关闭订单
 * @param {String} data.id - 必有 订单id
 * @param {String} data.message - 必有 理由
 */
export async function close(data) {
  return Order.close({
    order_id: data.id,
  }).then(res => {
    remarks(data)
    return res
  })
}

/**
 * 备注订单
 * @param {String} data.id - 必有 订单id
 * @param {String} data.message - 必有 理由
 */
export async function remarks(data) {
  const obj = {}
  obj.order_id = data.id
  obj.content = data.message
  return Order.addMarks(obj)
}
