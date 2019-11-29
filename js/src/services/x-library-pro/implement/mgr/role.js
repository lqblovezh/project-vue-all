import User from '../../mgr/User'
import { request_get } from '../../../common/request'
/**
 * 获取用户列表
 * @param {Object} data
 * @param {String} data.id - 选填字段 用户id
 * @param {String} data.phone - 选填字段 手机号
 * @param {String} data.role - 选填字段 角色
 * @param {String} data.pageNum - 页数
 * @param {String} data.pageOffset - 分页条数
 */
export async function getList(data = {}) {
  return User.rule_info().then(res => {
    const info = res.data.map(el => {
      return {
        id: el.id,
        name: el.name,
        abs: el.abs,
        number: el.user_count,
        type: el.type,
        status_type: el.display == 'true' ? '是' : '否',
        member: el.display,
        create_time: el.create_time,
      }
    })
    return {
      data: info,
      page: {},
    }
  })
}

/**
 * 删除用户
 * @param {Array} data.id - 必有 用户id
 */
export async function del(id) {
  return User.rule_del({ _ids: id.id })
}

/**
 * 获取用户详情
 * @param {String} data.id - 必有 用户id
 */
export async function detail(id) {
  return User.rule_detail(id).then(res => {
    return {
      data: {
        id: res.data.id,
        name: res.data.name,
        status: res.data.display == 'true' ? true : false,
        abs: res.data.abs,
        img_src: res.data.tag_img_src,
        img: res.data.tag_img,
      },
    }
  })
}

/**
 * 保存用户详情
 * @param {String} data.id - 必有 用户id
 */
export async function save(data) {
  if (!data.name) {
    data.name = data.nick_name
  }
  if (data.id && !data._id) {
    data._id = data.id
  }
  data.tag_img = data.img
  data.display = data.status
  if (!data.id) {
    return User.rule_add(data)
  }
  return User.rule_edit(data)
}
/**
 * 导出
 * @param {String} data.id - 必有 用户id
 */
export async function derivedData(data) {
  return request_get('/api/user_export')
}

/**
 * 获取用户等级权限信息
 * @param {String} data.id - 必有 等级id
 */
export async function info(data) {
  return User.rule_detail(data).then(res => {
    const rule = JSON.parse(res.data.rule || '{}')
    return {
      data: {
        id: res.data.id,
        chapter: rule.read_chapter_count,
        copy: rule.copy_count,
        screen: rule.double_screen_read == 'true',
        ImageText: rule.picture_text_contrast == 'true',
        language: rule.language_contrast == 'true',
        import: rule.quote_count,
        study: rule.study_count,
      },
    }
  })
}

/**
 * 获取用户等级权限信息
 * @param {String} data.id - 必有 用户id
 * @param {String} data.chapter - 必有 单本书籍可阅读章节
 * @param {String} data.copy - 必有 书籍单次可复制字数：
 * @param {String} data.screen - 必有 双屏阅读：
 * @param {String} data.ImageText - 必有 图文对照：
 * @param {String} data.language - 必有 多语言对照：
 * @param {String} data.import - 必有 书籍单次可引用字数：
 * @param {String} data.study - 必有 用户书房容量：
 */
export async function saveInfo(data) {
  return User.rule_rul({
    _id: data.id,
    read_chapter_count: data.chapter,
    copy_count: data.copy,
    quote_count: data.import,
    language_contrast: data.language,
    double_screen_read: data.screen,
    study_count: data.study,
    picture_text_contrast: data.ImageText,
  })
}
