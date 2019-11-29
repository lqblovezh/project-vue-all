//import {request_post,request_get,request_put,request_delete} from 'services/common/request';
import { decorate } from 'core-decorators';
import Base from './lib/Base'
import {request_post,request_get,request_put,request_delete} from 'services/common/request';
class Main extends Base{
	@decorate(cache)

	getList () {
		return request_get('/common/api/user/users/user',{}).then(res=>{
			res.data.data.length= 1
			return res.data.data
		})
	}
}
function cache (run){
	const propName = '_' + run.name
	return (...args) => {
		if (!this[propName]) {
			this[propName] = run.apply(this,args)
		}
		return this[propName]
	}
}

export default new Main()


