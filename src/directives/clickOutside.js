export default {
  bind: (el, binding, vnode) => {
    el.clickOutsideEvent = event => {
      if (!(el === event.target || el.contains(event.target)) && el.style.display !== 'none') {
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent);
  },
  unbind: el => {
    document.body.removeEventListener('click', el.clickOutsideEvent);
  }
};
