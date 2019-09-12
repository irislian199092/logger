let LogLevel
;(function() {
  LogLevel[(LogLevel["VERBOSE"] = 0)] = "VERBOSE"
  LogLevel[(LogLevel["INFO"] = 1)] = "INFO"
  LogLevel[(LogLevel["WARN"] = 2)] = "WARN"
  LogLevel[(LogLevel["ERROR"] = 3)] = "ERROR"
  LogLevel[(LogLevel["SILENT"] = Infinity)] = "SILENT"
})(LogLevel || (LogLevel = {}))

class Log {
  constructor() {
    this.prefix = `%c[ocfe]`
    this.level = LogLevel.VERBOSE
    this.enabled = true
    this.debugColor = this.setStyle("#bbbbbb", 13)
    this.infoColor = this.setStyle("#2196f3", 13)
    this.warnColor = this.setStyle("#ff00ff", 13)
    this.errorColor = this.setStyle("#e91e63", 13)
    this.sensorLog = null
  }
  setPrefix(prefix) {
    this.prefix = `%c[${prefix}]`
  }
  setSensorLog(sensorLog) {
    this.sensorLog = sensorLog
  }
  enable() {
    this.enabled = true
  }
  disable() {
    this.enabled = false
  }
  /**
   * 设置日志等级，只有当日志函数高于当前级别才会产生输出
   * @param {*} title
   * @return  {void}
   */
  setLevel(level) {
    this.level = level
  }
  debug(title, ...args) {
    if (!this.enabled || this.level > LogLevel.VERBOSE) return
    console.debug(`${this.prefix} ${title}`, this.debugColor, ...args)
    this.sensorLog &&
      this.sensorLog.track(`${title}`, "init", JSON.stringify(...args))
  }
  info(title, ...args) {
    if (!this.enabled || this.level > LogLevel.INFO) return
    console.log(`${this.prefix} ${title}`, this.infoColor, ...args)
    this.sensorLog &&
      this.sensorLog.track(`${title}`, "successed", JSON.stringify(...args))
  }

  warn(title, ...args) {
    if (!this.enabled || this.level > LogLevel.WARN) return
    console.warn(`${this.prefix} ${title}`, this.warnColor, ...args)
    this.sensorLog &&
      this.sensorLog.track(`${title}`, "failed", JSON.stringify(...args))
  }
  error(title, ...args) {
    if (!this.enabled || this.level > LogLevel.ERROR) return
    console.error(`${this.prefix} ${title}`, this.errorColor, ...args)
    this.sensorLog &&
      this.sensorLog.track(`${title}`, "failed", JSON.stringify(...args))
  }
  setStyle(hex, x) {
    return `color:${hex};font-size:${x}px;font-weight:bold;`
  }
}

export default Log
