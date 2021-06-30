<template>
  <div>
    {{ msg }}
    <div>加密 {{ a }}</div>
    <div>解密 {{ b }}</div>
    <div>{{ time }}</div>

    <select-tree :tree-data="options"></select-tree>
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
      time: "",
      options: [
        {
          id: "1",
          name: "湖南省",
          children: [
            {
              id: "4",
              name: "长沙市",
              isDisabled: true
            },
            {
              id: "5",
              name: "永州市",
              // 默认展开
              isDefaultExpanded: true,
              children: [
                {
                  id: "6",
                  name: "零陵区"
                },
                {
                  id: "7",
                  name: "宁远县",
                  isNew: true
                }
              ]
            }
          ]
        },
        {
          id: "2",
          name: "湖北省",
          children: [
            {
              id: "8",
              name: "武汉市"
            }
          ]
        }
      ]
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
