(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{1071:function(t,e,i){"use strict";var a=i(576);i.n(a).a},1094:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"box"},[i("div",{staticClass:"top serachWrap"},[i("form",{attrs:{id:"mainForm"}},[i("span",{staticClass:"group-inline"},[i("el-input",{attrs:{placeholder:"输入手机号搜索",name:"order_id",clearable:""},model:{value:t.where.order_id,callback:function(e){t.$set(t.where,"order_id",e)},expression:"where.order_id"}})],1),i("span",{staticClass:"group-inline"},[i("el-input",{attrs:{placeholder:"输入用户搜索",name:"user_name",clearable:""},model:{value:t.where.user_name,callback:function(e){t.$set(t.where,"user_name",e)},expression:"where.user_name"}})],1),i("span",{staticClass:"group-inline"},[i("el-input",{attrs:{placeholder:"输入手机号搜索",name:"phone",clearable:""},model:{value:t.where.phone,callback:function(e){t.$set(t.where,"phone",e)},expression:"where.phone"}})],1),i("span",{staticClass:"group-inline"},[i("TimePick",{attrs:{inputsName:["start_time","end_time"],placeholder:["创建起始时间","创建结束时间"]}})],1),i("span",{staticClass:"group-inline"},[i("el-select",{attrs:{placeholder:"选择状态搜索"},model:{value:t.where.status,callback:function(e){t.$set(t.where,"status",e)},expression:"where.status"}},t._l(t.status,function(t){return i("el-option",{key:t.txt,attrs:{label:t.txt,value:t.value}})}),1)],1),i("span",{staticClass:"group-inline right"},[i("el-button",{attrs:{type:"primary",plain:"",icon:"el-icon-search"},on:{click:t.search}},[t._v("搜索")]),i("el-button",{attrs:{type:"primary",plain:""},on:{click:function(e){return t.educe()}}},[t._v("导出查询")])],1)])]),i("div",{staticClass:"content"},[i("table",{staticClass:"list"},[t._m(0),i("tbody",t._l(t.list,function(e,a){return i("tr",[i("td",[t._v(t._s(a+1)),i("input",{ref:"ids",refInFor:!0,attrs:{type:"hidden"}})]),i("td",[t._v(t._s(e.order_id))]),i("td",[t._v(t._s(e.user_name))]),i("td",[t._v(t._s(e.phone))]),i("td",[t._v(t._s(e.pay_time))]),i("td",[t._v("1")]),i("td",[t._v(t._s(e.money)+" ")]),i("td",[t._v(t._s(e.distributor_info.distributor_nick))]),i("td",[t._v(t._s(e.distribute_money)+" ")]),i("td",[t._v(t._s(e.reward_money)+" ")]),i("td",[t._v(t._s(t.status[e.status].txt))]),i("td",[i("el-button",{attrs:{size:"medium",type:"primary",plain:""},on:{click:function(i){return t.detail(e.order_id)}}},[t._v("详情")])],1)])}),0)]),i("div",{staticClass:"page"},[i("el-pagination",{attrs:{background:"","current-page":t.currentPage,"page-sizes":[10,50,100],"page-size":10,layout:"total, sizes, prev, pager, next, jumper",total:t.page.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)]),t.dialogVisible?i("el-dialog",{staticClass:"dialog",attrs:{width:"800px",visible:t.dialogVisible},on:{"update:visible":function(e){t.dialogVisible=e}}},[i("div",{staticClass:"header",attrs:{slot:"title"},slot:"title"},[i("el-tabs",{attrs:{value:"detail"}},[i("el-tab-pane",{attrs:{label:"详情",name:"detail"}})],1)],1),i("div",{staticClass:"part"},[i("div",{staticClass:"lside"},[t._v("订单信息")]),i("div",{staticClass:"rside"},[i("p",[t._v("订单编号： "+t._s(t.infoData.id))]),i("p",[t._v("订单状态： "+t._s(t.infoData.pay_status))]),i("p",[t._v("创建时间： "+t._s(t.infoData.create_time)+" ")])])]),i("div",{staticClass:"part"},[i("div",{staticClass:"lside"},[t._v("商品信息")]),i("div",{staticClass:"rside"},[i("el-table",{staticStyle:{width:"100%"},attrs:{data:t.infoData.goods_info,border:"","show-summary":""}},[i("el-table-column",{attrs:{prop:"id",label:"商品序号",width:"300"}}),i("el-table-column",{attrs:{prop:"name",label:"商品名称"}}),i("el-table-column",{attrs:{prop:"type_name",label:"所属产品"}}),i("el-table-column",{attrs:{prop:"goods_price",label:"价格"}})],1)],1)]),i("div",{staticClass:"part"},[i("div",{staticClass:"lside"},[t._v("用户信息")]),i("div",{staticClass:"rside"},[i("p",[t._v("用户名： "+t._s(t.infoData.user_name))]),i("p",[t._v("绑定手机号： "+t._s(t.infoData.phone))]),i("p",[t._v("用户积分： "+t._s(t.infoData.credit))])])]),i("div",{staticClass:"part"},[i("div",{staticClass:"lside"},[t._v("支付信息")]),i("div",{staticClass:"rside"},[i("p",[t._v("支付方式： "+t._s(t.pay_type))]),i("p",[t._v("支付金额： "+t._s(t.infoData.pay_price))]),i("p",[t._v("支付时间： "+t._s(t.infoData.pay_time))])])]),i("div",{staticClass:"part"},[i("div",{staticClass:"lside"},[t._v("分销信息")]),i("div",{staticClass:"rside"},[i("p",[t._v("分销用户： "+t._s(t.infoData.distributor_info.distributor_nick))]),i("p",[t._v("分销产品： "),t._l(t.infoData.goods_info,function(e){return i("span",[t._v(t._s(e.name))])})],2),i("p",[t._v("分销金额： "+t._s(t.infoData.pay_price))]),i("p",[t._v("分销提成："+t._s(t.infoData.distributor_info.reward_money)+"           ")])])]),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"info"},on:{click:function(e){t.dialogVisible=!1}}},[t._v("关闭")])],1)]):t._e()],1)},s=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("thead",[i("tr",[i("td",[t._v(" 序号  ")]),i("td",{attrs:{width:"150"}},[t._v(" 订单单号 ")]),i("td",{attrs:{width:"150"}},[t._v(" 用户名")]),i("td",[t._v(" 绑定手机号")]),i("td",[t._v(" 支付时间")]),i("td",[t._v(" 商品数量")]),i("td",[t._v(" 订单金额")]),i("td",[t._v(" 分销用户")]),i("td",[t._v(" 分销金额")]),i("td",[t._v(" 奖励金额 ")]),i("td",[t._v(" 结算状态")]),i("td",[t._v(" 操作")])])])}];i.d(e,"a",function(){return a}),i.d(e,"b",function(){return s})},273:function(t,e,i){"use strict";i.r(e);var a=i(1094),s=i(574);for(var n in s)"default"!==n&&function(t){i.d(e,t,function(){return s[t]})}(n);i(1071);var r=i(0),l=Object(r.a)(s.default,a.a,a.b,!1,null,"18e3ccb8",null);e.default=l.exports},388:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.info=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,s.request_get)("/read/distribute/setting",t)},e.save=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,s.request_put)("/read/distribute/setting",t)},e.cashList=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,s.request_get)("/read/distribute/cash",t)},e.cashDetail=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,s.request_get)(l(t),t)},e.cashUpdata=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,s.request_put)(d(t),t)},e.getList=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,s.request_get)("/read/distribute/distributes",t)},e.detail=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,s.request_get)(o(t),t)},e.settlement=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,s.request_put)("/read/distribute/cashs",t)},e.educe=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,s.request_get)("/read/distribute/export",t)},e.educes=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,s.request_get)("/read/cash/export",t)};var a,s=i(76),n=i(106),r=(a=n)&&a.__esModule?a:{default:a};var l=r.default.compile("/read/distribute/cash/:id"),o=r.default.compile("/read/distribute/distributes/:id"),d=r.default.compile("/read/distribute/cash/:id")},574:function(t,e,i){"use strict";i.r(e);var a=i(575),s=i.n(a);for(var n in a)"default"!==n&&function(t){i.d(e,t,function(){return a[t]})}(n);e.default=s.a},575:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e.default=t,e}(i(388)),s=i(290);e.default={mixins:[s.publicMixin],data:function(){return{services:a,pickerOptions:{},ctimePick:"",list:[],currentPage:1,page:"",multipleSelection:[],status:[{txt:"未结算",value:"0"},{txt:"已结算",value:"1"},{txt:"驳回兑付",value:"2"}],infoData:null,backMsg:"",stateValue:"",value:"",where:{pageOffset:10,pageStart:0,order_id:"",user_name:"",phone:"",status:""},dialogVisible:!1,activeName2:"first"}},methods:{getList:function(t){var e=this;a.getList(t).then(function(t){e.list=t.data,e.page=t.page})},addInfo:function(){this.dialogVisible=!0},del:function(t){var e=this;a.del({id:t}).then(function(t){e.getList(e.where)})},addsend:function(t){var e=this;this.$refs[t].validate(function(t){if(!t)return alert("error submit!!"),!1;a.save(e.infoAdd).then(function(t){e.getList(e.where)}),e.dialogVisible=!1,e.infoAdd={contents:"",title:"",type:""}})},search:function(){this.getList(this.where)},handleSizeChange:function(t){this.where.pageOffset=t,this.getList(this.where)},handleCurrentChange:function(t){this.where.pageStart=(t-1)*this.where.pageOffset,this.getList(this.where)},handleClick:function(){},detail:function(t){var e=this;a.detail({id:t}).then(function(t){log(t.data,321),e.infoData=t.data,e.dialogVisible=!0})},backMsgSend:function(){var t=this;a.save({feedback_id:this.infoData.data.id,content:this.backMsg}).then(function(e){t.$message.success("回复成功"),t.backMsg="",t.detail(t.infoData.data.id)})}},created:function(){this.getList(this.where)},watch:{ctimePick:function(){this.where.time_start=this.ctimePick[0],this.where.time_end=this.ctimePick[1]}},computed:{pay_type:function(){switch(this.infoData.pay_type){case 1:return"银行卡";case 2:return"支付宝";case 3:return"微信";default:return"无法获取"}}}}},576:function(t,e,i){}}]);