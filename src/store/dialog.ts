import { fa } from 'element-plus/es/locale';
import {defineStore } from 'pinia';
import{dialogNames} from './store-dialog-name'

export const useDialogs = defineStore(dialogNames.dialogs,{
    state:()=>{
      return{
        dialogFlag:false,
        routeId:0,
      }
    },
    // 修改值 同步异步都可以
    actions:{
      SETFLAG(flag :boolean){
       this.dialogFlag = flag;
      },
      SETROUTEID(id:number){
        this.routeId = id ;
      }

    },
    // 计算属性
    getters:{

    }
})