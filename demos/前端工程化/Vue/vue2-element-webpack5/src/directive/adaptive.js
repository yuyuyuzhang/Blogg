import Vue from 'vue'
import { addResizeListener, removeResizeListener } from 'element-ui/src/utils/resize-event'

const doResize = (el, binding, vnode) => {
    const { componentInstance: $table } = vnode

    if (!$table) return
  
    if (!$table.height) {
      throw new Error(`el-$table must set the height. Such as height='100px'`)
    }

    const { value } = binding
    const bottomOffset = (value && value.bottomOffset) || 30
    const height = window.innerHeight - el.getBoundingClientRect().top - 50 - bottomOffset // 50 为 layout-footer 高度
    $table.layout.setHeight(height)
    $table.doLayout()
}

Vue.directive('table-height-adaptive', {
    bind(el, binding, vnode) {
        el.resizeListener = () => {
          doResize(el, binding, vnode)
        }
        addResizeListener(el, el.resizeListener)
    },
    inserted(el, binding, vnode) {
        doResize(el, binding, vnode)
    },
    unbind(el) {
        removeResizeListener(el, el.resizeListener)
    }
})