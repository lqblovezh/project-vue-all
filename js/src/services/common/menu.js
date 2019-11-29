
import { request_post, request_get, request_put, request_delete } from 'services/common/request'
import pathToRegexp from 'path-to-regexp'
/**
 * 菜单是否显示
 */
export function menu(data){
	return request_get('/api/menus/access',data)
}