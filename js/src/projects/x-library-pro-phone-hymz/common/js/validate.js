import { isEmptyObject, isNumber } from './base'
import validateRules from '../../data/validate-rules'
export default function validate(form_data) {
  const errors = []
  for (let i in form_data) {
    if (typeof form_data[i] !== 'object') {
      return
    }
    const { type, val, name, required, pattern, len } = form_data[i]
    try {
      validate_require(val, type, required)
      validate_len(val, type, len)
      validate_pattern(val, type, pattern)
    } catch(e) {
      errors.push(e.toString())
    }
  }
  return errors
}

function validate_require(value, type, flag = true) {
  if (validateRules.rules[type].required && flag) {
    if (!value) {
      throw new Error(validateRules.messages[type].required)
    }
  }
}

function validate_pattern(value, type, pattern) {
  pattern = pattern || validateRules.rules[type].pattern
  let reg = new RegExp(pattern)
  if (!reg.test(value)) {
    throw new Error(validateRules.messages[type].pattern)
  }
}

function validate_len(value, type, rule = {}) {
  let default_rule = validateRules.rules[type].len,
      default_type = typeof default_rule,
      len = value.length,
      message = validateRules.messages[type].len
  if (isNumber(rule) && len > rule) {
    throw new Error(message)
  }
  const { min, max } = Object.assign(default_rule, rule)
  console.log(min, default_rule, max)
  if (len < min || len > max) {
    throw new Error(message)
  }
}