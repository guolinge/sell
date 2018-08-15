<template>
    <div class="carcontrol">
        <transition name="move">
        <div class="car-decrease " v-show="this.food.count>0" @click="decreaseCart">
            
            <span class="inner icon-remove_circle_outline"></span>
            
        </div>
        </transition>
        <div class="car-count" v-show="this.food.count>0">{{ food.count }}</div>
        <div class="car-add icon-add_circle" @click="addCart"></div>
    </div>
</template>
<script>
import Vue from 'vue'
export default {
    props: {
        food: {
            type: Object
        }
    },
    created () {
        
    },
    methods: {
        addCart (event) {
            if(!event._constructed){
                return
            }

            if (!this.food.count) {
                Vue.set(this.food,'count',1)
            }else {
                this.food.count += 1
            }
             
            this.$root.eventHub.$emit('cart.add', event.target)
        },
        decreaseCart (event) {
            if(!event._constructed){
                return
            }
            this.food.count --
        }
    }
}
</script>
<style lang="scss">
@import "src/common/sass/index.scss";
.carcontrol {
    font-size: 0;
   .car-decrease {
      display: inline-block;
      padding: 6px;
      &.move-enter,&.move-leave-to {
           transition: all 0.4s linear;
          opacity: 0;
          transform: translate3d(48px,0,0);
          .inner {
           display: inline-block;
           font-size: 24px;
           line-height: 24px;
           color: rgb(0,160,220);
           transition: all 0.4s linear;
           transform: rotate(180deg)
          }     
      }
      &.move-enter-to,&.move-leave{
           transition: all 0.4s linear;
           opacity: 1;
           .inner {
           display: inline-block;
           font-size: 24px;
           line-height: 24px;
           color: rgb(0,160,220);
           transition: all 0.4s linear;
           transform: rotate(0)
          }     
      }
      .inner {
      display: inline-block;
      font-size: 24px;
      line-height: 24px;
      color: rgb(0,160,220);
    //   transition: all 0.4s linear;
      
      }
   }
   .car-count {
      display: inline-block;
      vertical-align: top;
      width: 12px;
      text-align: center;
      padding-top: 6px;
      font-size: 10px;
      font-weight: 700;
      line-height: 24px;
      color: rgb(147,153,159)
   }
   .car-add {
      display: inline-block;
      padding: 6px;
      font-size: 24px;
      line-height: 24px;
      color: rgb(0,160,220)
   }
}

</style>


