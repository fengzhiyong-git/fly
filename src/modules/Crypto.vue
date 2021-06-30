<template>
  <div>
    {{ msg }}
    <div>加密 {{ a }}</div>
    <div>解密 {{ b }}</div>
    <div>{{ time }}</div>

    <select-tree></select-tree>
  </div>
</template>
<script>
import crypto from "@/utils/crypto";
// import md5 from 'crypto-js'
import SelectTree from "@/components/SelectTree.vue";
export default {
  name: "Crypto",
  components: {
    SelectTree
  },
  data() {
    return {
      // msg: '49ba59abbe56e057',
      msg: "123456",
      a: "",
      b: "",
      time: ""
    };
  },
  created() {
    this.a = crypto.Encrypt(this.msg);
    this.b = crypto.Decrypt(crypto.Encrypt(this.msg));
    console.log(this.a); // 加密
    console.log(this.b); // 解密

    const encryptPassword = crypto.encryptMD5("123456").substring(8, 24);
    console.log("加密后：" + encryptPassword);
    // let decryptPassword = crypto.decryptMD5(encryptPassword);
    // console.log("解密后：" + decryptPassword);
  },
  mounted() {
    //  console.log(this.dayjs());
    //  console.log(this.dayjs().format('YYYY-MM-DD HH:mm:ss'));  // 当前时间 2021-01-13
    //  setInterval(() => {
    //    this.time = this.dayjs().format('YYYY-MM-DD HH:mm:ss')
    //  }, 1000);
  },
  methods: {}
};
</script>
