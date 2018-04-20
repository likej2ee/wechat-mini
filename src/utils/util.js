let utils = {
  /**
   * 格式化时间
   */
  formatTime(date) {
    if (typeof date === 'number') {
      date = new Date(date)
    }
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()


    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  },

  /**
   * 格式化数字，不足2位补前补0exs
   */
  formatInteger(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }
}

module.exports = utils
