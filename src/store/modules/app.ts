/**
 *  @desc 整个app的设置信息
 */
import {
  VuexModule,
  Module,
  Action,
  Mutation,
  getModule
} from "vuex-module-decorators";
import router from "@/router"; // 本地配置的常态路由数据
import store from "@/store";
export enum DeviceType {
  Mobile,
  Desktop
}
export interface AppState {
  device: DeviceType;
  sidebar: {
    mini: boolean;
  };
  loginDailog: boolean;
  loading: boolean; // 是否开启loading效果
  loadingText: string;
  closeOnClick: boolean; // 点击菜单时是否隐藏二级菜单
  collapse: boolean; // sidebar是否最小化
  CurrentRoutePath: any;
}

@Module({ dynamic: true, store, name: "app" })
class App extends VuexModule implements AppState {
  public test = false;
  public device = DeviceType.Desktop;
  public sidebar = {
    mini: true
  };
  public loginDailog = true;
  public loading = false;
  public loadingText = "加载中...";
  public closeOnClick = true;
  public collapse = true;
  public detailId = ""; // 存储详情id 相同的保持填写状态，不同的重新就获取数据
  public CurrentRoutePath = ""; // 当前路由

  @Mutation
  private SET_CURRENTROUTEPATH(path: string) {
    this.CurrentRoutePath = path;
  }

  @Mutation
  private SET_SIDEBAR(opened: boolean) {
    this.sidebar.mini = opened;
  }

  @Mutation
  private SET_LOADING({ loading, text }: { loading: boolean; text?: string }) {
    this.loading = loading;
    text && (this.loadingText = text);
  }
  @Mutation
  private SET_LOGIN_DAILOGIN(dailog: boolean) {
    this.loginDailog = dailog;
  }

  @Mutation
  private SET_CLOSE_ON_CLICK(closeOnClick: boolean) {
    this.closeOnClick = closeOnClick;
  }

  @Mutation
  private SET_MINI_SIDEBAR(collapse: boolean) {
    this.collapse = collapse;
  }
  @Mutation
  private SET_DETAIL_ID(id: string) {
    this.detailId = id;
  }
  @Action
  public setSidebar(opened: boolean) {
    this.SET_SIDEBAR(opened);
  }
  @Action
  public setLoginDailog(dailog: boolean) {
    this.SET_LOGIN_DAILOGIN(dailog);
  }
  @Action
  /**
   * 控制全局loadi效果的开关
   */
  public setLoading(loadParam: { loading: boolean; text?: string }) {
    this.SET_LOADING(loadParam);
  }

  @Action
  public setCloseOnClick(closeOnClick: boolean) {
    this.SET_CLOSE_ON_CLICK(closeOnClick);
  }
  @Action
  public setMinSidebar(collapse: boolean) {
    this.SET_MINI_SIDEBAR(collapse);
  }
  @Action
  public setDetailId(id: string) {
    this.SET_DETAIL_ID(id);
  }
  @Action
  public setCurrentRoutePath(path: string) {
    this.SET_CURRENTROUTEPATH(path);
  }
}

export const AppModule = getModule(App);
