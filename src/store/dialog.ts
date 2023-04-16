import { defineStore } from "pinia";
import { dialogNames } from "./store-dialog-name";

export const useDialogs = defineStore(dialogNames.dialogs, {
  state: () => {
    return {
      dialogFlag: false,
      routeId: 0,
      loadingFlag: false,
    };
  },
  // 修改值 同步异步都可以
  actions: {
    SETFLAG(flag: boolean) {
      this.dialogFlag = flag;
    },
    SETROUTEID(id: number) {
      this.routeId = id;
    },

    SETLOADING(flag: boolean) {
      this.loadingFlag = flag;
    },
  },
  // 计算属性
  getters: {},
});
