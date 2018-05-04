<template>
  <div class="login-view">
    <div class="login-area">
      <Form ref="formInline" :model="formInline" :rules="ruleInline">
          <FormItem prop="user">
              <i-input type="text" v-model="formInline.user" placeholder="请输入用户名">
                  <Icon style="width: 40px;" type="ios-person-outline" size="20" slot="prepend"></Icon>
              </i-input>
          </FormItem>
          <FormItem prop="password">
              <i-input type="password" v-model="formInline.password" placeholder="请输入密码">
                  <Icon style="width: 40px;" type="ios-locked-outline" size="20" slot="prepend"></Icon>
              </i-input>
          </FormItem>
          <FormItem style="text-align: center;margin: 0">
              <Button type="primary" long @click="handleSubmit('formInline')">登录</Button>
          </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  data: () => ({
    formInline: {
      user: '',
      password: ''
    },
    ruleInline: {
      user: [
        {
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }
      ],
      password: [
        {
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        },
        {
          type: 'string',
          min: 5,
          message: '密码必须大于6位',
          trigger: 'blur'
        }
      ]
    }
  }),
  created() {
    let user = sessionStorage.getItem('user')
    if (user) {
      this.$router.replace('/home/group/league-manage')
    }
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if(this.formInline.user=='admin' && this.formInline.password=='admin'){
            this.$router.replace('/home/')
          }else{
            this.$Message.error('账号密码不对!')
          }
        } else {
          this.$Message.error('登陆失败!')
        }
      })
    }
  }
}
</script>
<style scoped>
  .login-view{
    width: 100%;
    height: 100%;
    background:-webkit-gradient(linear, 0 0, 0 bottom, from(#519EFF), to(#04C3EA));
  }
  .login-area{
    width: 400px;
    padding: 20px;
    border-radius: 5px;
    background: #fff;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
</style>
