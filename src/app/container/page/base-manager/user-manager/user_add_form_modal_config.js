/*
* @Date: 2019-04-08 14:12:50
* @Desc: 
*/
// eslint-disable-next-line
import React from 'react';


export default {
  url: "web/user/add",
  title: "",
  fieldItems: [
    {
      type: "input",
      name: "name",
      title: "姓名",
      rule: {
        required: true,
        pattern: /^[\u4E00-\u9FFF\w]+$/,
      },
      otherParams: {},
    },
    {
      type: "input",
      name: "account",
      title: "账号",
      rule: {
        required: true,
        pattern: /^\w+$/,
      },
      otherParams: {},
    },
    {
      type: "select",
      name: "departmentId",
      title: "单位",
      selectOptions: new Promise((resolve) => {
			      window.Get("web/department/listAll").then((ecode, data, ) => {
			        if (ecode === 0) {
			          resolve(data);
			        } else {
			          resolve([]);
			        }
			      });
			    }),
      rule: {
        required: true,
      },
      otherParams: {},
    },
    {
      type: "select",
      name: "sex",
      title: "性别",
      selectOptions: ["男", "女", ],
      rule: {
        required: true,
      },
      otherParams: {},
    },
    {
      type: "input",
      name: "phone",
      title: "联系方式",
      rule: {
        required: true,
        pattern: /^1\d{10}$/,
      },
      otherParams: {},
    },
    {
      type: "input",
      name: "idCard",
      title: "身份证号码",
      rule: {
        required: false,
        pattern: /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/,
      },
      otherParams: {},
    },
    {
      type: "select",
      name: "status",
      title: "是否可用状态",
      selectOptions: new Promise((resolve) => {
			   resolve(
				 [
				   {
					 label: "可用",
					 value: 1,
				   },
				   {
					 label: "不可用",
					 value: 0,
				   },
				 ],
			   );
			}),
      rule: {
        required: true,
      },
      otherParams: {},
    },
    {
      type: "input",
      name: "politicalStatus",
      title: "政治面貌",
      rule: {
        required: false,
      },
      otherParams: {},
    },
    {
      type: "input",
      name: "education",
      title: "学历",
      rule: {
        required: false,
      },
      otherParams: {},
    },
    {
      type: "input",
      name: "address",
      title: "联系地址",
      rule: {
        required: false,
      },
      otherParams: {
			  
			},
    },
    {
      type: "uploadImg",
      name: "icon",
      title: "头像地址",
      rule: {
        required: false,
      },
      otherParams: {},
    },
  ],
};
