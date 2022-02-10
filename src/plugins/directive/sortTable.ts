import Vue from 'vue'
import Sortable from 'sortablejs'

// 实现table表格的拖拽
const insertAfter = (newNode: HTMLElement, referenceNode: HTMLElement) => {
  referenceNode.parentNode?.insertBefore(newNode, referenceNode.nextSibling)
}

/**
 *
 * @param dom 被拖拽的table表单Dom
 * @param index 第几列
 * @param type 增加或删除或清除，取值范围为add/remove/clear
 * @param className 具体类名
 */
const changeRowClassName = (dom: HTMLElement, type: string, index?: any, className?: string) => {
  const tHeader = dom.querySelector('.el-table__header-wrapper tr')
  const tBody: any = dom.querySelector('.el-table__body-wrapper tbody')
  const thDoms: any = tHeader?.getElementsByClassName('el-table__cell')
  const trDoms: any = tBody?.getElementsByClassName('el-table__row')
  for (let i = 0; i < trDoms.length; i++) {
    const tdDoms = trDoms[i].getElementsByClassName('el-table__cell')
    if (type === 'clear') {
      for (let i = 0; i < tdDoms.length; i++) {
        tdDoms[i].classList.remove('insert-after-col', 'insert-before-col')
        thDoms[i].classList.remove('insert-after-col', 'insert-before-col')
      }
    } else if (type === 'add') {
      setTimeout(() => {
        tdDoms[index].classList.add(className)
      }, 200)

      thDoms[index].classList.add(className)
    } else {
      tdDoms[index].classList.remove(className)
      thDoms[index].classList.remove(className)
    }
  }
}

// v-colSortable
Vue.directive('colSortable', {
  inserted(el, binding) {
    // 获取table头
    const tHeader = el.querySelector('.el-table__header-wrapper tr')
    const tBody: any = el.querySelector('.el-table__body-wrapper tbody')
    let curIndex = 0
    Sortable.create(tHeader, {
      animation: 180,
      delay: 0,
      chosenClass: 'sortable-chosen',
      dragClass: 'sortable-drag',
      onEnd: (evt: any) => {
        const { oldIndex, newIndex }: { oldIndex: number; newIndex: number } = {
          ...evt
        }
        changeRowClassName(el, 'clear')
        changeRowClassName(el, 'remove', oldIndex, 'selected-table-col')
        const trDoms: any = tBody?.getElementsByClassName('el-table__row')
        if (!trDoms || newIndex - oldIndex === 0) return
        const direction = newIndex - oldIndex > 0 ? 'right' : 'left'
        for (let i = 0; i < trDoms.length; i++) {
          const tdDoms = trDoms[i].getElementsByClassName('el-table__cell')
          const oldTd = tdDoms[oldIndex]
          const newTd = tdDoms[newIndex]
          direction === 'right' ? insertAfter(oldTd, newTd) : trDoms[i].insertBefore(oldTd, newTd)
        }
      },
      onChange: (evt: any) => {
        const { newIndex }: { newIndex: number } = { ...evt }
        changeRowClassName(el, 'clear')
        if (newIndex > curIndex) {
          // 向右插入
          changeRowClassName(el, 'add', newIndex, 'insert-after-col')
        } else {
          changeRowClassName(el, 'add', newIndex, 'insert-before-col')
        }
        curIndex = newIndex
      },
      onChoose: (evt: any) => {
        const { oldIndex, item }: { oldIndex: number; item: HTMLElement } = {
          ...evt
        }
        curIndex = oldIndex
        console.log(item.offsetWidth, 'offsetWidth')
      }
    })
  }
})
