/* @flow */

import { toArray } from '../util/index'

export function initUse (Vue: GlobalAPI) {
  Vue.use = function (plugin: Function | Object) {
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    // toArray，转数组，把参数中第一个去掉
    const args = toArray(arguments, 1)
    // 把 this(vue) 插入第一个元素的位置
    args.unshift(this)

    if (typeof plugin.install === 'function') {
      // 执行 install 进行注册
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
      // 如果插件是个函数，直接执行
      plugin.apply(null, args)
    }
    installedPlugins.push(plugin)
    return this
  }
}
