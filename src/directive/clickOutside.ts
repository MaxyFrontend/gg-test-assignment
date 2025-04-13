import type { DirectiveBinding } from 'vue'

export default {
    beforeMount(el: any, binding: DirectiveBinding<any>) {
        el.clickOutsideEvent = function (event: Event) {
            if (!(el === event.target || el.contains(event.target))) {
                binding.value(event)
            }
        }
        document.addEventListener('click', el.clickOutsideEvent)
    },
    unmounted(el: any) {
        document.removeEventListener('click', el.clickOutsideEvent)
    }
}
