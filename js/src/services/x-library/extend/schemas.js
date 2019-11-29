const Joi = require('joi')

const phone = Joi.string().regex(/^1[34578]\d{9}$/).error(new Error('电话号码不正确'))
const strRequired= Joi.string().required()
const strNoEmpty = Joi.string().min(1)

export const loginRules = Joi.object().keys({
	user_name:strNoEmpty.error(new Error('姓名不能为空')),
	user_pass:strNoEmpty.error(new Error('密码不能为空')),
})

export const registerRules = Joi.object().keys({
	phone,
	code_id:strNoEmpty.error(new Error('code_id不能为空')),
	code_val:strNoEmpty.error(new Error('code_val不能为空')),
	name:strNoEmpty.error(new Error('用户名不能为空')),
	nick_name:strNoEmpty.error(new Error('昵称不能为空')),
	pass:strNoEmpty.error(new Error('密码不能为空')),
})

export const resetPassQueryRules = Joi.object().keys({
	user_id:strNoEmpty.error(new Error('user_id不能为空')),
	code_val:strNoEmpty.error(new Error('code_val不能为空')),
	pass:strNoEmpty.error(new Error('密码不能为空')),
	pass_confirm:Joi.any().valid(Joi.ref('pass')).error(new Error('两次密码不相同')),
})

export const getResetCodeRules = Joi.object().keys({
	phone,
	user_name:strNoEmpty.error(new Error('姓名不能为空')),
	code_id:strNoEmpty.error(new Error('code_id不能为空')),
	code_val:strNoEmpty.error(new Error('code_val不能为空')),
})