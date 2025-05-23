/// <reference types="vite/client" />


declare module "*.vue"{
  import { App, defineComponent } from "vue";
  const component: ReturnType<typeof defineComponent> & {
    install(app: App): void;
  };
  export default component;
}

declare module '*.ts';
declare module '*.js';