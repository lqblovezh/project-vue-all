import Copyright from '../../mgr/Copyright'
/**
 * 获取版权信息
 */
export async function getList() {
  const { data } = await Copyright.getList()
  return {
    data: {
      id: data.id,
      img: data.img,
      img_src: data.img_src,
      density: data.density,
      opcity: data.transparency,
      number: data.copy_number,
      create_time: data.create_time,
    },
  }
}

/**
 * 设置版权信息
 */
export async function save(data) {
  return Copyright.save({
    img: data.img,
    transparency: data.opcity,
    density: 1 || data.density,
    data: '',
    copy_number: data.number,
  })
}
