import Vue from "vue";
import Vuex from "vuex";
// import { IUserState } from './modules/user'
// import { IPermissionState } from './modules/permission'
// import { SidebarState } from './modules/sidebar'
// import { ITopSearch } from './modules/topSearch'
import { AppState } from "./modules/app";
// import { IGlobalFuncClass } from './modules/globalFunc'

Vue.use(Vuex);

export interface RootState {
  // user: IUserState
  // permission: IPermissionState
  // sidebar: SidebarState
  app: AppState;
  // GlobFunc: IGlobalFuncClass
  // TopSearch: ITopSearch
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<RootState>({});
