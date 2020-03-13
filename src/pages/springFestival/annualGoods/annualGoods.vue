<template>
  <div ref="ele-exp" class="ele-exp-wrapper">
    <div class="e-w-header">
      <cjh-header :img="bannerImg" ruleName="活动规则" @click-rule="bindClickRule" :rule="true"></cjh-header>
    </div>
    <div class="cards">
      <div class="card1">
        <img :src="card1Img" alt />
      </div>
      <div class="card2">
        <img :src="card2Img" @click="gocollectrat" alt />
      </div>
    </div>
    <cjh-nav-scroll :navs="navs"></cjh-nav-scroll>
    <template v-for="(nav,nidex) in navs">
      <cjh-nav-content :key="nidex" class="goods-info">
        <cjh-title :img="iconGoodTitle" class="e-w-title">
          <span>{{nav}}</span>
        </cjh-title>
        <cjh-grid>
          <template v-for="item in goodsList[nav]">
            <cjh-goods-item
              :key="item.id"
              :imgSrc="item.imgUrl"
              :goodsId="item.id+''"
              :isGoDetail="true"
              @click="bindClickGoodsItem"
            >
              <div slot="goodsimg" class="g-i-xl">
                <img
                  :class="item.type == '3'||item.type == '4'?'i-bottom':'i-left-top'"
                  :src="item.type|goodstype"
                />
              </div>
              <div slot="infos" class="g-i-footer">
                <p class="info-top">{{item.name | namelen}}</p>
                <p class="info-down">
                  <span>￥{{item.price}}</span>
                  <img @click.stop="bindClickAddShopCar(item.id)" :src="iconShopCar" alt />
                </p>
              </div>
            </cjh-goods-item>
          </template>
        </cjh-grid>
      </cjh-nav-content>
    </template>

    <return-top></return-top>
    <go-shop-car :userinfo="userInfo"></go-shop-car>
  </div>
</template>

