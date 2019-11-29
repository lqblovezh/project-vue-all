import fetch from "isomorphic-fetch";
import qs from "qs";
import codes from "./codes";
import mergeRequest from "./mergeRequest";
import urlJoin from "url-join";
import config from "../config";
import Cookies from "js-cookie";

import { isBrowser } from "./utils";
import FileSlice from "./FileSlice";

const { type, admin, design } = __PROJECT_INFO__;

const isSystemAdmin = type == "system" && admin && design == "desktop";

function errTip(msg) {
  // 统一错误处理, 不影响抛出错误
  if (global.VUE_INSTANCE && global.location) {
    VUE_INSTANCE.$message && VUE_INSTANCE.$message.error(msg);
  }
}

const _fetch = async function(path, { headers = {}, ...opts }) {
  let token;
  if (isBrowser) {
    // app 可能需要保持长久的登陆有效, 不宜使用sessionStorage
    // 需要的项目 在html增加全局变量  var TOKEN_LOCAL = true
    // if(type == 'common') {
    // 	debugger
    // }
    if (global.TOKEN_LOCAL) {
      token = localStorage.token;
      headers.ClientPlatform = "app";
    } else {
      if (document.cookie) {
        token = Cookies.get("token");
        if (token) {
          sessionStorage.token = token;
          Cookies.remove("token", {
            domain: global.restUrl_system.replace("http://", ".")
          });
        }
      }
      if (!token) {
        token = sessionStorage.token;
      }
    }
  } else {
    token = config.token;
  }
  // alert(token);

  headers.ApiToken = token;

  //C端需要的headers
  headers.AuthPlatform = "";
  headers.AuthSource = "";
  headers["X-Requested-With"] = "XMLHttpRequest";
  // console.log('headers', headers)
  if (!/^https?\:/.test(path)) {
    // if (!global.config) {
    // 	path = ''
    // 	return Promise.resolve({
    // 		status: false,
    // 		message: 'global.config 不存在!'
    // 	})
    // }
    if (isBrowser) {
      path = getFullPath(path);
    } else {
      // path = global.config.requestSite.substring(0, global.config.requestSite.length - 1) + path
      path = urlJoin(
        global.config.requestSite,
        routeUrl.replace("h5", ""),
        path
      );
      // console.info('----- server ', new Date().getTime(), path)
    }

    // console.log('request path------------>', path)
  }

  return fetch(path, {
    headers,
    ...opts
  })
    .then(res => {
      if (res.status >= 400) {
        const err = new Error(codes.E_NETWORK);
        err.payload = {
          status: false,
          code: "E_NETWORK",
          message: err.message,
          errors: [res.status]
        };
        errTip(err.message);
        throw err;
      }
      return res.text();
    })
    .then(payload => {
      payload = JSON.parse(payload, (k, v) => {
        if (v && v._id) {
          v.id = v._id;
          delete v._id;
        }
        if (v && v.page && v.page.offset) {
          v.page.num = Number.parseInt(v.page.start / v.page.offset + 1);
        }
        return v;
      });
      payload.debug = null;
      if (!payload.status && payload.code == "20401") {
        // alert(JSON.stringify(payload)+'->>>> '+ path + '->>>>' + headers.ApiToken);
        if (isBrowser) {
          sessionStorage.clear();
          localStorage.removeItem("token");
        } else {
          global.token = "";
        }
        console.error("登录超时！");
        if (!/\/current$/.test(path) && isBrowser) {
          // if (global.AppType !== 'mobile' && global.AppType !== 'x-system') {
          // 	// 手机就不跳首页了
          // 	window.location.href = '../'
          // }
          if (admin && isBrowser) {
            // 手机就不跳首页了
            window.location.href = isSystemAdmin ? "/system/admin" : "/admin";
          }
        }

        const err = new Error(codes[payload.code]);
        err.code = payload.code;
        err.payload = payload;
        let message = Object.values(err.payload.errors).join(",");
        if (message) {
          err.payload.message = message;
        }
        throw err;
      }
      if (!payload.status) {
        let msg = "未知错误:status === fasle ";
        if (payload.messages) {
          for (let v in payload.messages) {
            msg = payload.messages[v];
            break;
          }
        }
        console.log("未知错误:status === fasle", payload);
        const err = new Error(msg);
        err.payload = payload;
        let message = Object.values(err.payload.errors).join(",");
        if (message) {
          err.payload.message = message;
        }
        throw err;
      }
      if (
        isBrowser &&
        type != "system" &&
        type != "qrcode" &&
        type != "library"
      ) {
        Array.from(document.querySelectorAll("input[type=checkbox]")).forEach(
          item => {
            item.checked = false;
          }
        ); //解决选中的文件按钮还在的问题统一处理
      }
      return payload;
    });
};

function setHeaders({ pageStart = null, pageOffset, pageNum = 0 }) {
  const headers = {
    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
  };
  if (pageStart !== null) {
    headers.PageStart = pageStart;
    headers.PageOffset = pageOffset;
  } else if (pageNum > 0) {
    headers.PageStart = (pageNum - 1) * pageOffset;
    headers.PageOffset = pageOffset;
  }
  return headers;
}

