// 整数
const Integer = /(^[0-9]\d*$)/;

const CheckZSValidNumber1 = (rule: any, value: any, callback: any) => {
  // debugger
  if (value === "" || value === null || value === undefined) {
    // rules.validFlag = false
    callback();
    //   callback(new Error('数据不能为空'))
  } else if (!Integer.test(value)) {
    callback(new Error("输入的数据有误"));
  } else {
    callback();
  }
};
const CheckZSValidNumber = (rule: any, value: any, callback: any) => {
  // debugger
  if (value === "" || value === null || value === undefined) {
    // rules.validFlag = false
    callback(new Error("数据不能为空"));
  } else if (!Integer.test(value)) {
    callback(new Error("输入的数据有误"));
  } else {
    callback();
  }
};

const rules = {
  flag: true,
  xdc: [{ required: true, validator: CheckZSValidNumber, trigger: "blur" }],
  gygc: [{ required: true, validator: CheckZSValidNumber, trigger: "blur" }],
  cd: [{ required: true, validator: CheckZSValidNumber, trigger: "blur" }],
  hh: [{ required: false, validator: CheckZSValidNumber1, trigger: "blur" }]
};

export default rules;
