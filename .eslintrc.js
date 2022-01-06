module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    // vue-eslint-plugin提供
    'plugin:vue/essential',
    // eslint自带,安装eslint就有,其中这个提供了两个项目,recommended 或者 all
    'eslint:recommended',
    // typescript的Eslint规则
    '@vue/typescript/recommended',
    // prettier代码格式化工具
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    //遇见console警告,提醒开发人员调试完成后删除console信息
    'no-console': 0,
    // 遇见debugger提醒，方便开发人员调试后剔除
    'no-debugger': 0,
    // 关闭不允许出现空对象
    'no-empty': 0,
    // 这个是vue-eslint-plugin的一个bug,root标签无法使用v-if,v-else
    'vue/valid-template-root': 0,
    // 处理换行符
    'linebreak-style': ['off', 'unix'],
    // 当箭头函数只有一个参数时,省略函数的括号
    'prettier/prettier': 0,
    // 禁止使用构造函数
    'no-new-object': ['error'],
    // 禁止使用 Array 构造函数创建数组,不直观
    'no-array-constructor': 2,
    // 禁止模块多出导入
    'no-duplicate-imports': 2,
    // 关闭不能在case语法中使用词法声明
    'no-case-declarations': 0,
    // 必须使用 === 和 !==,而不是== 和 !=
    eqeqeq: ['error', 'always'],
    // 关闭不允许出现空函数的限制，比如属性的默认值为对象或者数组时，就需要通过函数返回一个空数组或空对象
    'no-empty-function': 0,
    '@typescript-eslint/no-empty-function': 0,
    // 关闭eslint中只能使用esm问题,关闭后可以使用commonjs
    '@typescript-eslint/no-var-requires': 0,
    // 关闭ts中要求函数必须有返回类型
    '@typescript-eslint/explicit-module-boundary-types': 0,
    // 关闭ts中不允许出现any数据类型
    '@typescript-eslint/no-explicit-any': 0,
    // 可以使用禁止类型定义,如Object
    '@typescript-eslint/ban-types': 0,
    // 关闭ts中不能使用this
    '@typescript-eslint/no-this-alias': 0,
    // 变量未使用
    '@typescript-eslint/no-unused-vars': [0, { ignoreRestSiblings: true }],
    // 接口命名前缀，允许以 I 开头
    '@typescript-eslint/interface-name-prefix': 0,
    // 取消类型推断
    '@typescript-eslint/no-inferrable-types': 1,
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/class-name-casing': 0
  }
}
