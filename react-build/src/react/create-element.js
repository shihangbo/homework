import Component from './component.js'

function createElement(tag, attrs, ...children) {
  if (tag.prototype && tag.prototype.render) {
    return new tag(attrs)
  } else if (typeof tag === 'function') {
    return tag(attrs || {})
  }

  return {
    tag,
    attrs,
    children
  }
}

export default createElement
