(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{1007:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.declare=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(){};if(!window.DBI)return;var n=function(e){var t=e.event_class,r=void 0===t?"":t,n=e.event_data,i=void 0===n?{}:n,u=e.event_target,o=void 0===u?"":u,s=e.event_type,a=void 0===s?"":s,c=e.event_source,d=void 0===c?"WEB":c,p=e.event_sources,l=void 0===p?"":p,f=e.event_operator,h=void 0===f?"":f,v=e.event_temporary,g=void 0===v?"":v,_=e.event_system,m=void 0===_?"":_,y=e.event_system_verison,q=void 0===y?"":y,b=e.event_terminal,k=void 0===b?"":b,w=e.event_terminal_verison,L=void 0===w?"":w;if(!window.DBI)return void console.error("DBI对象不存在");return DBI.createEvent({event_class:r,event_data:i,event_target:o,event_type:a,event_source:d,event_sources:l,event_operator:h,event_temporary:g,event_system:m,event_system_verison:q,event_terminal:k,event_terminal_verison:L})}(e),i=Object.prototype.toString.call(t);"[object Object]"===i?n.addData(t):"[object Array]"===i&&t.forEach(function(e){n.addData(e)});DBI.declare(n,r)}},289:function(e,t){var r=/^(?:submit|button|image|reset|file)$/i,n=/^(?:input|select|textarea|keygen)/i,i=/(\[[^\[\]]*\])/g;function u(e,t,r){if(t.match(i)){!function e(t,r,n){if(0===r.length)return t=n;var i=r.shift(),u=i.match(/^\[(.+?)\]$/);if("[]"===i)return t=t||[],Array.isArray(t)?t.push(e(null,r,n)):(t._values=t._values||[],t._values.push(e(null,r,n))),t;if(u){var o=u[1],s=+o;isNaN(s)?(t=t||{})[o]=e(t[o],r,n):(t=t||[])[s]=e(t[s],r,n)}else t[i]=e(t[i],r,n);return t}(e,function(e){var t=[],r=new RegExp(i),n=/^([^\[\]]*)/.exec(e);for(n[1]&&t.push(n[1]);null!==(n=r.exec(e));)t.push(n[1]);return t}(t),r)}else{var n=e[t];n?(Array.isArray(n)||(e[t]=[n]),e[t].push(r)):e[t]=r}return e}function o(e,t,r){return r=r.replace(/(\r)?\n/g,"\r\n"),r=(r=encodeURIComponent(r)).replace(/%20/g,"+"),e+(e?"&":"")+encodeURIComponent(t)+"="+r}e.exports=function(e,t){"object"!=typeof t?t={hash:!!t}:void 0===t.hash&&(t.hash=!0);for(var i=t.hash?{}:"",s=t.serializer||(t.hash?u:o),a=e&&e.elements?e.elements:[],c=Object.create(null),d=0;d<a.length;++d){var p=a[d];if((t.disabled||!p.disabled)&&p.name&&n.test(p.nodeName)&&!r.test(p.type)){var l=p.name,f=p.value;if("checkbox"!==p.type&&"radio"!==p.type||p.checked||(f=void 0),t.empty){if("checkbox"!==p.type||p.checked||(f=""),"radio"===p.type&&(c[p.name]||p.checked?p.checked&&(c[p.name]=!0):c[p.name]=!1),void 0==f&&"radio"==p.type)continue}else if(!f)continue;if("select-multiple"!==p.type)i=s(i,l,f);else{f=[];for(var h=p.options,v=!1,g=0;g<h.length;++g){var _=h[g],m=t.empty&&!_.value,y=_.value||m;_.selected&&y&&(v=!0,i=t.hash&&"[]"!==l.slice(l.length-2)?s(i,l+"[]",_.value):s(i,l,_.value))}!v&&t.empty&&(i=s(i,l,""))}}}if(t.empty)for(var l in c)c[l]||(i=s(i,l,""));return i}},290:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.circleMixin=t.publicMixin=t.main=void 0;var n=d(r(15)),i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},u=d(r(289)),o=r(44),s=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t}(r(1007)),a=r(77),c=r(382);function d(e){return e&&e.__esModule?e:{default:e}}function p(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,r){return function n(i,u){try{var o=t[i](u),s=o.value}catch(e){return void r(e)}if(!o.done)return Promise.resolve(s).then(function(e){n("next",e)},function(e){n("throw",e)});e(s)}("next")})}}var l={created:function(){var e=p(n.default.mark(function e(){return n.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:this.init();case 1:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),beforeRouteUpdate:function(e,t,r){this.currGroup=e.query.id,this.getList(1,10),this.$unCheck(),r()},data:function(){return{currGroup:"",upShelfDiaolog:!1,currentShelf:null}},methods:{init:function(){var e=p(n.default.mark(function e(){return n.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:this.getGroupList(),this.getList();case 2:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),opneDetailDialog:function(e,t){var r=this;this.services.detail({id:t}).then(function(t){r.detailData=t.data,r.detailDialoaType=e,r.detailDialog=!0})},change:function(e){this.opneDetailDialog("xq",e.target.value)},query:function(){var e=(0,u.default)(document.querySelector("#mainForm"),{hash:!0});this.getList(1,this.page.offset,e)},getList:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.page&&this.page.num||1,t=this,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.page&&this.page.offset||10,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};n.group_id=this.currGroup,this.services.getList(i({pageNum:e,pageOffset:r},n)).then(function(e){t.setList(e.data),t.setPage(e.page)})},getGroupList:function(){var e=this;return this.services.groupList().then(function(t){e.setGroupList(t.data)})},groupChange:function(e){this.$router.push({path:this.$route.path,query:{id:e}})},addGroup:function(e){var t=this;this.services.group((0,u.default)(e,{hash:!0})).then(function(e){t.getGroupList()}).catch(function(e){t.$message.error(e)})},updateGroup:function(e){var t=this;this.services.group((0,u.default)(e,{hash:!0})).then(function(e){t.getGroupList()})},delGroup:function(e){var t=this;log("删除分组",e),this.services.groupDel({id:e}).then(function(r){e===t.currGroup&&t.$router.push({path:t.$route.path,query:{id:"non"}}),t.getGroupList()})},handleSizeChange:function(e){this.$unCheck(),void 0!==this.getList&&(this.page.num=1,this.getList(1,e))},handleCurrentChange:function(e){if(this.$unCheck(),e!==this.page.nun){var t=(0,u.default)(document.querySelector("#mainForm"),{hash:!0});void 0!==this.getList&&this.getList(e,this.page.offset,t)}},moveToOther:function(e){var t=this.$getChecked();t?(this.moveIds=t,this.moveToOtherDiaolog=!0):this.$message.error("请先选中")},detailBack:function(e){this.detailDialog=!1,this.getGroupList(),this.query()},moveToSubmit:function(e){var t=this;this.moveIds&&this.services.groupMove({old_group_id:this.currGroup,new_group_id:e,rel_id:this.moveIds,id:this.moveIds}).then(function(e){t.moveToOtherDiaolog=!1,t.getList(),t.getGroupList()})},showUpShelf:function(e,t){var r={};t||(r={data:this.list,name:"set",value:"0",error:"请设置价格后再上架!"}),(e||this.$getChecked(r))&&(this.upShelfDiaolog=!0,this.currentShelf=e)},upShelf:function(e){var t=this,r=[];if(this.currentShelf)r.push(this.currentShelf.id);else if(!(r=this.$getChecked({data:this.list,name:"set",value:"0",error:"请设置价格后再上架!"})))return;this.services.put({id:r,sync:e}).then(function(e){t.upShelfDiaolog=!1,t.getList(),t.declare&&t.declare(r,"上架")}).catch(function(e){var r=e.payload;for(var n in r.messages){t.$message.error(r.messages[n]);break}})},downShelf:function(e){var t=this,r=[];if(e)r.push(e);else if(!(r=this.$getChecked({data:this.list,name:"status",value:"0",error:"未上架的不能下架"})))return;this.services.pull({id:r}).then(function(e){t.getList(),t.declare&&t.declare(r,"下架")}).catch(function(e){var r=e.payload;for(var n in r.messages){t.$message.error(r.messages[n]);break}})},declare:function(e,t){var r=this;if(Array.isArray(e))e.forEach(function(e){var n=r.getDetailById(e);n&&r.declareOne(e,t,n)});else{var n=this.getDetailById(e);n&&this.declareOne(e,t,n)}},declareOne:function(e,t,r){var n,i,u="";try{u=(0,a.getUserInfo)().id}catch(e){console.error("JSON.parse(sessionStorage.userInfo)获取错误")}n={event_class:"PDAMBook",event_target:e,event_type:t,event_source:"WEB",event_operator:u},i={data:[{res_id:r.id,res_type:r.type_name,res_name:r.books_info.name,res_cover:r.books_info.img_src,res_exp:r.books_info.abs,res_author:r.books_info.author,res_lables:r.books_info.tag,res_attr:r.books_info.attributes,res_money:r.audio_price}]},s.declare(n,i,function(e){})},getDetailById:function(e){return this.list.find(function(t){return t.id===e})},delChoosen:function(e){var t=this,r=[];if(e)r.push(e);else if(!(r=this.$getChecked()))return;this.$confirm("是否删除？").then(function(e){t.services.del({id:r}).then(function(e){t.getList(),t.getGroupList()}).catch(function(e){var r=e.payload;for(var n in r.messages){t.$message.error(r.messages[n]);break}})}).catch(function(e){})},getJsonLength:function(e){var t=0;for(var r in e)t++;return t},getVersion:function(e){var t=e.version_list;for(var r in t)if(t[r]!=e.id)return t[r]},delVersion:function(e){var t=this;this.$confirm("是否删除？").then(function(r){t.services.del({id:[e.id]}).then(function(r){t.getList(),t.getJsonLength(e.version_list)<=1?t.detailDialog=!1:t.opneDetailDialog("xq",t.getVersion(e))}).catch(function(e){var r=e.payload;for(var n in r.messages){t.$message.error(r.messages[n]);break}})}).catch(function(e){})},versionChage:function(e,t){var r=this;(0,c.setVersion)({id:e.target.value,type:t.type}).then(function(e){r.$message.success("切换版本成功!");var n=r.list.findIndex(function(e){return e.id===t.id});r.$set(r.list,n,e.data)}).catch(function(e){var t=e.payload;for(var n in t.messages){r.$message.error(t.messages[n]);break}})},putSet:function(e){var t=this;this.services.putInfo({id:e}).then(function(e){var r=!1,n=e.data.prices;for(var i in n)if(n[i]&&n[i].chapters&&n[i].chapters.length>0){r=!0;break}if(!r)return t.$message.error("该书没有内容,请重新发布!");t.putDetailData=e.data,t.pustSetDialog=!0})},pustChange:function(e,t){this.putSet(e.target.value)},close:function(){this.pustSetDialog=!1},save:function(){this.pustSetDialog=!1,this.getList()}}},f={created:function(){var e=p(n.default.mark(function e(){return n.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.getList();case 2:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),data:function(){return{query:null,type:{value:""}}},methods:{handleNavClick:function(e){this.$router.push({path:"/wms/"+this.path+"/"+e.name})},seareHandeler:function(){this.query=(0,u.default)(document.querySelector("#mainForm"),{hash:!0}),this.getList(1,10,this.query)},handleSizeChange:function(e){this.page.num=1,this.getList(1,e,this.query)},handleCurrentChange:function(e){e!==this.page.nun&&this.getList(e,this.page.offset,this.query)},selcetAll:function(e){Array.from(document.querySelectorAll("[name='ids']")).forEach(function(t){t.checked=e.target.checked})},handleClose:function(){this.$refs.detailDialog.resetFields(),this.detailVisible=!1},educe:function(){var e=this.$getChecked({isShowMessage:!1}),t=(0,u.default)(document.querySelector("#mainForm"),{hash:!0});this.services.educe(i({id:e},t)).then(function(e){window.location.href=e.data.url})}}},h={data:function(){return{page:null,detailImgDialog:!1,previewDate:[]}},computed:i({},(0,o.mapState)({list:function(e){return e.circle.list}})),methods:{getList:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.page&&this.page.num||1,t=this,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.page&&this.page.offset||10,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};this.services.getList(i({pageNum:e,pageOffset:r,id:this.$route.query.id},n,{status:this.type.value})).then(function(e){t.$store.state.circle.list=e.data,t.page=e.page})},del:function(e){var t=this,r=[];if(e)r.push(e);else if(!(r=this.$getChecked()))return this.$message.error("错误");this.$confirm("是否删除？").then(function(e){log(t.services),t.services.del({id:r}).then(function(e){t.getList()}).catch(function(e){var r=e.payload;for(var n in r.messages){t.$message.error(r.messages[n]);break}})}).catch(function(e){})},modify:function(e){var t=this,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];r.length||(r=this.$getChecked()),r.length&&this.services.modify({status:e,id:r,user_book_circle_id:this.$route.query.pid}).then(function(e){t.$message.success("修改成功！"),t.getList()})},enclosure:function(e){this.previewDate=e.img_src,this.detailImgDialog=!0}}};t.main=l,t.publicMixin=f,t.circleMixin=h},334:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getList=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_get)("/read/books",e)},t.detail=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_get)(d(e),e)},t.del=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_post)("/read/books/delete",e)},t.put=function(e){return(0,i.request_put)("/read/books/put",e)},t.pull=function(e){return(0,i.request_put)("/read/books/pull",e)},t.groupList=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_get)("/read/books/groups",e)},t.group=function(e){var t=e.id,r=s(e,["id"]);if(t)return(0,i.request_put)(c({id:t}),r);return(0,i.request_post)("/read/books/groups",r)},t.groupDel=function(e){return(0,i.request_delete)(a(e),e)},t.groupMove=function(e){return(0,i.request_put)("/read/groups/books",e)},t.putInfo=function(e){return(0,i.request_get)(p(e),e)},t.putSave=function(e){return(0,i.request_put)("/read/books/save_data",e)},t.computePrice=function(e){return(0,i.request_put)("/read/books/compute_price",e)},t.preview=function(e){var t=e.type,r=s(e,["type"]);switch(t){case 16:r.type="book";break;case 3:r.type="picture";break;case 4:r.type="audio";break;case 5:r.type="video";break;case 14:r.type="resource"}return(0,i.request_get)("/read/books/preview",r)};var n,i=r(76),u=r(106),o=(n=u)&&n.__esModule?n:{default:n};function s(e,t){var r={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=e[n]);return r}var a=o.default.compile("/read/books/groups/:id"),c=o.default.compile("/read/books/:id/groups"),d=o.default.compile("/read/books/:id"),p=o.default.compile("/read/books/setting_info/:id")},382:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.setVersion=function(e){return(0,n.request_put)("/read/course_ware/set_versions",e)},t.getMainList=function(e){var t=e.type,r=function(e,t){var r={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=e[n]);return r}(e,["type"]);switch(t){case"book":return(0,i.getList)(r);case"theme":return(0,u.getList)(r);case"audio":return(0,o.getList)(r);case"video":return(0,s.getList)(r);case"article":return(0,c.getList)(r);case"course":default:return(0,a.getList)(r)}};var n=r(76),i=r(334),u=r(473),o=r(688),s=r(689),a=r(690),c=r(691)},473:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getList=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_get)("/read/theme",e)},t.detail=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_get)(c(e),e).then(function(e){var t=e.data.books_info.components;return t.forEach(function(e){var t=e,r=t.content,n=t.id;(e=Object.assign(e,r)).id=n}),e})},t.del=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_post)("/read/theme/delete",e)},t.put=function(e){return(0,i.request_put)("/read/theme/put",e)},t.pull=function(e){return(0,i.request_put)("/read/theme/pull",e)},t.groupList=function(){return(0,i.request_get)("/read/theme/groups")},t.group=function(e){var t=e.id,r=function(e,t){var r={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=e[n]);return r}(e,["id"]);if(t)return(0,i.request_put)(a({id:t}),r);return(0,i.request_post)("/read/theme/groups",r)},t.groupDel=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_delete)(s(e),e)},t.groupMove=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_put)("/read/groups/theme",e)},t.putSave=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_put)("/read/theme/set_price",e)},t.preview=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_get)("/read/theme/preview",e)};var n,i=r(76),u=r(106),o=(n=u)&&n.__esModule?n:{default:n};var s=o.default.compile("/read/theme/groups/:id"),a=o.default.compile("/read/theme/:id/groups"),c=o.default.compile("/read/theme/:id");o.default.compile("/read/theme/setting_info/:id")},688:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getList=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_get)("/read/audio_product",e)},t.detail=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_get)(d(e),e)},t.del=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_post)("/read/books/delete",e)},t.put=function(e){return(0,i.request_put)("/read/audio_product/put",e)},t.pull=function(e){return(0,i.request_put)("/read/audio_product/pull",e)},t.groupList=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_get)("/read/audio_product/groups",e)},t.group=function(e){var t=e.id,r=s(e,["id"]);if(t)return(0,i.request_put)(c({id:t}),r);return(0,i.request_post)("/read/audio_product/groups",r)},t.groupDel=function(e){return(0,i.request_delete)(a(e),e)},t.groupMove=function(e){return(0,i.request_put)("/read/groups/audio_product",e)},t.putInfo=function(e){return(0,i.request_get)(p(e),e)},t.putSave=function(e){return(0,i.request_put)("/read/books/save_data",e)},t.computePrice=function(e){return(0,i.request_put)("/read/books/compute_price",e)},t.preview=function(e){var t=e.type,r=s(e,["type"]);switch(t){case 16:r.type="book";break;case 3:r.type="picture";break;case 4:r.type="audio";break;case 5:r.type="video"}return(0,i.request_get)("/read/books/preview",r)};var n,i=r(76),u=r(106),o=(n=u)&&n.__esModule?n:{default:n};function s(e,t){var r={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=e[n]);return r}var a=o.default.compile("/read/audio_product/groups/:id"),c=o.default.compile("/read/audio_product/:id/groups"),d=o.default.compile("/read/audio_product/:id"),p=o.default.compile("/read/books/setting_info/:id")},689:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getList=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_get)("/read/video_product",e)},t.detail=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_get)(d(e),e)},t.del=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_post)("/read/books/delete",e)},t.put=function(e){return(0,i.request_put)("/read/video_product/put",e)},t.pull=function(e){return(0,i.request_put)("/read/video_product/pull",e)},t.groupList=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_get)("/read/video_product/groups",e)},t.group=function(e){var t=e.id,r=s(e,["id"]);if(t)return(0,i.request_put)(c({id:t}),r);return(0,i.request_post)("/read/video_product/groups",r)},t.groupDel=function(e){return(0,i.request_delete)(a(e),e)},t.groupMove=function(e){return(0,i.request_put)("/read/groups/video_product",e)},t.putInfo=function(e){return(0,i.request_get)(p(e),e)},t.putSave=function(e){return(0,i.request_put)("/read/books/save_data",e)},t.computePrice=function(e){return(0,i.request_put)("/read/books/compute_price",e)},t.preview=function(e){var t=e.type,r=s(e,["type"]);switch(t){case 16:r.type="book";break;case 3:r.type="picture";break;case 4:r.type="audio";break;case 5:r.type="video"}return(0,i.request_get)("/read/books/preview",r)};var n,i=r(76),u=r(106),o=(n=u)&&n.__esModule?n:{default:n};function s(e,t){var r={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=e[n]);return r}var a=o.default.compile("/read/video_product/groups/:id"),c=o.default.compile("/read/video_product/:id/groups"),d=o.default.compile("/read/video_product/:id"),p=o.default.compile("/read/books/setting_info/:id")},690:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getList=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_get)("/read/course_ware",e)},t.detail=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_get)(c(e),e)},t.del=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_post)("/read/theme/delete",e)},t.putInfo=p,t.put=function(e){return(0,i.request_put)("/read/theme/put",e)},t.pull=function(e){return(0,i.request_put)("/read/theme/pull",e)},t.groupList=function(){return(0,i.request_get)("/read/course_ware/groups")},t.group=function(e){var t=e.id,r=function(e,t){var r={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=e[n]);return r}(e,["id"]);if(t)return(0,i.request_put)(a({id:t}),r);return(0,i.request_post)("/read/course_ware/groups",r)},t.groupDel=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_delete)(s(e),e)},t.groupMove=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_put)("/read/groups/course_ware",e)},t.putSave=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_post)("/read/course_ware/save_price",e)},t.preview=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_get)("/read/theme/preview",e)},t.courseSetInfo=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_get)(d(e))};var n,i=r(76),u=r(106),o=(n=u)&&n.__esModule?n:{default:n};var s=o.default.compile("/read/course_ware/groups/:id"),a=o.default.compile("/read/course_ware/:id/groups"),c=o.default.compile("/read/theme/:id"),d=o.default.compile("/read/course_ware/:id/setting"),p=o.default.compile("/read/books/setting_info/:id");function p(e){return(0,i.request_get)(p(e),e)}},691:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getList=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_get)("/read/article_product",e)},t.detail=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_get)(c(e),e)},t.del=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_post)("/read/theme/delete",e)},t.putInfo=p,t.put=function(e){return(0,i.request_put)("/read/article_product/put",e)},t.pull=function(e){return(0,i.request_put)("/read/article_product/pull",e)},t.groupList=function(){return(0,i.request_get)("/read/article_product/groups")},t.group=function(e){var t=e.id,r=function(e,t){var r={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=e[n]);return r}(e,["id"]);if(t)return(0,i.request_put)(a({id:t}),r);return(0,i.request_post)("/read/article_product/groups",r)},t.groupDel=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_delete)(s(e),e)},t.groupMove=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_put)("/read/groups/article_product",e)},t.putSave=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_put)("/read/theme/set_price",e)},t.preview=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_get)("/read/article_product/preview",e)},t.courseSetInfo=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_get)(d(e))};var n,i=r(76),u=r(106),o=(n=u)&&n.__esModule?n:{default:n};var s=o.default.compile("/read/article_product/groups/:id"),a=o.default.compile("/read/article_product/:id/groups"),c=o.default.compile("/read/article_product/:id"),d=o.default.compile("/read/article_product/:id/setting"),p=o.default.compile("/read/books/setting_info/:id");function p(e){return(0,i.request_get)(p(e),e)}}}]);