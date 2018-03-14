module.exports = {
  output: "mockapi", // 产出到项目下的 mockapi 目录，不用手动创建
  template: "axios", // 基于 easy-mock-templates 提供的 axios 模板
  projects: [
    {
      id: "59b0f2bae0dc663341a0cef7", // 例：58fef6ac5e43ae5dbea5eb53
      name: "show" // 该项目下的 API 生成之后会被放到 api/show 目录下
    },
    {
      id: "5aa88e678ed9a05f24bed96d", // 例：58fef6ac5e43ae5dbea5eb53
      name: "shop" // 该项目下的 API 生成之后会被放到 api/shop 目录下
    }
  ]
};