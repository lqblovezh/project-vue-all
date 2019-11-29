
import Search from '../../mgr/Search'
/**
 * 获取繁简字列表
 */
export async function getList() {
  return Search.get_search_setting({type:'all'})
}
/**
 * 保存
 * @param {String} data.checkedSearch - 必有 检索栏
 * @param {String} data.checkedSenior - 必有 高级检索
 */
export async function save(data) {
  return Search.edit_search_setting(data)
}
