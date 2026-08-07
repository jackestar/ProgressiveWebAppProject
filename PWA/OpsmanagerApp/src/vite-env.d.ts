/// <reference types="vite/client" />

declare module "preact" {
  namespace JSX {
    interface IntrinsicElements {
      "mdui-button": any;
      "mdui-button-icon": any;
      "mdui-card": any;
      "mdui-icon": any;
      "mdui-icon-chevron-right": any;
      "mdui-icon-person": any;
      "mdui-icon-key": any;
      "mdui-text-field": any;
    }
  }
}

export {};

