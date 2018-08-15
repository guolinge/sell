<template>
<div class="shopcar">
  <div class="content">
  <div class="content-left">
    <div class="logo-wrapper">
      <div class="logo" :class="{'highlight':totalPrice[1]>0}">
        <i class="icon-shopping_cart" :class="{'highlight':totalPrice[1]>0}"></i>
      </div>
      <div v-show="totalPrice[1]>0" class="num">{{ totalPrice[1] }}</div>
    </div>
    <div class="price" :class="{'highlight':totalPrice[1]>0}">￥{{ totalPrice[0] }}</div>
    <div class="desc">另需配送费{{ deprice }}元</div>
  </div>
  <div class="content-right">
      <div class="pay" :class="{'enough':totalPrice[0]>=this.minprice}">
          {{ payDesc }}
      </div>
  </div>
  <div class="ball-container">
      <!-- <transition-group name="drop"
      v-on:before-enter='beforeEnter'
      v-on:enter="enter"
      v-on:after-enter="afterEnter"
      > -->
      <transition-group name="drop" 
       v-on:before-enter='beforeEnter'
       v-on:enter="enter"
       v-on:after-enter="afterEnter">
      <div v-for="(ball,index) in balls" :key="index" v-show="ball.show" class="ball">
          <div class="inner inner-hook"></div>
      </div>
      </transition-group>
      <!-- </transition-group> -->
  </div>
</div>
</div>
</template>

<script>
export default {
    props: {
        selectFoods: {
            type: Array,
            default () {
                return []
            }
        },
        deprice: {
            type: Number,
            default: 0
        },
        minprice: {
            type: Number,
            default: 0
        },
    },
    data () {
        return {
            balls:[
              {show: false},
              {show: false},
              {show: false},
              {show: false},
              {show: false}                     
            ],
            dropBalls: []
        }
    },
    created () {
        this.$root.eventHub.$on('cart.add', this.drop)
    },
    computed: {
        totalPrice () {
            let totalcount = [0,0]
            this.selectFoods.forEach((food) => {
                totalcount[0] += food.price * food.count
                totalcount[1] += food.count
            })
            return totalcount
        },
        payDesc () {
            if (this.totalPrice[0] === 0) {
                return `${ this.minprice }元起送`
            }else if (this.totalPrice[0] < this.minprice ) {
                return `还差${this.minprice-this.totalPrice[0]}元起送`
            }else {
                return `去结算`
            }
        }
    },
    methods: {
        drop (el) {
          for (let i = 0; i < this.balls.length; i++) {
              let ball = this.balls[i]
              if (!ball.show) {
                  ball.show = true
                  ball.el = el
                  this.dropBalls.push(ball)
                  return
              }
          }
        },
        beforeEnter: function (el) {
            console.log(el)
            let count = this.balls.length
            while (count--) {
                let ball = this.balls[count];
                if (ball.show) {
                    let rect = ball.el.getBoundingClientRect();
                    let x = rect.left - 20;
                    let y = -(window.innerHeight - rect.top - 45)
                    el.style.display = ''
                    el.style.webkitTransform = `translate3d(0px,${y}px,0)`
                    el.style.transform = `translate3d(0px,${y}px,0)`
                     let inner = el.getElementsByClassName('inner-hook')[0]
                     console.log(inner)
                     inner.style.webkitTransform = `translate3d(${x}px,0,0)`
                     inner.style.transform = `translate3d(${x}px,0,0)`
                }
            }
        },
        enter: function (el) {
            console.log('enter')
            /* eslint-disable no-unused-vars */
            let rf = el.offsetHeight
            this.$nextTick(() => {
                el.style.webkitTransform = 'translate3d(0,0,0)'
                el.style.transform = 'translate3d(0,0,0)'
                let inner = el.getElementsByClassName('inner-hook')[0]
                inner.style.webkitTransform = 'translate3d(0,0,0)'
                inner.style.transform = 'translate3d(0,0,0)'
             })
        },
        afterEnter: function (el) {
            let ball = this.dropBalls.shift();
            if (ball.show) {
                ball.show = false
                el.style.display = 'none';
            }
        }
    }
    
}
</script>

<style lang="scss">
.shopcar {
    position : fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    width: 100%;
    height: 48px ;
    .content {
        display: flex;
        background: #141d17;
        font-size: 0;
        .content-left {
            flex: 1;
            .logo-wrapper {
                display: inline-block;
                position: relative;
                top: -10px;
                margin: 0 12px;
                padding: 6px;
                width: 56px;
                height: 56px;
                box-sizing: border-box;
                vertical-align: top;
                border-radius: 50%;
                background: #141d17;
                .logo {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    text-align: center;
                    background: #2b342c;
                    &.highlight {
                            background: rgb(0,160,220);
                        }
                    .icon-shopping_cart {
                        font-size: 24px;
                        line-height: 44px;
                        color: #80858a;
                        &.highlight {
                            color: #fff;
                        }
                    }
                }
                .num {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 24px;
                    height: 16px;
                    line-height: 16px;
                    text-align: center;
                    border-radius: 16px;
                    font-size: 10px;
                    font-weight: 400;
                    color: #fff;
                    background-color: rgb(240,20,20);
                    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4)
                }
            }
            .price {
                display: inline-block;
                vertical-align: top;
                line-height: 24px;
                margin-top: 12px;
                box-sizing: border-box;
                padding-right: 12px;
                border-right: 1px solid rgba(255,255,255,0.1);
                font-size: 20px;
                font-weight: 700;
                color: rgba(255,255,255,0.4);
                &.highlight {
                    color: #fff
                }
            }
            .desc {
                display: inline-block;
                vertical-align: top;
                line-height: 24px;
                margin: 12px 0 0 12px;
                line-height: 24px;
                font-size: 12px;
                font-weight: 200;
                color: rgba(255,255,255,0.4);

            }
        }
        .content-right {
            flex: 0 0 105px;
            width: 105px;
            .pay {
                height: 48px;
                line-height: 48px;
                text-align: center;
                font-size: 16px;
                font-weight: 700;
                color: rgba(255,255,255,0.4);
                background: #2b333b;
                &.enough {
                    background: #00b43c;
                    color:#fff;
                }
            }
        }
    }
    .ball-container {
      .ball {
        position: fixed;
        left: 32px;
        bottom: 22px;
        z-index: 200;
        &.drop-enter {
        transition: all 1s linear;
        opacity: 1;
        .inner {
        transition: all 1s linear;
        }
        }
        &.drop-enter-to {
        transition: all 1s linear;
        opacity: 1;
        .inner {
        transition: all 1s linear;
        }
        }
        .inner {
               width: 16px;
               height: 16px;
               border-radius: 50%;
               background: rgb(0,160,220);
            //    transition: all 1s ;
               }
      }
    }
  
}

</style>


