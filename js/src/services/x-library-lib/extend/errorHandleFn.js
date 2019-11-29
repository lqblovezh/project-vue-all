/**
 *  schemas错误处理函数
 */

export function usernameErrorFn(errors){
    errors.forEach(err => {
      switch (err.type) {
        case "any.empty":
          err.message = "用户名不能为空";
          break;
        case "string.alphanum":
          err.message = "字符必须为字母或数字"
          break;
        case "string.min":  
          err.message = `用户名字符数少于${err.context.limit}个`;
          break;
        case "string.max":
          err.message = `用户名字符数最多为${err.context.limit}个`;
          break;
        default:
          break;
      }
    });
    return new Error(errors[0].message);
}

export function phoneErrorFn(errors){
  errors.forEach(err => {
		switch (err.type) {
			case "any.empty":
				err.message = "手机号不能为空";
				break;
			case "string.regex.base":  
				err.message = `手机号格式不对`;
				break;
			default:
				break;
		}
	});
	return new Error(errors[0].message);
}

export function passwordErrorFn(errors){
	errors.forEach(err => {
		switch (err.type) {
			case "any.empty":
				err.message = "密码不能为空";
				break;
			case "string.regex.base":  
				err.message = `密码为6至16位的字母或者数字字符`;
				break;
			default:
				break;
		}
	});
	return new Error(errors[0].message);
}