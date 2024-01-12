/// <reference types="vite/client" />
declare module "*.vue" {
    import type { DefineComponent } from "vue";
   
    const vueComponent: DefineComponent<{}, {}, any>;
   
    export default vueComponent;
  }
  //解决未定义.vue,

  declare module 'element-plus/dist/locale/zh-cn.mjs';