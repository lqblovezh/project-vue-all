import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

//首页
const Wms = (resolve) => require(["@/components/wms"],resolve)
const Home = (resolve) => require(["@/components/wms/0-home"], resolve)

//书籍
const Book = (resolve) => require(["@/components/wms/1-product/book"], resolve)
const Classify = (resolve) => require(["@/components/wms/1-product/classify"], resolve)
const Copyright = (resolve) => require(["@/components/wms/1-product/copyright"], resolve)
const Typeface = (resolve) => require(["@/components/wms/1-product/typeface"], resolve)
const Comment = (resolve) => require(["@/components/wms/1-product/comment"], resolve)

//检索
const Search = (resolve) => require(["@/components/wms/2-search"],resolve)

//用户
const MemberList = (resolve) => require(["@/components/wms/4-user/list"], resolve)
const MemberFb = (resolve) => require(["@/components/wms/4-user/role"], resolve)
const Vip = (resolve) => require(["@/components/wms/4-user"], resolve)
const Setvip = (resolve) => require(["@/components/wms/4-user/setvip"], resolve)

//内容
const Special = (resolve) => require(["@/components/wms/3-content/special"],resolve)
const Help = (resolve) => require(["@/components/wms/3-content/help"],resolve)
const Banner = (resolve) => require(["@/components/wms/3-content/banner"],resolve)

//订单
const Strategy = (resolve) => require(["@/components/wms/4-user/role/strategy"],resolve)
const OrderManage = (resolve) => require(["@/components/wms/5-order"],resolve)

//统计
const Statistics = (resolve) => require(["@/components/wms/6-statistics"],resolve)
const DealStatistics = (resolve) => require(["@/components/wms/6-statistics/deal"], resolve)
const UserStatistics = (resolve) => require(["@/components/wms/6-statistics/user"], resolve)
const BookStatistics = (resolve) => require(["@/components/wms/6-statistics/book"], resolve)
const SearchStatistics = (resolve) => require(["@/components/wms/6-statistics/search"], resolve)

// 系统设置
const SystemSeting = (resolve) => require(["@/components/wms/7-systemSetting"], resolve)
const SectionSet = (resolve) => require(["@/components/wms/7-systemSetting/section"], resolve)
const MemberSet = (resolve) => require(["@/components/wms/7-systemSetting/merber"], resolve)
const Journal = (resolve) => require(["@/components/wms/7-systemSetting/journal"], resolve)

export default new Router({
  routes: [
    { path: '/', redirect: '/wms/home' },
    { path: '', component: Home },
    {
      path: '/wms/',
      component: Wms,
      children: [
        { path: '/', component: Home },
        { path: 'home', component: Home },
        { path: 'book', component: Book },
        { path: 'classify', component: Classify },
        { path: 'copyright', component: Copyright },
        { path: 'typeface', component: Typeface },
        { path: 'comment', component: Comment },
        { path: 'search', component: Search },
        { path: 'user', component: MemberList },
        { path: 'role', component: MemberFb },
        { path: 'vip', component: Vip },
        { path: 'setvip', component: Setvip },
        { path: 'special', component: Special },
        { path: 'help', component: Help },
        { path: 'banner', component: Banner },
        { path: 'strategy', component: Strategy },
        { path: 'orderManage', component: OrderManage },
        { path: 'statistics', component: Statistics },
        { path: 'dealStatistics', component: DealStatistics },
        { path: 'userStatistics', component: UserStatistics },
        { path: 'bookStatistics', component: BookStatistics },
        { path: 'searchStatistics', component: SearchStatistics },
        { path: 'systemSeting', component: SystemSeting },
        { path: 'sectionSet', component: SectionSet },
        { path: 'memberSet', component: MemberSet },
        { path: 'journal', component: Journal },
      ],
    },
  ],
})
