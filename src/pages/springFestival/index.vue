<template>
  <div id="app" class="ele-app">
    <annualGoods></annualGoods>
  </div>
</template>

<script>
import annualGoods from './annualGoods/annualGoods'
export default {
  name: 'springFestival',
  data () {
    return {}
  },
  components: {
    annualGoods
  },
  methods: {
    doDoubleClick () {
      document.documentElement.addEventListener('dblclick', function (e) {
        e.preventDefault()
        return false
      })
      var agent = navigator.userAgent.toLowerCase()

      var iLastTouch = null // 缓存上一次tap的时间

      if (agent.indexOf('iphone') >= 0 || agent.indexOf('ipad') >= 0) {
        // 检测是否是ios

        document.addEventListener(
          'touchend',
          function (event) {
            var iNow = new Date().getTime()

            iLastTouch =
              iLastTouch || iNow + 1 /** 第一次时将iLastTouch设为当前时间+1 */

            var delta = iNow - iLastTouch

            if (delta < 500 && delta > 0) {
              event.preventDefault()

              return false
            }

            iLastTouch = iNow
          },
          false
        )
      }
    }
  },
  mounted () {
    this.doDoubleClick()
  }
}
</script>
<style lang="less">
html {
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  body {
    min-height: 100%;
  }
}
</style>
<style lang="less" scoped>
/*入场(离场)动画的时间段   */
.fade-enter-active {
  transition: all 0.5s ease;
}
/*离场动画的时间段   */
.fade-leave-active {
  transition: all 0.1s ease;
}
/*v-enter 是进入之前，元素的起始状态*/

.fade-enter {
  transform: translateX(600px);
  opacity: 0;
}
/*v-leave-to 离开之后动画的终止状态*/
.fade-leave-to {
  transform: translateX(-100px);
  opacity: 0;
}
.ele-app {
  min-height: 100%;
}
</style>
<style lang="less">
.ele-app {
  .cjh-header {
    overflow: hidden;
  }
}
</style>
<style lang="less" >
.cjh-rule {
  background-color: #fff !important;
  color: #5a5a5a !important;
  text-align: center;
  font-weight: bold;
  width: 160px !important;
  font-size: 28px !important;
}
.cjh-rule-dialog {
  z-index: 900 !important;
  .c-d-content {
    height: 750px !important;
    background-color: transparent !important;
    background-image: url("../../assets/images/springFestival/dialog-rule-title-bg.png");
    background-repeat: no-repeat;
    background-size: cover;
    top:16% !important;
  }
  .d-c-title{
    display: none;
  }
  .d-c-body{
    width: 94%;
    margin: 300px auto 0 !important;
    color: @theme-color-rule;
    text-align: left;
    line-height: 40px;
    font-size: 25px;
  }
  .d-c-close {
    width: 38px;
    height: 35px;
    color:#fff !important;;
    top: 150px !important;
    right: 15px !important;
    background: url('../../assets/images/springFestival/icon-close.png');
    background-size: 100% 100%;
    .svg-icon{
      display: none;
    }
  }
}
</style>
