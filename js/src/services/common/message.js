import { request_post, request_get, request_put, request_delete } from 'services/common/request'
import pathToRegexp from 'path-to-regexp'


let path = pathToRegexp.compile('/system/api/app_manager/managers/:id');

/**
 * 获取数据列表
 */

export function getList(){
   return Promise.resolve([{
    id:1,
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  }, {
    id:2,
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  }, {
    id:3,
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  }, {
    id:4,
    date: '2016-05-08',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  }, {
    id:5,
    date: '2016-05-06',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  }, {
    id:6,
    date: '2016-05-07',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  }])
}