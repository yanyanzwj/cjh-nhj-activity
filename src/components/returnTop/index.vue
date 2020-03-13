<template>
  <div class="gotop-menu">
    <div v-if="isshow" class="menu-item" @click="bindClickGoTop">
      <img :src="topImg" alt />
    </div>
  </div>
</template>
<script>
export default {
  name: 'return-top',
  data () {
    return {
      topImg: require('@/assets/images/springFestival/icon-return-top.png'),
      isshow: false
    }
  },

  mounted () {
    window.addEventListener('scroll', this.scrollToTop)
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollToTop)
  },

  methods: {
    // 点击图片回到顶部方法，加计时器是为了过渡顺滑
    bindClickGoTop () {
      const that = this
      let timer = setInterval(() => {
        let ispeed = Math.floor(-that.scrollTop / 5)
        document.documentElement.scrollTop = document.body.scrollTop =
          that.scrollTop + ispeed
        if (that.scrollTop === 0) {
          clearInterval(timer)
        }
      }, 16)
    },

    // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
    scrollToTop () {
      const that = this
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      that.scrollTop = scrollTop
      if (that.scrollTop > 60) {
        that.isshow = true
      } else {
        that.isshow = false
      }
    }
  }
}
</script>
<style lang="less" scoped>
.gotop-menu {
  background-color: transparent;
  height: 100px;
  position: fixed;
  bottom: 100px;
  right: 20px;
  .menu-item {
    img {
      width: 68px;
      height: auto;
    }
  }
}
</style>
