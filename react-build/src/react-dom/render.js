
function _render(vnode, container) {
  if (vnode === undefined) return
  
  if (vnode.isReactComponent) {
    const component = vnode
    if (component._container) {
      if (component.componentDidUpdate) {
        component.componentDidUpdate()
      }
    } else if(component.componentDidMount) {
      component.componentDidMount()
    }
    component._container = container
    vnode = component.render()
  }

  if (typeof vnode === 'string' || typeof vnode === 'number') {
    let textNode = document.createTextNode(vnode)
    return container.appendChild(textNode)
  }

  const dom = document.createElement(vnode.tag)

  if (vnode.attrs) {
    Object.keys(vnode.attrs).forEach(key => {
        const value = vnode.attrs[key]
        if (key === 'className') key = 'class'
        // 如果是事件监听函数，则直接附加到dom上
        if (typeof value === 'function') {
            dom[key.toLowerCase()] = value
        } else {
            dom.setAttribute(key, vnode.attrs[key])
        }
    })
  }

  if (vnode.children) {
    vnode.children.forEach(child => _render(child, dom))
  }

  return container.appendChild(dom)

}

function render(vnode, container) {
  container.innerHTML = ''
  return _render(vnode, container)
}

export default render