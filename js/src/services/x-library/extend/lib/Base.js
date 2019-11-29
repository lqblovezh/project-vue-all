//基础类
import * as $http from 'services/common/request';
export default class Base {
	constructor(name) {
		this.$http = $http;
		this.decorate = decorate
	}
}