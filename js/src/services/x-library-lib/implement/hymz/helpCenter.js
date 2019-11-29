/**
  * 获取帮助信息
*/
export async function getHelpInfo(){
  const {data: {content}} = await request_get('/api/help')
  return content
}
