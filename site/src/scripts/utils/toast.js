import Vue from 'vue';
import OriginToast from '../components/Toast';

const Toast = Vue.extend(OriginToast);

// toast缓存池
const toastCache = {
    cache: [],
    active: false,
    pop() {
        if(this.cache.length) {
            return this.cache.splice(0, 1)[0];
        }

        return new Toast({
            el: document.createElement('div'),
        });
    },
    push(instance) {
        this.cache.push(instance);
    },
    toggle() {
        this.active = !this.active;
    },
};

Toast.prototype.show = function() {
    this.visible = true;
    toastCache.toggle();
};
Toast.prototype.hide = function() {
    this.visible = false;
    toastCache.toggle();
};


/* global document:true */
const toastUtil = (options = {}) => {
    if(toastCache.active) return;

    let duration = options.duration || 3000,
        instance = toastCache.pop();

    instance.message = typeof options === 'string' ? options : options.message;
    options.type && (instance.type = options.type);
    options.position && (instance.position = options.position);

    document.body.appendChild(instance.$el);

    Vue.nextTick(() => {
        instance.show();

        instance.timer = setTimeout(() => {
            instance.hide();

            toastCache.push(instance);
        }, duration);
    });
};

export default toastUtil;
