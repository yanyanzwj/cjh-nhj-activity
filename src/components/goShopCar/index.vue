<template>
  <div class="gocar-menu">
    <div class="menu-item" @click.stop="bindClickGoPage">
      <p class="enter-tips">查看购物车</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'go-shop-car',
  props: ['userinfo'],
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
    // 点击查看购物车
    bindClickGoPage () {
      if (this.userinfo.memberId && this.userinfo.memberId > 0 && this.userinfo.siteId) {
        this.$cjhNative.jsCallAppWebview('jsCallApp2ShopCar')
      } else {
        const that = this
        that.$cjhMessage({
          message: '请登录长江汇App~'
        })
        setTimeout(() => {
          that.$cjhNative.jsCallAppWebview('jsCallApp2Login')
        }, 1000)
      }
      console.log('点击查看购物车回调')
    }
  }
}
</script>
<style lang="less" scoped>
.gocar-menu {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: @theme-color-main;
  height: 100px;
  width: 100%;
  .menu-item {
    .enter-tips {
      text-align: center;
      color: #fff;
      font-size: 36px;
      line-height: 100px;
      letter-spacing: 2px;
    }
  }
}
</style>
