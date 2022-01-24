<template>
  <div class="wrap">
    <div class="swiper gallery-top" id="gallery-top" ref="swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide">slider1</div>
        <div class="swiper-slide">slider2</div>
        <div class="swiper-slide">slider3</div>
      </div>
    </div>
    <div class="swiper gallery-thumbs" id="gallery-thumbs" ref="thumbsSwiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide b">slider1</div>
        <div class="swiper-slide b">slider2</div>
        <div class="swiper-slide b">slider3</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
@Component({
  name: 'Template'
})
export default class Template extends Vue {
  private galleryTop: any = null
  private galleryThumbs: any = null
  galleryTopLunbo() {
    this.galleryTop = new Swiper('.gallery-top', {
      spaceBetween: 10,
      //   loop: true,
      loopedSlides: 5,
      thumbs: {
        swiper: this.galleryThumbs
      }
    })
  }

  galleryThumbsLunbo() {
    this.galleryThumbs = new Swiper('.gallery-thumbs', {
      spaceBetween: 10, //在slide之间设置距离（单位px）
      slidesPerView: 4, //设置slider容器能够同时显示的slides数量
      //   loop: true, //设置为true 则开启loop模式
      watchSlidesVisibility: true //防止不可点击
    })
    this.galleryTopLunbo()
  }

  mounted() {
    // this.galleryTopLunbo()
    this.galleryThumbsLunbo()
  }
}
</script>
<style lang="scss" scoped>
.wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.swiper {
  width: 100%;
  .swiper-wrapper {
    .swiper-slide {
      height: 400px;
      width: 100%;
      border: 1px solid #1491ed;
    }
    .b {
      //   width: 160px !important;
      height: 106px;
    }
  }
}
</style>