<script>
export default {
  name: 'ele-annual-goods',
  data () {
    return {
      bannerImg: require('@/assets/images/springFestival/annualGoods/exp-top-banner.jpg'),
      card1Img: require('@/assets/images/springFestival/annualGoods/card1.png'),
      card2Img: require('@/assets/images/springFestival/annualGoods/card2.png'),
      iconGoodTitle: require('@/assets/images/springFestival/annualGoods/icon-exp-good.png'),
      iconShopCar: require('@/assets/images/springFestival/icon-shopcar.png'),
      navs: [],
      activeIndex: 0,
      goodsList: {},
      userInfo: {
        memberId: 0,
        siteId: 2,
        uuId: ''
      }
    }
  },
  mounted () {
    document.title = '年货节'
    setTimeout(() => {
      var shareParams = {
        iconSrc: 'http://oss.njcjh.cn/20181120/cjh-logo.jpg',
        url: 'http://cpis.njcjh.cn/bss/totalDown',
        title: '开心过大年，高兴赶大集。',
        content: '凡在APP内“年货节”专题活动中购买商品，实满499元立减99元。'
      }

      this.$cjhNative.jsCallAppWebview(
        'jsCallAppTellHuoDongContent',
        JSON.stringify(shareParams)
      )
    }, 1000)

    // 获取用户信息
    if (
      !sessionStorage.getItem('collect-rat-card-siteId') ||
      !sessionStorage.getItem('collect-rat-card-memberId') ||
      !sessionStorage.getItem('collect-rat-card-uuid')
    ) {
      this.$cjhNative.appCallJsWebview('appCalljsInitPage', arg => {
        this.userInfo.memberId = arg.memberId
        this.userInfo.siteId = arg.siteId
        this.userInfo.uuId = arg.uuid
        sessionStorage.setItem('collect-rat-card-siteId', arg.siteId)
        sessionStorage.setItem('collect-rat-card-memberId', arg.memberId)
        sessionStorage.setItem('collect-rat-card-uuid', arg.uuid)
      })
    } else {
      this.userInfo.siteId = sessionStorage.getItem('collect-rat-card-siteId')
      this.userInfo.memberId = sessionStorage.getItem(
        'collect-rat-card-memberId'
      )
      this.userInfo.uuId = sessionStorage.getItem('collect-rat-card-uuid')
    }
    // 加载页面数据
    this.getListData()

    setTimeout(function () {
      var offsettop = sessionStorage.getItem('offsetTop')
      if (offsettop && offsettop > 0) {
        window.scroll(0, offsettop)
      }
    }, 1500)
  },
  filters: {
    goodstype (val) {
      let type = ''
      if (val === '1') {
        type = require('@/assets/images/springFestival/icon-bp.png')
      } else if (val === '2') {
        type = require('@/assets/images/springFestival/icon-top1.png')
      } else if (val === '3') {
        type = require('@/assets/images/springFestival/icon-dztj.png')
      } else if (val === '4') {
        type = require('@/assets/images/springFestival/icon-xlqg.png')
      } else if (val === '5') {
        type = require('@/assets/images/springFestival/icon-bm.png')
      }
      return type
    },
    namelen (val) {
      let name = ''
      if (val.length > 22) {
        name = val.substring(0, 22) + '...'
      } else {
        name = val
      }
      return name
    }
  },
  methods: {
    // 加载商品数据
    getListData () {
      this.$cjhLoading()
      var that = this
      that.$axios
        .post('/tac/nnyd/annualGoodsFestival.as?siteID=' + that.userInfo.siteId)
        .then(({ data: rdata }, reject) => {
          that.$cjhLoading.hide()
          that.goodsList = rdata.data.cjh
          for (let key in that.goodsList) {
            that.navs.push(key)
          }
        })
        .catch(error => {
          that.$cjhLoading.hide()
          that.$cjhLoading({
            message: `${error}`,
            mask: true
          })
        })
    },

    // 加入购物车
    bindClickAddShopCar (goodsId) {
      var params = {
        goodsId: '' + goodsId, // 商品编号id
        nums: 1 // 数量
      }
      this.$cjhNative.jsCallAppWebview(
        'jsCallApp2AddShopCar',
        JSON.stringify(params)
      )
    },

    // 查看活动规则
    bindClickRule () {
      this.$cjhRuleDialog({
        clazz: 'exp-dialog',
        title: '活动规则',
        content:
          '<p>活动时间：2019.12.1至2020.1.31</p>' +
          '<p>1、凡在APP“年货节”专题活动内购买的商品，满499元立减99元；</p>' +
          '<p>2、凡靠泊长江汇服务区（仅限兴隆洲和七坝服务区）大V客户均可摘取一个鼠年红包，单次靠泊只可参与一次；</p>' +
          '<p>3、活动期间，凡靠泊兆基兴隆洲站、七坝站和白沙站，现款加油即可领取定制挂历、福字一份发完截止；</p>' +
          '<p>4、鼠年红包非油券只限购买船员类商品。</p>',
        closeBtn: {
          width: '25',
          height: '25'
        },
        onCloseHandle (e) {
          console.log(e)
        }
      })
    },

    // 进入集福页面
    gocollectrat () {
      if (
        sessionStorage.getItem('collect-rat-card-siteId') &&
        sessionStorage.getItem('collect-rat-card-memberId') &&
        sessionStorage.getItem('collect-rat-card-uuid')
      ) {
        window.location.href =
          '/tac/imgdest/collectRatCard/rat.html#/?version=2.3.4'
      } else {
        const that = this
        that.$cjhMessage({
          message: '请登录长江汇App~'
        })
        setTimeout(() => {
          that.$cjhNative.jsCallAppWebview('jsCallApp2Login')
        }, 1000)
      }
    },

    // 查看商品详情
    bindClickGoodsItem () {
      var top =
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        window.pageYOffset
      sessionStorage.setItem('offsetTop', top)
      // 点击详情回调
      console.log('点击详情回调')
    },

    activeIndexChangeHandle (index) {
      // scroll滚动 滚动区域、nav导航栏的下标
      console.log(index)
      this.activeIndex = index
    }
  }
}
</script>
<style lang="less">
.cjh-rule-dialog {
  &.exp-dialog {
    .c-d-content {
      .d-c-body {
        height: 450px !important;
      }
    }
  }
}
</style>
<style lang="less" scoped>
.ele-exp-wrapper {
  min-height: calc(100vh - 300px);
  padding-bottom: 200px;
  background: @theme-bg-color;
  background-position: top left;
  background-size: 100%;
  /deep/.cjh-rule {
    line-height: 75px;
  }
  .cards {
    width: 100%;
    margin-bottom: -30px;
    position: relative;
    top: -50px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    div {
      width: 48%;
      img {
        width: 100%;
        height: auto;
      }
    }
  }
  /deep/.cjh-nav-scroll {
    z-index: 1000;
    background-image: url("../../../assets/images/springFestival/annualGoods/banner-bg.png");
    background-size: cover;
    .nav-item-active {
      color: @theme-color-desc;
      font-size: 30px;
      font-weight: normal;
    }
    .cjh-nav-item {
      flex: auto;
      -webkit-box-flex: auto;
      -webkit-flex: auto;
      min-width: 185px;
      font-size: 30px;
      border-right: none;
    }
    .cjh-nav-item::after {
      content: " ";
      width: 16px;
      height: 38px;
      background-image: url("../../../assets/images/springFestival/icon-bz.png");
      background-size: 100% 100%;
      float: right;
    }
    .cjh-nav-item:last-child {
      margin-right: 50px;
    }
  }
  .goods-info {
    .e-w-title {
      width: auto;
      margin: @theme-margin-space-main 0;
      position: relative;
      /deep/ img {
        width: 266px;
        height: auto;
        margin: 0 auto;
      }
      span {
        width: 100%;
        text-align: center;
        position: absolute;
        top: 1px;
        left: 0;
        font-size: 34px;
        font-weight: bold;
        color: #f2150e;
      }
    }
    .cjh-grid {
      width: 96%;
      margin: 0 auto;
      .cjh-goods-item {
        border-radius: 0 10px 10px 10px;
        /deep/.g-i-img {
          height: 340px;
          background-color: #ffffff;
          overflow: hidden;
          .g-i-xl {
            .i-left-top {
              position: absolute;
              top: 0;
              left: 0;
              width: 80px;
            }
            .i-bottom {
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
            }
          }
        }
        /deep/.g-i-infos {
          padding: 0;
          .i-i-price {
            display: none;
          }
        }
        .g-i-footer {
          height: 170px;
          background: url("../../../assets/images/springFestival/annualGoods/goods-bg.png");
          background-size: cover;
          .info-top {
            padding: 2px 5px;
            color: #fff;
            font-size: 27px;
            line-height: 45px;
            height: 90px;
            // text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            // text-overflow: ellipsis;
            // display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            // -webkit-box-orient: vertical;
            // word-break: break-all
          }
          .info-down {
            padding: 2px 15px 2px 10px;
            display: flex;
            justify-content: space-between;
            span {
              font-size: 36px;
              color: @theme-color-desc;
              font-weight: bold;
              padding-top: 10px;
            }
            img {
              width: 50px;
              height: 50px;
            }
          }
        }
      }
    }
  }
}
</style>