//get请求
export const request_get = (
  path,
  { pageStart = null, pageOffset = 10, pageNum, ...data } = {}
) => {
  const headers = setHeaders({
    pageStart,
    pageOffset,
    pageNum
  });
  return _fetch(
    path +
      qs.stringify(data, {
        addQueryPrefix: true
      }),
    {
      method: "GET",
      headers
    }
  );
};

//post请求
export const request_post = (
  path,
  { pageStart, pageOffset = 10, pageNum, ...data } = {}
) => {
  const headers = setHeaders({
    pageStart,
    pageOffset,
    pageNum
  });
  return _fetch(path, {
    method: "POST",
    headers,
    body: qs.stringify(data, {
      skipNulls: true
    })
  });
};

//put请求
export const request_put = (
  path,
  { pageStart, pageOffset = 10, pageNum, ...data } = {}
) => {
  const headers = setHeaders({ pageStart, pageOffset, pageNum });
  return _fetch(path, {
    method: "PUT",
    headers,
    body: qs.stringify(data, {
      strictNullHandling: true
    })
  });
};

//delete请求
export const request_delete = (path, data = {}) => {
  return _fetch(
    path +
      qs.stringify(data, {
        addQueryPrefix: true
      }),
    {
      method: "DELETE"
    }
  );
};

/**
 * 新上传文件接口
 * @param {*} file
 * @param {*} callback 回调函数, 可选, 返回上传进度, 参数只有一个num
 */
export async function uploadFile(file, callback) {
  let data = {};
  try {
    let res = await request_post(
      `/common/api/files/upload_task?r=${Math.random()}`
    );
    data.task_id = res.data.task_id;
    data.is_chunk = true;
  } catch (error) {
    throw new Error("获取task_id失败!");
  }
  return splice2({
    file,
    data,
    fileSlice: new FileSlice(file),
    callback
  });
}

async function splice2({ file, data, fileSlice, callback }) {
  const file_data = fileSlice.next();
  const form_data = new FormData();
  form_data.append("task_id", data.task_id);
  form_data.append("name", file.name);
  form_data.append("size", file.size);
  form_data.append("type", file.type);
  form_data.append("file", file_data.chunk);
  form_data.append("chunks", file_data.total);
  form_data.append("chunk", file_data.count);
  form_data.append("chunk_size", file_data.size);
  let res = await _fetch(`/common/api/files/upload?r=${Math.random()}`, {
    method: "POST",
    body: form_data
  });
  if (typeof callback == "function") {
    callback(res.data.chunks_completed_percent);
  }
  if (res.code === "20201") {
    return res;
  }
  if (fileSlice.hasNext()) {
    console.log("uploading...");
    return splice2({
      file,
      data,
      fileSlice,
      callback
    });
  } else {
    console.log("upload end");
  }
}

//getProgress
export async function request_progress(path, callback = () => {}) {
  return await _fetch(path, {
    method: "GET"
  }).then(res => {
    if (res.data.number >= 100) {
      res.data.number = 100;
      callback(res);
      return res;
    } else {
      callback(res);
      if (res.data.number < 100) {
        return setTimeout(() => {
          request_progress(path, callback);
        }, 500);
      } else {
        throw new Error("获取进度失败");
      }
    }
  });
}

// 不分片上传文件
const fileUpload = (path, file) => {
  const form_data = new FormData();
  form_data.append("name", file.name);
  form_data.append("size", file.size);
  form_data.append("type", file.type);
  form_data.append("file", file);
  form_data.append("chunks", 1);
  form_data.append("chunk", 0);
  form_data.append("chunk_size", file.size);
  console.log("new data");
  console.log(form_data);
  // 多文件上传, 不区分链接, 会合并请求, 导致失败
  return _fetch(path + `?r=${Math.random(5)}`, {
    method: "POST",
    body: form_data
  });
};

//分片上传
const splice = async (path, { file, data } = data, upload, callback) => {
  const form_data = new FormData();
  form_data.append("task_id", data.task_id);
  form_data.append("name", file.name);
  form_data.append("size", file.size);
  form_data.append("type", file.type);
  const file_data = upload.next();
  form_data.append("file", file_data.chunk);
  form_data.append("chunks", file_data.total);
  form_data.append("chunk", file_data.count);
  form_data.append("chunk_size", file_data.size);

  return await _fetch(path + `?r=${Math.random(5)}`, {
    method: "POST",
    body: form_data
  }).then(res => {
    if (res.code == "20201") {
      return res;
    } else {
      if (typeof callback == "function") {
        request_get("/common/api/files/upload_task/" + data.task_id).then(
          task => {
            callback(task.data.chunks_completed_percent);
          }
        );
      }
      if (upload.hasNext()) {
        return splice(
          path,
          {
            file,
            data
          },
          upload,
          callback
        );
      } else {
        throw new Error("分片错误");
      }
    }
  });
};

//formData
export const request_file = (path, { file, data } = data, callback) => {
  if (data.is_chunk) {
    const upload = new FileSlice(file, data.size);
    return splice(
      path,
      {
        file,
        data
      },
      upload,
      callback
    );
  } else {
    return fileUpload(path, file);
  }
};

export function getFullPath(path) {
  if (path.indexOf("/system/") == 0) {
    path = urlJoin(global.restUrl_system, path);
  } else if (path.indexOf("/common/") == 0) {
    path = urlJoin(global.restUrl_common, path);
  } else {
    path = urlJoin(global.restUrl, path);
  }
  return path;
}
