<template>
    <!-- 百度地图 -->
  <div class="map">
    <div>百度地图</div>
    <el-input class="inputBox" @change="search" v-model="input" placeholder="请输入内容"></el-input>
    <div class="configuration">
      <div
        class="t-center mb-8px pointer"
        :class="{ 'mb-0': !showConfig }"
        @click="clickHandler"
      >
        周边配置
      </div>
      <ul class="t-center" v-show="showConfig">
        <li v-for="(item, index) in configList" :key="index + '1'">
          <el-checkbox v-model="item.value" @change="changeConfig(item)">{{
            item.name
          }}</el-checkbox>
        </li>
      </ul>
    </div>
    <div id="container"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'

@Component({
  name: 'BaiduMap'
})
export default class BaiduMap extends Vue {
  private input = "";
  private map:any = null;
  private point:any = null;
  private centerMarker:any = null;
  private showConfig = false;
  private list:any = {
    公交: [],
    地铁: [],
    超市: [],
    餐饮: [],
    银行: [],
    学校: [],
    医院: []
  }
  private configList:any = [
    {
      name: "公交",
      value: "",
      icon: require("@/assets/map/bus.png")
    },
    {
      name: "地铁",
      value: "",
      icon: require("@/assets/map/dt.png")
    },
    {
      name: "超市",
      value: "",
      icon: require("@/assets/map/cs.png")
    },
    {
      name: "餐饮",
      value: "",
      icon: require("@/assets/map/cy.png")
    },
    {
      name: "银行",
      value: "",
      icon: require("@/assets/map/yh.png")
    },
    {
      name: "学校",
      value: "",
      icon: require("@/assets/map/school.png")
    },
    {
      name: "医院",
      value: "",
      icon: require("@/assets/map/yy.png")
    }
  ]

  // 初始化
  // private init(){
  //   this.map = new BMapGL.Map("container", { enableDblclickZoom: false, displayOptions: { building: false }}); // 创建Map实例
  //     this.point = new BMapGL.Point(112.892, 28.21268);
  //     this.map.centerAndZoom(this.point, 15); // 初始化地图,设置中心点坐标和地图级别

  //     this.map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
  //     this.map.addControl(new BMapGL.ScaleControl()); // 添加比例尺控件
  //     this.map.addControl(new BMapGL.ZoomControl({ anchor: "BMAPGL_ANCHOR_BOTTOM_RIGHT" })); // 缩放控件控件
  //     // this.map.addControl(new BMapGL.NavigationControl({ anchor: "BMAPGL_ANCHOR_TOP_LEFT" })); // 移动缩放控件

  //     var marker = new BMapGL.Marker(this.point);
  //     this.centerMarker = new BMapGL.Marker(this.point);
  //     this.map.addOverlay(marker); // 添加标注
  //     // marker.setAnimation(BMapGL_ANIMATION_BOUNCE); // 跳动动画
  //     // 创建多个标记点
  //     var marker1 = new BMapGL.Marker(new BMapGL.Point(112.852, 28.21267));
  //     // 标记点可拖拽
  //     var marker2 = new BMapGL.Marker(new BMapGL.Point(112.892, 28.23897),{ enableDragging: true });
  //     // this.map.addOverlay(marker1);
  //     // this.map.addOverlay(marker2);

  //     // 创建信息窗口
  //     var opts = {
  //       width: 200,
  //       height: 100,
  //       borderRadius:5,
  //       title: '长沙市',
  //     }
  //     var infoWindow = new BMapGL.InfoWindow('地址：湖南省长沙市岳麓区麓谷企业文化广场B3栋', opts)
  //     // 标记点添加点击事件
  //     marker.addEventListener('click', () => {
  //       this.map.openInfoWindow(infoWindow, this.point)
  //     })

  //     // 卫星地图
  //     this.map.addControl(new BMapGL.MapTypeControl({mapTypes: [BMAP_NORMAL_MAP,BMAP_HYBRID_MAP],anchor: BMAP_ANCHOR_TOP_RIGHT}));

  //     // 绘制覆盖物
  //     var bd = new BMapGL.Boundary();
  //     var that = this;
  //     bd.get('岳麓区', function (rs) {
  //         var hole = new BMapGL.Polygon(rs.boundaries, {
  //             fillColor: 'blue',
  //             fillOpacity: 0.2
  //         });
  //         that.map.addOverlay(hole);
  //     });

  //     // 关键字检索功能
  //     // var local = new BMapGL.LocalSearch(this.map, {
  //     //   renderOptions:{map: this.map}
  //     // });
  //     // local.search("长沙");

