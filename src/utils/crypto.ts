const CryptoJS = require("crypto-js"); //引用AES源码js

const key = CryptoJS.enc.Utf8.parse("49ba59abbe56e057"); //十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse("49ba59abbe56e057"); //十六位十六进制数作为密钥偏移量

//CBC加密方法
function Encrypt(word: any) {
  const srcs = CryptoJS.enc.Utf8.parse(word);
  const encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.ciphertext.toString().toUpperCase();
}

//CBC解密方法
function Decrypt(word: any) {
  const encryptedHexStr = CryptoJS.enc.Hex.parse(word);
  const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  const decrypt = CryptoJS.AES.decrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}
// CBC java解码
// private final static String password = "2020081720200817";//目前使用
// private final static String IV = "2020081720200817";//目前使用

// public static String decryptAES(String content) throws Exception {
//     SecretKeySpec skeySpec = new SecretKeySpec(password.getBytes("ASCII"), "AES");
//     Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
//     IvParameterSpec iv = new IvParameterSpec(IV.getBytes());
//     cipher.init(Cipher.DECRYPT_MODE, skeySpec, iv);
//     byte[] encrypted1 = Base64.decodeBase64(content);//先用bAES64解密
//     return new String(cipher.doFinal(encrypted1));
// }

// 前后端key一定要对应上
// 参考地址：https://blog.csdn.net/hj_001/article/details/108055295?ops_request_misc=%25257B%252522request%25255Fid%252522%25253A%252522161051004016780258026731%252522%25252C%252522scm%252522%25253A%25252220140713.130102334.pc%25255Fall.%252522%25257D&request_id=161051004016780258026731&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~first_rank_v2~rank_v29-6-108055295.pc_search_result_cache&utm_term=%E5%89%8D%E7%AB%AF%E5%8A%A0%E5%AF%86%E8%A7%A3%E5%AF%86%E4%B9%8BCrypto.js

const desKey = CryptoJS.enc.Utf8.parse("11");

//DES加密方法
function desEncrypt(message: any) {
  const encrypted = CryptoJS.DES.encrypt(message, desKey, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
}
//DES解密方法
function desDecrypt(ciphertext: any) {
  if (ciphertext === "" || ciphertext === null || ciphertext === undefined) {
    return "";
  }
  if (typeof ciphertext != "string") {
    ciphertext = ciphertext.toString();
  }
  const decrypted = CryptoJS.DES.decrypt(
    {
      ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
    },
    desKey,
    {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    }
  );
  return decrypted.toString(CryptoJS.enc.Utf8);
}

// const CBCIV = "49ba59abbe56e057";
const CBCIV = CryptoJS.enc.Utf8.parse("49ba59abbe56e057");
//MD5加密
function encryptMD5(data: any) {
  data = CryptoJS.MD5(data).toString();
  // debugger
  return data;
  // //data = CryptoJS.MD5('copyright.' + data + 'pms@2016').toString()
  // const key = CryptoJS.enc.Utf8.parse(CBCIV)
  // const secretData = CryptoJS.enc.Utf8.parse(data)
  // const encrypted = CryptoJS.AES.encrypt(secretData, key, {
  //   iv: CryptoJS.enc.Utf8.parse(CBCIV),
  //   mode: CryptoJS.mode.CBC,
  //   padding: CryptoJS.pad.Pkcs7
  // })
  // return encrypted.toString()
}

//MD5解密
function decryptMD5(data: any) {
  const key = CryptoJS.enc.Utf8.parse(CBCIV);
  const decrypt = CryptoJS.AES.decrypt(data, key, {
    iv: CryptoJS.enc.Utf8.parse(CBCIV),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}

export default {
  Encrypt,
  Decrypt,
  desEncrypt,
  desDecrypt,
  encryptMD5,
  decryptMD5
};
