import Vue from 'vue'
import App from './app.vue'
import router from './router/router'
new Vue({
    router,
    render:(h) =>h(App)
}).$mount('#app');