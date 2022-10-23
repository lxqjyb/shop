// 引入mockjs模块
import Mock from 'mockjs';
// JSON格式数据不需要对外暴露，也可以引入
import banner from './banner';
import floor from './floor';

// mock数据：第一个参数请求地址 第二个参数：请求得到的数据
Mock.mock("/mock/banner",{code:200,data:banner});
Mock.mock("/mock/floor",{code:200,data:floor});