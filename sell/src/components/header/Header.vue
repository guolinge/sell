<template>
  <div class='header'>
    <div class="content-wrapper">
      <div class="avatar">
        <img width='64' height='64' :src="seller.avatar" alt="头像">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{ seller.name }}</span>
        </div>
        <div class="description">
          {{ seller.description }}/{{ seller.deliveryTime}}分钟送到
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{ seller.supports[0].description }}</span>
        </div>
      </div>
      <div @click="detailShow=true" v-if="seller.supports" class="support-count">
        <span class="count">{{ seller.supports.length }}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div @click="detailShow=true" class="bulletin-wrapper">
      <span class="bulletin-title"></span><span class="bulletin-text">{{ seller.bulletin }}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%" >
    </div>
    <transition name="fade">
    <div v-show="detailShow" class="detail" >
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{ seller.name }}</h1>
          <div class="star-wrapper">
            <app_star :size='48' :score='seller.score'></app_star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul class="support" v-if="seller.supports">
            <li class="support-item" v-for="support in seller.supports" :key="support.id">
              <span class="icon" :class="classMap[support.type]"></span>
              <span class="text">{{ support.description }}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin">
            <p class="content">{{ seller.bulletin }}</p>
          </div>
        </div>
      </div>
      <div class="detail-close">
        <i @click="detailShow=false" class="icon-close"></i>
      </div>
    </div>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
import Star from '../star/Star.vue'
export default {
  name: 'Header',
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    app_star: Star
  },
  data () {
    return {
      detailShow: false,
      classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    }
  },
  created () {
    // this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  }
}
</script>
<style lang="scss">
@import "../../common/sass/index.scss";
.fade-enter-active, .fade-leave-active {
    // transition: opacity .5s;
    transition: 0.5s;
    opacity: 1;
 }
.fade-enter, .fade-leave-to {
    opacity: 0;
}
.header {
  overflow: hidden;
  position: relative;
  color: #fff;
  background: rgba(7,17,27,0.3);
  .content-wrapper {
    position: relative;
    font-size: 0;
    padding: 24px 12px 18px 24px;
    .avatar {
      display: inline-block;
      vertical-align: top;
      img {
        border-radius: 2px;
      }
    }
    .content {
      display: inline-block;
      margin-left: 16px;
      .title {
        margin: 2px 0 8px 0;
        .brand {
          display: inline-block;
          vertical-align: top;
          width: 30px;
          height: 18px;
          @include bg-image('brand');
          background-size: 30px 18px;
          background-repeat: no-repeat;
        }
        .name {
          margin-left: 6px;
          font-size: 16px;
          line-height: 18px;
          font-weight: bold;
        }
      }
      .description {
        margin-bottom: 10px;
        line-height: 12px;
        font-size: 12px;
      }
      .support {
        .icon {
          display: inline-block;
          vertical-align: top;
          margin-right: 4px;
          width: 12px;
          height: 12px;
          background-size: 12px 12px;
          background-repeat: no-repeat;
          &.decrease {
            @include bg-image('decrease_1')
          }
          &.discount {
            @include bg-image('discount_1')
          }
          &.special {
            @include bg-image('special_1')
          }
          &.guarantee {
            @include bg-image('guarantee_1')
          }
          &.invoice {
            @include bg-image('invoice_1')
          }
        }
        .text {
          line-height: 12px;
          font-size: 10px;
        }
      }
    }
    .support-count {
      position: absolute;
      right: 12px;
      bottom: 20px;
      padding: 0 8px;
      height: 24px;
      line-height: 24px;
      border-radius: 14px;
      background:rgba(0,0,0,0.2);
      text-align: center;
      .count {
        vertical-align: top;
        font-size: 10px;
      }
      .icon-keyboard_arrow_right {
        margin-left: 2px;
        font-size: 1px;
        line-height: 24px;
        
      }
    }
  }
  .bulletin-wrapper {
    background: rgba(7,17,27,0.2);
    position: relative;
    height: 28px;
    line-height: 28px;
    padding: 0 12px 0 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    .bulletin-title {
      margin-top: 7px;
      vertical-align: top;
      display: inline-block;
      width: 22px;
      height: 12px;
      @include bg-image('bulletin');
      background-size: 22px 12px;
      background-repeat: no-repeat;
    }
    .bulletin-text {
      vertical-align: top;
      margin:0 4px;
      font-size: 10px;
    }
    .icon-keyboard_arrow_right {
      position: absolute;
      font-size: 10px;
      right: 12px;
      top: 8px;
    }
  }
  .background {
     position: absolute;
     right: 0;
     top: 0;
     width: 100%;
     height: 100%;
     z-index: -1;
     filter: blur(5px)
  }
  .detail {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background: rgba(7,17,27,0.8);
    // transition: all 0.5s;
    // &.fade-enter-active, &.fade-leave-active {
    //   transition: opacity .5s;
    //   background: rgba(7,17,27,0.8);
    // }
    // &.fade-enter, &.fade-leave-to {
    //   opacity: 0;
    //   background: rgba(7,17,27,0);
    // }
    // &.fade-transition {
    //   opacity: 1;
    //   background: rgb(7,17,27);
    // }
    // &.fade-enter,&.fade-leave {
    //   opacity: 0;
    //   background: rgb(7,17,27);
    // }
    // filter: blur(5px);
    .detail-wrapper {
      min-height: 100%;
      min-width: 100%;
      .detail-main {
        margin-top: 64px;
        padding-bottom: 64px;
        .name {
          line-height: 16px;
          text-align: center;
          font-size: 16px;
        }
        .star-wrapper {
          text-align: center;
          margin-top: 18px;
          padding: 2px 0;
        }
        .title {
          width: 80%;
          margin: 28px auto 24px auto;
          display: flex;
          .line {
            flex: 1;
            position: relative;
            top: -8px;
            border-bottom: 1px solid rgba(255,255,255,0.2)
          }
          .text {
            padding: 0 12px;
            font-size: 14px;
            font-weight: 700;
          }
        }
        .support {
          width: 80%;
          margin: 0 auto;
          .support-item {
            padding: 0 12px;
            margin-bottom: 12px;
            font-size: 0;
            &:last-child {
              margin-bottom: 0;
            }
            .icon {
              display: inline-block;
              vertical-align: top;
              margin-right: 6px;
              width: 16px;
              height: 16px;
              background-size: 16px 16px;
              background-repeat: no-repeat;
              &.decrease {
                @include bg-image('decrease_2')
              }
              &.discount {
                @include bg-image('discount_2')
              }
              &.special {
                @include bg-image('special_2')
              }
              &.guarantee {
                @include bg-image('guarantee_2')
              }
              &.invoice {
                @include bg-image('invoice_2')
              }
            }
            .text {
              line-height: 16px;
              font-size: 12px;
            }
          }
        }
        .bulletin {
          width: 80%;
          margin: 0 auto;
          .content {
            padding: 0 12px;
            line-height: 24px;
            font-weight: 200;
            font-size: 12px;
          }
        }
      }
    }
    .detail-close {
        position: relative;
        width: 32px;
        height: 32px;
        margin: -64px auto 0 auto;
        clear: both;
        font-size: 32px;
        font-weight: 700;
      }
  }
}
</style>
