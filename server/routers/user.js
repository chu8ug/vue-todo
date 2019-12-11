const Router = require('koa-router')

const userRouter = new Router({ prefix: '/user' })

userRouter.post('/login', async ctx => {
  const user = ctx.request.body
  if (user.username === 'chu8ug' && user.password === 'chu8ug123') { // 指定用户名和密码
    ctx.session.user = {
      username: 'chu8ug'
    }
    ctx.body = {
      success: true,
      data: {
        username: 'chu8ug'
      }
    }
  } else {
    ctx.status = 400
    ctx.body = {
      success: false,
      message: 'username or password error'
    }
  }
})

module.exports = userRouter
