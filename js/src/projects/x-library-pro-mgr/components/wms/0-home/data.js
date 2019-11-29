//格局化日期：yyyy-MM-dd
function formatDate(date) {
  let myyear = date.getFullYear()
  let mymonth = date.getMonth() + 1
  let myweekday = date.getDate()

  if (mymonth < 10) {
    mymonth = '0' + mymonth
  }
  if (myweekday < 10) {
    myweekday = '0' + myweekday
  }
  return myyear + '-' + mymonth + '-' + myweekday + ' 00:00:00'
}

//获得本周的开端日期
export function getWeekStartDate() {
  let now = new Date() //当前日期
  let nowDayOfWeek = now.getDay() //今天本周的第几天
  let nowDay = now.getDate() //当前日
  let nowMonth = now.getMonth() //当前月
  let nowYear = now.getYear() //当前年
  nowYear += nowYear < 2000 ? 1900 : 0 //
  let weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek)
  return formatDate(weekStartDate)
}

//获得本月的开端日期
export function getMonthStartDate() {
  let now = new Date() //当前日期
  let nowMonth = now.getMonth() //当前月
  let nowYear = now.getYear() //当前年
  nowYear += nowYear < 2000 ? 1900 : 0 //
  let monthStartDate = new Date(nowYear, nowMonth, 1)
  return formatDate(monthStartDate)
}

//获得今日的开端日期
export function getTodayStartDate() {
  let today = new Date()
  return formatDate(today)
}

//获得本月的开端日期
export function getYearStartDate() {
  let data = new Date()
  return formatDate(new Date(data.getFullYear(), 0, 1))
}
