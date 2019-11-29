const Joi = require('joi')
import { usernameErrorFn, phoneErrorFn, passwordErrorFn } from './errorHandleFn'

const strNoEmpty = Joi.string().min(1)
const email = Joi.string().email()
const username = Joi.string().alphanum().min(1).max(16).required().error(usernameErrorFn)
const password = Joi.string().required().regex(/^[a-zA-Z0-9]{6,16}$/).error(passwordErrorFn)
const phone = Joi.string().required().regex(/^1[34578]\d{9}$/).error(phoneErrorFn)
const delID= Joi.array().min(1).error(new Error('id 必须为不为空数组'))
const dateNoEmpty = Joi.string().required().error(new Error('日期格式不对'))
const pass_confirm = Joi.any().valid(Joi.ref('pass')).error(new Error('两次密码不相同'))
const code_id = strNoEmpty.error(new Error('未获取到短信验证码'))
const code_val = strNoEmpty.error(new Error('未获取到验证码值'))
const code_val_img = strNoEmpty.error(new Error('未获取到图片验证码'))


export const loginRules = Joi.object().keys({
	user_name: strNoEmpty.error(new Error('用户名不能为空')),
	user_pass: password,
})
export const loginEcRules = Joi.object().keys({
	user_name: strNoEmpty.error(new Error('用户名不能为空')),
	user_pass: password,
	code_val_img: [Joi.string()],
	code_id_img: [Joi.string()],
})
export const registerRules = Joi.object().keys({
  name: Joi.string(),
	phone,
	code_val_img,
	code_id,
	code_val,
	pass: password,
	pass_confirm
})
export const registerEcRules = Joi.object().keys({
	phone,
	code_val_img,
	code_id,
	code_val,
	pass: password,
	pass_confirm
})
export const modifyPassRules = Joi.object().keys({
	old_pass: password,
	new_pass:strNoEmpty.error(new Error('newPass不能为空')),
	new_pass_confirm:Joi.any().valid(Joi.ref('new_pass')).error(new Error('两次密码不相同')),
})
export const resetPassQueryRules = Joi.object().keys({
	user_id:strNoEmpty.error(new Error('user_id不能为空')),
	code_val:strNoEmpty.error(new Error('code_val不能为空')),
	pass:strNoEmpty.error(new Error('密码不能为空')),
	pass_confirm:Joi.any().valid(Joi.ref('pass')).error(new Error('两次密码不相同')),
})

export const getResetCodeRules = Joi.object().keys({
	phone,
	code_id,
	code_val,
})

export const shareRules = Joi.object().keys({
		book_id:strNoEmpty.error(new Error('book_id不能为空')),
})

export const keyWordsRules = Joi.object().keys({
	type:strNoEmpty.error(new Error('type不能为空 可选参数为 general => 常规搜索  advanced=> 高级搜索 ')),
})

export const delRules = Joi.object().keys({
	id:delID,
})
export const detailRules = Joi.object().keys({
	id:strNoEmpty.error(new Error('id不能为空')),
})
export const addBookHouseRules = Joi.object().keys({
	book_id:strNoEmpty.error(new Error('book_id不能为空')),
	type:Joi.any().valid(['1','2','3','6']).error(new Error('type必须为字符串类型(1=>听读 2=>视读 3=>电子书 6=>主题)')),
})

export const dateRules = Joi.object().keys({
	start_date:dateNoEmpty.error(new Error('开始时间不能为空')),
})

export const readLogRules = Joi.object().keys({
	book_id:strNoEmpty.error(new Error('book_id不能为空')),
	chapter:strNoEmpty.error(new Error('章节名不能为空')),
})

export const payRules = Joi.object().keys({
	order_id:strNoEmpty.error(new Error('order_id不能为空')),
	rf_url:strNoEmpty.error(new Error('rf_url不能为空')),
})

export const createOrderRules = Joi.object().keys({
	order_id:strNoEmpty.error(new Error('order_id不能为空')),
	rf_url:strNoEmpty.error(new Error('rf_url不能为空')),
	strategy_id:strNoEmpty.error(new Error('策略ID不能为空')),
})

export const phoneCaptchaRule = Joi.object().keys({
	phone,
	code_id_img: strNoEmpty.error(new Error('缺少参数')),
	code_val_img: strNoEmpty.error(new Error('图片验证码不能为空')),
})

export const loginByPhoneRule = Joi.object().keys({
	phone,
	code_id,
	code_val
})

export const changePhoneRules = Joi.object().keys({
	phone,
	strategy_id: strNoEmpty.error(new Error('缺少参数')),
	code_val_img: strNoEmpty.error(new Error('缺失验证码')),
	code_val,
	pass: password
})

export const payVipRules = Joi.object().keys({
	pay_type: strNoEmpty.error(new Error('未选择支付方式')),
	strategy_id: strNoEmpty.error(new Error('请选择开通时长')),
})