  //     /* --------------------------城市切换控件start--------------------------- */
  //     // this.map.enableScrollWheelZoom();
  //     // this.map.enableInertialDragging();
  //     // this.map.enableContinuousZoom();

  //     // var size = new BMap.Size(10, 20);
  //     // this.map.addControl(new BMap.CityListControl({
  //     //     anchor: BMAP_ANCHOR_TOP_LEFT,
  //     //     offset: size,
  //     //     // 切换城市之前事件
  //     //     onChangeBefore: function(){
  //     //       //  debugger
  //     //     },
  //     //     // 切换城市之后事件
  //     //     // onChangeAfter:function(){
  //     //     //   alert('after');
  //     //     // }
  //     // }));
  //     /* --------------------------城市切换控件end----------------------------- */
  //     /* -----------------------缩略地图控件stsrt------------------------- */
  //     // var overView = new BMap.OverviewMapControl();
  //     // var overViewOpen = new BMap.OverviewMapControl({isOpen:true, anchor: BMAP_ANCHOR_BOTTOM_RIGHT});
  //     // this.map.addControl(overView);          //添加默认缩略地图控件
  //     // this.map.addControl(overViewOpen);      //右下角，打开
  //     /* -----------------------缩略地图控件end------------------------- */
  // }

  // changeConfig(val: any) {
  //     var local = new BMapGL.LocalSearch(this.map, {
  //       renderOptions: { map: this.map },
  //       onMarkersSet: array => {
  //         // console.log(array, '````````')
  //         this.List[val.name] = array;
  //         this.initMarker()
  //       }
  //     });
  //     if (val.value) {
  //       local.searchNearby(val.name, this.point, 1000);
  //     } else {
  //       this.List[val.name] = [];
  //       this.initMarker();
  //     }
  //   }
    clickHandler(){
      this.showConfig = !this.showConfig;
    }
    // initMarker() {      // 周边服务
    //   this.map.clearOverlays()
    //   this.map.addOverlay(this.centerMarker)
    //   // 创建信息窗口
    //   var opts = {
    //     width: 'auto',
    //     height: 'auto',
    //     title: '麓谷企业广场',
    //   }
    //   var infoWindow = new BMapGL.InfoWindow('岳麓区', opts)
    //   this.centerMarker.addEventListener('click', () => {
    //     this.map.openInfoWindow(infoWindow, this.point)
    //   })
    //   for (let k in this.List) {
    //     if (this.List[k].length > 0) {
    //       let icons = this.configList.filter(val => {
    //         return k === val.name
    //       }).map(v => {
    //         return v.icon
    //       })
    //       this.List[k].forEach((item) => {
    //         var Icon = new BMapGL.Icon(
    //           icons[0],
    //           new BMapGL.Size(26, 26)
    //         )
    //         var pt = new BMapGL.Point(item.point.lng, item.point.lat)
    //         var marker = new BMapGL.Marker(pt, {
    //           icon: Icon,
    //         })
    //         // 将标注添加到地图
    //         this.map.addOverlay(marker)
    //         // 创建信息窗口
    //         var opts = {
    //           width: 'auto',
    //           height: 'auto',
    //           title: item.title,
    //         }
    //         var infoWindow = new BMapGL.InfoWindow(item.address, opts)
    //         marker.addEventListener('click', () => {
    //           this.map.openInfoWindow(infoWindow, pt)
    //         })
    //       })
    //     }
    //   }
    // }
    search(){
      // 关键字检索功能
      // var local = new BMapGL.LocalSearch(this.map, {
      //   renderOptions:{map: this.map}
      // });
      // local.search(this.input);
    }
  mounted() {
    // this.init();
  }
}
</script>

<style lang="scss" scoped>
.map /deep/{
  position: relative;
  .inputBox{
    width: 300px;
    position: absolute;
    right: 50px;
    top: 30px;
  }
  ul{
    margin: 0;
    padding: 0;
    li{
      list-style: none;
    }
  }
}
#container {
  width: 800px;
  height: 400px;
  white-space: wrap;
  margin: 0 auto;
}
.configuration {
  color: #000;
  font-size: 14px;
  width: 90px;
  background: #ffffff;
  position: absolute;
  right: 400px;
  top: 35px;
  z-index: 1001;
  line-height: 29px;
  border: 1px solid #cccccc;
}
.mb-0 {
  margin-bottom: 0;
}
.t-center {
  text-align: center;
}
// .mb-8px {
//   // margin-bottom: 8px;
// }
.pointer {
  cursor: pointer;
}
</style>
