<template>
<div class="goods">
  <div class="menu-wrapper" ref="menuWrapper">
    <ul>
      <li v-for="(item, index) in goods" :key="item.id" class="menu-item" :class="{'current':compareY == index}"
      @click="selectMenu(index,$event)">
        <span class="text" >
          <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
          {{ item.name }}
        </span>
      </li>
    </ul>
  </div>
  <div class="food-wrapper" ref="foodWrapper">
    <ul>
      <li v-for="item in goods" :key="item.id" class="food-list food-list-hook">
        <h1 class="title">{{ item.name }}</h1>
        <ul>
          <li v-for="food in item.foods" :key="food.id" class="food-item">
            <div class="icon">
              <img  width="57px" height="57px" :src="food.icon">
            </div>
            <div class="content">
              <h2 class="name">{{ food.name }}</h2>
              <p class="desc">{{ food.description }}</p>
              <div class="extra">
                <span class="count">月销{{ food.sellCount }}</span><span>好评率{{ food.rating }}</span>
              </div>
              <div class="price">
                <span class="now">￥{{ food.price }}</span>
                <span class="old" v-show="food.oldPrice">￥{{ food.oldPrice }}</span>
              </div>
              <div class="carcontrol-wrapper">
                <carcontrol :food="food"></carcontrol>
              </div>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
  <shopcar :deprice="seller.deliveryPrice" :minprice="seller.minPrice" :selectFoods="this.selectFoods"></shopcar>
</div>
</template>
<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import Shopcar from '../shopcar/Shopcar'
import Carcontrol from  '../carcontrol/Carcontrol'

const ERR_OK = 0
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      goods: [],
      classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
      listHeight: [],
      scrollY: 0,
      // selectedItem: 0,
      // scrollCount: 0
    }
  },
  created () {
    this.$http.get('/api/goods').then(response => {
      response = response.body
      if (response.errno === ERR_OK) {
        this.goods = response.data
        // console.log(this.goods)
        this.$nextTick(() => {
          this._initScroll()
          this._calculateHeight()
        })
      }
    })
  },
  computed: {
    compareY () {
      for (let i = 0; i < this.listHeight.length; i++){
        if (this.scrollY < this.listHeight[i]) {
          this.selectedItem = i
          return i-1
        }
      }
      // console.log(this.selectedItem)
      // this.scrollCount += 1
      // let a = 'guolin'
      // let b = ''
      // let c = '                                                                                    '
      // let d = Math.floor(this.scrollCount/85)%2
      // let e = this.scrollCount%85
      // if (d == 1) {
      //   for (let i = 0; i < e; i++) {
      //   b += ' '
      //   }
      //   console.log(b+a)
      // }
      //  else{
      //   for (let i = 0; i < e; i++) {
      //   c=c.substring(0,c.length-1)
      //   }
      //   console.log(c+a)
      
    },
    selectFoods () {
      let foods = []
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if(food.count){
            foods.push(food)
          }
        })
      })
      return foods
    }
  },
  methods: {
    _initScroll () {
      this.meunScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      })
      this.foodScroll = new BScroll(this.$refs.foodWrapper, {
        probeType: 3,
        click: true
      })
      this.foodScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    _calculateHeight () {
      let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook')
      // console.log(foodList)
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i]
        height += item.clientHeight
        this.listHeight.push(height)
        // console.log(this.listHeight.length)
      }
    },
    selectMenu (index, event) {
      if (!event._constructed) {
        return;
      }
      let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook')
      let el = foodList[index]
      this.foodScroll.scrollToElement(el,300)
    }
  },
  components: {
    shopcar: Shopcar,
    carcontrol: Carcontrol
  }
}
</script>
<style lang="scss">
@import "src/common/sass/index.scss";
.goods {
  position: absolute;
  width: 100%;
  top: 174px;
  bottom: 46px;
  display: flex;
  overflow: hidden;
  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;
    .menu-item {
      display: table;
      height: 54px;
      width: 56px;
      line-height: 14px;
      padding: 0 12px;
      &.current {
        position: relative;
        margin-top:  -1px;
        z-index: 10;
        background: rgb(243, 239, 224);
        font-weight: 700;
        .text {
          @include border-none()
        }
      }
      .icon {
        display: inline-block;
          vertical-align: top;
          margin-right: 2px;
          width: 12px;
          height: 12px;
          background-size: 12px 12px;
          background-repeat: no-repeat;
          &.decrease {
            @include bg-image('decrease_3')
          }
          &.discount {
            @include bg-image('discount_3')
          }
          &.special {
            @include bg-image('special_3')
          }
          &.guarantee {
            @include bg-image('guarantee_3')
          }
          &.invoice {
            @include bg-image('invoice_3')
          }
      }
      .text {
        display: table-cell;
        font-size: 12px;
        width: 56px;
        @include border-1px(rgba(7,17,27,0.1));
        vertical-align: middle;
      }
    }
  }
  .food-wrapper {
    flex: 1;
    .title {
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: rgb(147, 153, 159);
      background: #f3f5f7;
    }
    .food-item {
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      @include border-1px(rgba(7,17,27,0.1));
      &:last-child {
        @include border-none;
      }
      .icon {
        margin-right: 10px;          
        flex: 0 0 57px;
      }
      .content {
        flex: 1;
        .name {
          line-height: 14px;
          margin: 2px 0 8px 0;
          height: 14px;
          font-size: 14px;
          color: rgb(7,17,27)
        }
        .desc {
          margin-bottom: 8px;
          line-height: 15px;
          font-size: 10px;
          color: rgb(147,153,159);
        }
        .extra {
          line-height: 10px;
          font-size: 10px;
          color: rgb(147,153,159);
          .count {
            margin-right: 12px;
          }
        }
        .price {
          font-weight: 700;
          line-height: 24px;
          .now {
            margin-right: 8px;
            font-size: 14px;
            color: rgb(240,20,20);
          }
          .old {
            text-decoration: line-through;
            font-size: 10px;
            color: rgb(147,153,159)
          }
        }
        .carcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 12px;
        }
      }     
    }
  }
}
</style>
