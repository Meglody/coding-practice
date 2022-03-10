### 练习
在本文件夹内写`index.ts`
### 测试
在本文件夹下的`test/`文件夹下测试
测试的时候使用`esm`导出类
### 跑A+测试
使用`cmd`导出类，即：`module.exports = YourPromise`
`npm run tsc-promise` 先编译成js文件`index.js`
`npm run test-promise` 测试A+