(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{1028:function(t,e,i){"use strict";var a=i(498);i.n(a).a},1106:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"index clearfix"},[i("div",{staticClass:"dialogs"},[t.moveToOtherDiaolog?i("MoveGroup",{attrs:{currGroup:t.currGroup,groupList:t.groupList},on:{back:function(e){t.moveToOtherDiaolog=!1},submit:t.moveToSubmit}}):t._e(),t.upShelfDiaolog?i("Grounding",{on:{back:function(e){t.upShelfDiaolog=!1},upShelf:t.upShelf}}):t._e(),t.detailDialog?i("el-dialog",{attrs:{center:!1,visible:t.detailDialog,"close-on-click-modal":!1,top:"50px",width:"1000px"},on:{"update:visible":function(e){t.detailDialog=e}}},[i("div",{staticClass:"content",attrs:{slot:"title"},slot:"title"},[i("Detail",{attrs:{type:t.detailDialoaType,detailData:t.detailData,isTheme:!0,services:t.services},on:{back:function(e){t.detailDialog=!1},change:t.change,delete:t.delVersion}})],1),i("div",{staticClass:"dialog-footer btns",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"info"},on:{click:function(e){t.detailDialog=!1}}},[t._v("取消")])],1)]):t._e()],1),i("div",{staticClass:"mainRight"},[i("div",{staticClass:"contentWrap"},[i("div",{staticClass:"contentLeft"},[i("div",{staticClass:"maindata"},[i("div",{staticClass:"serachWrap"},[i("div",{staticClass:"title"}),i("form",{staticClass:"clearfix",attrs:{id:"mainForm"}},[i("span",{staticClass:"group-inline"},[i("el-input",{attrs:{placeholder:"名称",name:"name",clearable:""}})],1),i("span",{staticClass:"group-inline"},[i("el-input",{attrs:{placeholder:"标签",name:"tag",clearable:""}})],1),i("span",{staticClass:"group-inline"},[i("TimePick",{attrs:{inputsName:["start_time","end_time"]}})],1),t._m(0),i("span",{staticClass:"group-inline float-right"},[i("el-button",{attrs:{size:"mediu",type:"primary",icon:"el-icon-search",plain:""},on:{click:t.query}},[t._v("搜索")])],1)])]),i("div",{staticClass:"tableWrap"},[i("div",{staticClass:"tableTop"},[i("div",{staticClass:"title vel-line"},[i("span",[t._v("全部 "),t.page?i("span",{staticClass:"totalNum"},[t._v("("+t._s(t.page.total)+")")]):t._e()]),i("div",{staticClass:"btns"},[i("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:t.moveToOther}},[t._v("移动分组")]),i("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:function(e){return t.showUpShelf()}}},[t._v("上架")]),i("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:function(e){return t.downShelf()}}},[t._v("下架")]),i("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:function(e){return t.delChoosen(!1)}}},[t._v("删除")])],1)])]),i("table",{staticClass:"table"},[i("thead",[i("tr",[i("th",{staticClass:"table-check"},[i("input",{attrs:{type:"checkbox"},on:{click:function(e){return t.$checkAll(e)}}})]),i("th",[t._v("名称")]),i("th",[t._v("主题类型")]),i("th",[t._v("主题所含数量")]),i("th",[t._v("标签")]),i("th",[t._v("创建时间")]),i("th",{attrs:{width:"70"}},[t._v("上架状态")]),i("th",{attrs:{width:"70"}},[t._v("使用版本")]),i("th",{attrs:{width:"80"}},[t._v("操作")])])]),t.list?i("tbody",t._l(t.list,function(e){return i("tr",[i("th",[i("input",{ref:"ids",refInFor:!0,attrs:{type:"checkbox",name:"ids"},domProps:{value:e.id}})]),i("th",[i("img",{staticClass:"cover-photo",attrs:{src:e.books_info.img_src}}),i("div",{staticClass:"th-name bookName",attrs:{title:e.books_info.name}},[t._v(t._s(e.books_info.name))])]),i("th",[i("div",{staticClass:"th-name",attrs:{title:e.books_info.theme_type}},[t._v(t._s(e.books_info.theme_type))])]),i("th",[i("div",{staticClass:"th-name"},[t._v(t._s(e.amount))])]),i("th",[i("div",{staticClass:"th-name",attrs:{title:e.books_info.tag}},[t._v(t._s(e.books_info.tag))])]),i("th",[i("div",{staticClass:"th-name"},[t._v(t._s(e.books_info.create_time))])]),i("th",[i("div",{staticClass:"th-name"},[t._v(t._s(e.status_name))])]),i("th",["0"!=e.status?i("div",{staticClass:"th-name"},[t._v(t._s(e.version_id))]):t._e(),"0"==e.status?i("div",{staticClass:"th-name"},[i("select",{on:{change:function(i){return t.versionChage(i,e)}}},t._l(e.version_list,function(a,s){return i("option",{domProps:{value:a,selected:e.version_id==s}},[t._v(t._s(s))])}),0)]):t._e()]),i("th",[i("div",{staticClass:"btns"},[i("Icon",{attrs:{type:"icon-wms_msgComment",title:"设置"},on:{click:function(i){return t.putSet(e)}}}),"0"!=e.status?i("Icon",{attrs:{type:"icon-reject",title:"下架"},on:{click:function(i){return t.downShelf(e.id)}}}):t._e(),"0"==e.status&&"1"==e.set?i("Icon",{attrs:{type:"icon-upload",title:"上架"},on:{click:function(i){return t.showUpShelf(e)}}}):t._e(),i("Icon",{attrs:{type:"icon-detail",title:"详情"},on:{click:function(i){return t.opneDetailDialog("xq",e.id)}}})],1)])])}),0):t._e()]),t.page?i("div",{staticClass:"pageWrap"},[i("el-pagination",{attrs:{small:!1,background:"","current-page":t.page.num,"page-sizes":[10,50,100],"page-size":t.page.offset,layout:"total, sizes,prev, pager, next, jumper",total:t.page.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1):t._e(),t.pustSetDialog?i("el-dialog",{attrs:{title:"价格设置",visible:t.pustSetDialog,width:"500px"},on:{"update:visible":function(e){t.pustSetDialog=e}}},[i("div",{staticClass:"formWrap"},[i("VaForm",{ref:"pustSetForm"},[i("form",{attrs:{id:"pustSetForm"}},[i("div",{staticClass:"group"},[i("span",{staticClass:"left"},[t._v("版本")]),i("span",{staticClass:"right"},[t._v("价格")]),i("input",{staticClass:"hide",attrs:{name:"id"},domProps:{value:t.currentPut.id}})]),t._l(t.currentPut.theme_extend_list,function(e,a){return i("div",{staticClass:"group"},[i("span",{staticClass:"left",domProps:{textContent:t._s(e.version_id)}}),i("span",{staticClass:"right"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.price,expression:"item.price"}],staticClass:"form-control info",attrs:{name:"prices",disabled:e.is_put},domProps:{value:e.price},on:{input:function(i){i.target.composing||t.$set(e,"price",i.target.value)}}}),i("input",{staticClass:"hide",attrs:{name:"ids",disabled:e.is_put},domProps:{value:e.xread_book_id}})])])})],2)])],1),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{size:"small",type:"info"},on:{click:function(e){t.pustSetDialog=!1}}},[t._v("取消")]),i("el-button",{attrs:{size:"small",type:"primary"},on:{click:t.pustSetSave}},[t._v("确定")])],1)]):t._e()],1),i("div",{staticClass:"gruopList"},[i("GroupList",{attrs:{groupList:t.groupList,currGroup:t.currGroup},on:{addGroup:t.addGroup,updateGroup:t.updateGroup,delGroup:t.delGroup,groupChange:t.groupChange}})],1)])])])])])},s=[function(){var t=this.$createElement,e=this._self._c||t;return e("span",{staticClass:"group-inline"},[e("select",{staticClass:"form-control width-small",attrs:{placeholder:"标签",name:"status"}},[e("option",{attrs:{value:""}},[this._v("选择状态")]),e("option",{attrs:{value:"1"}},[this._v("已上架")]),e("option",{attrs:{value:"0"}},[this._v("未上架")])])])}];i.d(e,"a",function(){return a}),i.d(e,"b",function(){return s})},252:function(t,e,i){"use strict";i.r(e);var a=i(1106),s=i(496);for(var n in s)"default"!==n&&function(t){i.d(e,t,function(){return s[t]})}(n);i(1028);var o=i(0),r=Object(o.a)(s.default,a.a,a.b,!1,null,"302c86c5",null);e.default=r.exports},496:function(t,e,i){"use strict";i.r(e);var a=i(497),s=i.n(a);for(var n in a)"default"!==n&&function(t){i.d(e,t,function(){return a[t]})}(n);e.default=s.a},497:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(t[a]=i[a])}return t},s=c(i(333)),n=i(290),o=(c(i(289)),c(i(335))),r=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e.default=t,e}(i(473)),l=c(i(365)),u=i(44);function c(t){return t&&t.__esModule?t:{default:t}}e.default={components:{GroupList:s.default,Detail:l.default,MoveGroup:o.default},mixins:[n.main],data:function(){return{services:r,detailDialog:!1,detailDialoaType:"xq",detailData:null,moveToOtherDiaolog:!1,moveIds:null,pustSetDialog:!1,currentPut:null,toId:null,fabuIds:[]}},methods:a({setList:function(t){this.setMediaThemelist(t)},setGroupList:function(t){this.setMediaThemeGrouplist(t)},setPage:function(t){this.setMediaThemelistPage(t)},putSet:function(t){this.currentPut={theme_extend_list:t.theme_extend_list},this.pustSetDialog=!0},pustSetSave:function(){var t=this;this.services.putSave(this.currentPut).then(function(e){t.pustSetDialog=!1,t.getList()})}},(0,u.mapMutations)(["setMediaThemelist","setMediaThemeGrouplist","setMediaThemelistPage"])),computed:a({},(0,u.mapState)({list:function(t){return t.mediaTheme.list},groupList:function(t){return t.mediaTheme.groupList},page:function(t){return t.mediaTheme.page}}))}},498:function(t,e,i){}}]);