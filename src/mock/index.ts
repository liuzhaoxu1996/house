import Mock from "mockjs";

Mock.setup({
  timeout: "500-2500" // 表示响应时间介于 200 和 600 毫秒之间，默认值是'10-100'。
});

Mock.mock("/login", "post", (req: any) => {
  const body = JSON.parse(req.body);
  if (body.username === "admin" && body.password === "111111") {
    return {
      code: 0,
      data: {
        username: "张三",
        phone: 18759394606,
        userId: Date.now().toString().slice(-6),
        age: 20,
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjI0MDA3MTYwLCJleHAiOjE2MjQ2MTE5NjB9.s403g3cl0L0IDvrkQb25B5wOu4wDJmAr4_KHHLmT6hg"
      },
      msg: "success"
    };
  } else {
    return {
      code: 500,
      data: {},
      msg: "用户名或密码错误"
    };
  }
});
