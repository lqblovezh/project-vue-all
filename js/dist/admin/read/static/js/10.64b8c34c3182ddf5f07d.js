(window.webpackJsonp=window.webpackJsonp||[]).push([[10,40],{1059:function(t,i){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGcSURBVDhPpVW7SkNBFJyzF6wsxEJBJGhhI0YsLCSNiEWw8hNE1GgjfoL4FYJoZWnhB4hFOgtBCARSBLFSAhLFQoIku87eV655eDfJlmfPzHnNnhX0OXofsxBkeT0FhQnfzeCLtjqaKKsrVHtBpdNoCsgYQZ7gmX7BQnud4Du5QCXpFxOaU+bxhpwx2GAWKoWsfa3wINMkPoO2xjbQkgGbA5FZBo0184qtKIJP6JdpMxv2CFb1EZbiDP2eDVJmr8At5G3bvHCa68MmF+MEY/jGuwqlMTJfKKus6APskHQuEakqLZRdIhgP85TXcgL7KfoQJzQGwuURD9dyjmcXQr2HSXg4Tvoqjv2v5nSgJ5cjzW5f0QXsEpxJpF2i2p9cCKnbBVaXi335NG3J2zSuuBCk+hi8KPvQUx1dHYRLI9wadVfMP34N+UDJH4jdGiMTahTlBj8BoV1B3BojkFbUZYCPJcMVdM/hPA5BWmGptxGua8H6W4MPnX0YTyFvUIXFKLO+hPbCbg1TwyIzDr6A6CXZLwD8AjhNOwDbs86gvxcYdUQqR3YTAAAAAElFTkSuQmCC"},1060:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.getList=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,s.request_get)("/read/head_books",t)},i.save=function(t){var i=t.id,e=c(t,["id"]);if(i)return(0,s.request_put)(o({id:i}),e);return(0,s.request_post)("/read/head_books",e)},i.detail=function(t){var i=t.id,e=c(t,["id"]);return(0,s.request_get)(o({id:i}),e)},i.del=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,s.request_post)("/read/head_books/delete",t)},i.sort=function(t){var i=t.id,e=c(t,["id"]);return(0,s.request_put)(u({id:i}),e)};var n,s=e(76),a=e(106),r=(n=a)&&n.__esModule?n:{default:n};function c(t,i){var e={};for(var n in t)i.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}var o=r.default.compile("/read/head_books/:id"),u=r.default.compile("/read/head_books/sort/:id")},1061:function(t,i,e){"use strict";var n=e(557);e.n(n).a},1102:function(t,i,e){"use strict";var n=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("div",[n("Nav"),n("div",{staticClass:"content"},[t._m(0),t._l(t.list,function(i,s){return n("div",{staticClass:"list"},[n("div",{staticClass:"item"},[n("el-input",{staticClass:"txtInput",attrs:{disabled:!i.id},model:{value:i.name,callback:function(e){t.$set(i,"name",e)},expression:"item.name"}}),n("span",{staticClass:"txt"},[n("a",{class:{decoration:!i.id},attrs:{href:"javascript:"},on:{click:function(e){i.id&&t.update(s)}}},[t._v(t._s(i.id?"修改":"       "))]),n("img",{staticClass:"iconc",attrs:{src:i.img_src}})]),n("span",{staticClass:"txt"},[t._v("顺序 :"),n("span",{staticClass:"color1"},[t._v("( "+t._s(s+1)+" )")])]),i.id?n("span",[1!=s?n("img",{staticClass:"icon up",attrs:{src:e(383),alt:"icon"},on:{click:function(i){return t.up(s)}}}):t._e(),s!=t.list.length-1?n("img",{staticClass:"icon down",attrs:{src:e(384),alt:"icon"},on:{click:function(i){return t.down(s)}}}):t._e(),n("img",{staticClass:"icon",attrs:{src:e(1059),alt:"icon"},on:{click:function(i){return t.del(s)}}})]):t._e()],1)])}),n("el-button",{staticClass:"add",attrs:{type:"text"},on:{click:t.add}},[n("img",{attrs:{src:e(385)}})]),n("el-dialog",{staticClass:"dialog",attrs:{title:t.name,visible:t.dialogVisible,width:"30%"},on:{"update:visible":function(i){t.dialogVisible=i}}},[n("span",[n("el-form",{ref:"ruleForm",attrs:{rules:t.rules,model:t.addlist}},[n("el-form-item",{attrs:{label:"模块",prop:"name"}},[n("el-input",{attrs:{placeholder:"请写点什么..."},model:{value:t.addlist.name,callback:function(i){t.$set(t.addlist,"name",i)},expression:"addlist.name"}})],1),n("el-form-item",{attrs:{prop:"src_img"}},[n("input",{ref:"icon",staticClass:"hide",attrs:{type:"file",accept:"image/jpeg,image/jpg,image/png"},on:{change:function(i){return t.previewImg(i)}}}),n("img",{staticClass:"icon",staticStyle:{"max-width":"200px"},attrs:{src:t.src_img}}),n("el-button",{staticStyle:{"margin-left":"20px"},attrs:{size:"mini",type:"primary",plain:""},on:{click:function(i){return t.$refs.icon.click()}}},[t._v(" 上传")])],1),n("p",{staticClass:"imgSize"},[n("span",{staticClass:"bannerSize"},[t._v("建议图片大小:60*60px")])])],1),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{staticStyle:{"margin-bottom":"30px"},on:{click:function(i){t.dialogVisible=!1}}},[t._v("取消")]),n("el-button",{on:{click:function(i){return t.submitForm("ruleForm")}}},[t._v(t._s(t.name))])],1)],1)])],2)],1)},s=[function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"info"},[i("img",{attrs:{src:e(327)}}),i("span",[this._v("系统自动显示前4个书城头部设置，排序4及以上的将会被隐藏。栏目名称限制为2-6个汉字以内。")])])}];e.d(i,"a",function(){return n}),e.d(i,"b",function(){return s})},248:function(t,i,e){"use strict";e.r(i);var n=e(390),s=e(315);for(var a in s)"default"!==a&&function(t){e.d(i,t,function(){return s[t]})}(a);e(387);var r=e(0),c=Object(r.a)(s.default,n.a,n.b,!1,null,"10bb6774",null);i.default=c.exports},267:function(t,i,e){"use strict";e.r(i);var n=e(1102),s=e(555);for(var a in s)"default"!==a&&function(t){e.d(i,t,function(){return s[t]})}(a);e(1061);var r=e(0),c=Object(r.a)(s.default,n.a,n.b,!1,null,"2daaadfc",null);i.default=c.exports},315:function(t,i,e){"use strict";e.r(i);var n=e(316),s=e.n(n);for(var a in n)"default"!==a&&function(t){e.d(i,t,function(){return n[t]})}(a);i.default=s.a},316:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default={data:function(){return{navTab:[{txt:"书城头部设置",href:"/wms/bookSettings/header",active:"active"},{txt:"分类设置",href:"/wms/bookSettings/sort",active:""}]}},methods:{handleNavClick:function(t){this.$router.push({path:this.navTab[t].href})},checkSrc:function(){var t=!0,i=!1,e=void 0;try{for(var n,s=this.navTab[Symbol.iterator]();!(t=(n=s.next()).done);t=!0){var a=n.value;this.$route.path==a.href?a.active="active":"/wms/bookSettings"==this.$route.path?this.navTab[0].active="active":a.active=""}}catch(t){i=!0,e=t}finally{try{!t&&s.return&&s.return()}finally{if(i)throw e}}}},created:function(){this.checkSrc()},watch:{$route:function(){this.checkSrc()}}}},317:function(t,i,e){},327:function(t,i){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGPSURBVDhPhVO/S8NQEL57TwuZhEhpQRAEoVAsOOkg2oxOddLBraODiILiZGgXUVxc/CMsKAj+BwXBtRgMiEInoeAkDoXX865p07RN2sALvLvv7rsf30MY+fLusW1gdhsJ1wkg23UjtQjImwF68Co339EQjF5y7tk+EJTZlhpN3M2DaIjg0V/5vIO9muna+sCce1oFwuIgEH/Y2exVsMCB6dCH0NBgnXiVSluJMWCOBouVnt6rV0dyOPh5qCKCgqG/Q7Ep6blX9hCG2YP+Ez8s5d3zZSUDS+p5cgIAQ2ZHybTjgWhPS8ANrKlwVePocBOEMBefjLIKkfQ0JmaxkjB63tnYYmcmBtDOOMWvtLOZ7WDHicMgQkvx+vyE7HaHTFkOb2QxDiPqVBpNTRQ2CkDAj74OeM0vsSQaa0q0LfKcNodxAqj7F9eNQMr3uzr3tnTLTIUBUKRMr3InwFX+R4XV1GgdsJR/w7eQd91UIE8sTdQfQF2hdSnBght6jWIQeYrCRCR9Vpm2DAy4Zyk7SvAPCiiObi2O17AAAAAASUVORK5CYII="},383:function(t,i){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAYCAYAAAD6S912AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEkSURBVEhLY2AYBcghoFZfJKJeX55ASqgw4VJsX1/PwvSfdTFQXoEqBr78/72egZHBgxTDQGqxulCjvtSHgZGxhlTDsBqoVl+p8f8/43JyDAPpYUTWqFVfz/P3/4/jjIwMOuQYeKOxkxHFy//+/5hPrmEwB8ANVK8vKwG6N4QclyHrARuoWV/hwvCfoZ1Sw+CR8pfhvwQjIyML1Qy81di5BOjCHqoZCDJInJGjkuH//wOUGgqPlIONjX+YGP9FAl36hBJDUdIhyCCN+jKL//8ZDsPC9D8DQ+PNxs4GYi3ByHo3GrtOMDL+zyTWAHR1WPPyjcbuOcDwXECOoTiLr++MnJnA8DxDqqE4DXzY2PjjPyNDKCPD/zekGopXPaigpaqBA24YADNRSiMxf6PpAAAAAElFTkSuQmCC"},384:function(t,i){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAYCAYAAAD6S912AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAERSURBVEhL7dS9DsFQFAfw/2k6Gg1sRoMH8AAGg5HBZkBSs0UiwWTxBCpBSLyGxMDgMQwGD0CI41SiUVpxb5tYdOly7q/no+cC/+e5A1xHnKuoqHTFCArmDkxmzEBIRQPu0SFCXgVzYn0zvFZRIEZbFfMFpW9pKXOhgzlnyDOEBmJ8xlpKzeiANAR5SuYLxrrYIwEXvNbQlHSLOpk9n7mDXENOXv2wmDsUJiSkVDMy0BhizsAgMvA+7iRagi7Dou5QqIcLmSgLuguDev5DB5ItycrfuXJ7yuiRje63H3lbPWOEjRy2vgVe43x32bAxktInOmjg9UUnWHJ9bVXRYHCKoyxmSTI9qKIf452LNlLw59gNK0U5AOXGWm0AAAAASUVORK5CYII="},385:function(t,i){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAfCAYAAAAfrhY5AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAANTSURBVFhHxVdBSBRhFH7v30ySlAohYamDaK5ll4QiRFqwU4cQKi8doluHvAi5Kuk4IuV68OapU1FBdBAEg6BAQeliByl0aG/CQpjRodJMZ57v/etuuzuz7jgr9sMuszPvve/9b977/m8RfK46o7PqEBy5RoC1QBRGhDAgVJKDa3yd5HtJDrXs4NbUF3Ns1U9YLGbUOPSg3rHVbQC6joAVxew5oQ0ieu+E8GliIL6wm31B8GbDqPgNf/rY+WZRwMIG02Ub2PtpZOSHl4kneP1wXzi0uTUOgJESgLUrAXxFUPct8/Hn/Fih/BuR/p5m5TjPATFcKrD48+6OEjk3qqMtK99n5hazY+aAy45TwFC5H8DpGIiouARXTkZb5r/NzElj6pUpe+odr7/0U2oiSCgF74jQToVxouzX5CPhVQc229PTkAGPGLFhv81ll4XaEg8fZXYgif+C9Vlf00D0wRoavSuJKvmScfILLPbZwPL7o2nKrHt2tKsaiJcbjBhXagc8NccHuBA1nhLmEgI5QGhAotazRuy0Esr09a72OTub4JbSXP1fFtViw0D3OM9hWz6+jJNzOHQvv7n2kucZo6taQdkY+1x0+5Gl9OnksWSOSwGWkDLPBDTpmTBhWMp+zOvhPwLZy17dtqjSRJT3jFlUaO9naeGDeXNF1qTsGabKCcPjIMwVLHTKq66zs5xsulqg7EmMDHT38wnmSTKSnRdzWYOjrgaNDHa/YJCaHCAHq3Y5pKaFXpcL7U7PPzeG6+PtUOOy2+V05HN+WYnmEulTSnmD+Do2TSg9Dqy5ggQI7EOwkBgeXdKnmoi9wIECODKpaTwNvqMyp/3GEebKtpWuBmkuX4uspnMX3oppRkyc7+k5/recJvhGbsd6BWRBQAhTaQKRcfKi6HxXmZ4QYPuiGddNnqNeI0ZvE5H9igO5hKWvTRUx4unpWjJH3qTNckBWZ2ZXRGWK2NOibx8XH1RPrKH4s+yQrh2KvBWVyZzfyoYlMZwAaRoFFcsHlmee5RV5eyJ6aRJJNTL7nQpeALL4Hd9ZMuPzXjGK/lfTYo/pV6SP7yR4jmWcpKtfd3TsyGu3d1HwtItoLpE+XMharQGEduVfKpeVr5NyQAllCnMJgfhJdBspdD4fQL9cNAAAAABJRU5ErkJggg=="},387:function(t,i,e){"use strict";var n=e(317);e.n(n).a},390:function(t,i,e){"use strict";var n=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",[e("div",{staticClass:"settingsNavTab"},[e("ul",t._l(t.navTab,function(i,n){return e("li",{class:i.active,on:{click:function(i){return t.handleNavClick(n)}}},[t._v(t._s(i.txt))])}),0)]),e("router-view")],1)},s=[];e.d(i,"a",function(){return n}),e.d(i,"b",function(){return s})},555:function(t,i,e){"use strict";e.r(i);var n=e(556),s=e.n(n);for(var a in n)"default"!==a&&function(t){e.d(i,t,function(){return n[t]})}(a);i.default=s.a},556:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=c(e(15)),s=function(t){if(t&&t.__esModule)return t;var i={};if(null!=t)for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&(i[e]=t[e]);return i.default=t,i}(e(1060)),a=e(77),r=c(e(248));function c(t){return t&&t.__esModule?t:{default:t}}i.default={components:{Nav:r.default},data:function(){var t=this;return{list:[],underList:["项目模板","主题模板","普通模板"],value:"",name:"添加",visible:!0,dialogVisible:!1,addlist:{},src_img:"",rules:{name:[{required:!0,message:"模块名不能为空",trigger:"change"},{validator:function(t,i,e){if(!/^[\u4E00-\u9FA5 0-9 A-Z a-z]+$/.test(i))return e("模块名称只能是中文字母或数字");e()},trigger:"change"}],src_img:[{validator:function(i,e,n){if(log(t.src_img,111),!t.src_img)return n("未选择图标");n()},trigger:"change"}]}}},created:function(){this.getList()},methods:{getList:function(){var t=this;s.getList().then(function(i){t.list=i.data,log(t.list,111)})},previewImg:function(t){var i=t.target.files[0];this.src_img=URL.createObjectURL(i)},up:function(t){var i=this;s.sort({id:this.list[t].id,status:"up"}).then(function(t){i.getList(),i.$message.success("上移成功")})},down:function(t){var i=this;s.sort({id:this.list[t].id,status:"down"}).then(function(t){i.getList(),i.$message.success("下移成功")})},update:function(t){this.dialogVisible=!0,this.name="修改",this.addlist.id=this.list[t].id,this.addlist.name=this.list[t].name,this.src_img=this.list[t].img_src},del:function(t){var i=this;this.$confirm("你真的要删除吗？").then(function(){s.del({id:i.list[t].id}).then(function(t){i.getList()})})},add:function(){this.dialogVisible=!0,this.name="添加",this.addlist.id="",this.addlist.name="",this.src_img=""},save:function(){var t,i=(t=n.default.mark(function t(){var i,e,r=this;return n.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(i=this.$refs.icon.files[0],e=this.$loading({text:"正在上传",background:"rgba(0, 0, 0, 0.8)"}),t.prev=2,!i){t.next=6;break}return t.next=6,(0,a.getTask)(i).then(function(t){r.addlist.img=t.data.path});case 6:t.next=11;break;case 8:t.prev=8,t.t0=t.catch(2),e.close();case 11:this.dialogVisible=!1,setTimeout(function(){e.close()},500),s.save(this.addlist).then(function(t){r.getList()});case 14:case"end":return t.stop()}},t,this,[[2,8]])}),function(){var i=t.apply(this,arguments);return new Promise(function(t,e){return function n(s,a){try{var r=i[s](a),c=r.value}catch(t){return void e(t)}if(!r.done)return Promise.resolve(c).then(function(t){n("next",t)},function(t){n("throw",t)});t(c)}("next")})});return function(){return i.apply(this,arguments)}}(),submitForm:function(t){var i=this;this.$refs[t].validate(function(t){if(!t)return!1;i.save()})}}}},557:function(t,i,e){}}]);