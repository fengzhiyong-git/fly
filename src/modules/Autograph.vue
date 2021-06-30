<template>
  <div>
    <div class="signature-area">
      <canvas class="canvasId" />
      <div class="el-mt-4">
        <el-button type="primary" @click="clear">清空</el-button>
        <el-button type="primary" @click="toBack">撤销</el-button>
        <el-button type="primary" @click="exportPng">确定</el-button>
        <div class="signature-preview">
          <span>签名预览:</span>
          <div
            class="signature-show"
            style="width:100px;height:200px;background-color:white;"
            :style="{
              backgroundImage: `url(${dataURL})`
            }"
          >
            <img :src="dataURL" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SignaturePad from "signature_pad";
export default {
  name: "Autograph",
  data() {
    return {
      SignaturePad: null,
      config: {
        velocityFilterWeight: 0.5,
        minWidth: 2,
        maxWidth: 7
      },
      dataURL: ""
    };
  },
  mounted() {
    this.initCanvas();
  },
  methods: {
    initCanvas() {
      const canvas = document.querySelector(".canvasId");
      this.SignaturePad = new SignaturePad(canvas, this.config);
      canvas.height = 300;
      canvas.width = 750;
    },
    clear() {
      this.SignaturePad.clear();
      this.dataURL = "";
    },
    toBack() {
      const data = this.SignaturePad.toData();
      if (data) {
        data.pop();
        this.SignaturePad.fromData(data);
      }
    },
    exportPng() {
      this.dataURL = this.SignaturePad.toDataURL();
    }
  }
};
</script>
