import '@/assets/reset.scss'
import {createApp} from 'vue'
import App from '@/App.vue'
import HostTop from '@/components/HostTop/hostTop.vue'
import HostBottom from '@/components/HostBottom/hostBottom.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import Login from '@/components/login/index.vue'

//引入router并安装
import router from '@/router'
import pinia from '@/store'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

app.component('HostTop',HostTop)
app.component('HostBottom',HostBottom)
app.component('Login', Login)
app.use(router);
app.use(ElementPlus, {
  locale: zhCn,
});
app.use(pinia)
app.mount('#app')
