import Vue from 'vue'
import App from './App'
{{#router}}
import router from './router'
{{/router}}

Vue.config.productionTip = false

{{#if_eq setting "pc"}}
alert('这是pc端')
{{/if_eq}}
{{#if_eq setting "mobile"}}
alert('这是移动端')
{{/if_eq}}

{{#doSomething}}
  alert('doSomething')
{{/doSomething}}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  {{#router}}
  router,
  {{/router}}
  {{#if_eq build "runtime"}}
  render: h => h(App)
  {{/if_eq}}
  {{#if_eq build "standalone"}}
  components: { App },
  template: '<App/>'
  {{/if_eq}}
})
