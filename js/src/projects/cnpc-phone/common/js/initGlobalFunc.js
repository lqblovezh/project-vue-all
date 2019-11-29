import * as globalFuncs from './util'
import * as directives from './directives'
import * as filters from './filters'

export default {
	install(Vue, opts) {
		for (let name in globalFuncs) {
			if (Vue.prototype['$' + name]) {
				throw new Error(`function ${name} has already defined`)
			}
			Vue.prototype['$'+name] = globalFuncs[name]
		}

		for (let directive in directives) {
			Vue.directive(directive, directives[directive])
		}

		for (let filter in filters) {
			Vue.filter(filter, filters[filter])
		}
	}
}