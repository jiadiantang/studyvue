import Vue from 'vue'
import app from './App.vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import router from './router.js'

import Vuex from 'vuex'
Vue.use(Vuex)
var car  = JSON.parse(localStorage.getItem('car')|| '[]')
var store = new Vuex.Store({
    state:{
        car:car,
    },
    mutations:{
        addToCar(state, goodsinfo){
            var flag = false;
            state.car.some(item=>{
                if(item.id==goodsinfo.id){
                    flag = true;
                    item.count+=parseInt(goodsinfo.count)
                    return true;
                }
            })

            if(!flag){
                state.car.push(goodsinfo)
            }

            localStorage.setItem('car', JSON.stringify(state.car))
        },
        updateGoodsInfo(state, goodsinfo){
            state.car.some(item=>{
                if(item.id==goodsinfo.id){
                    item.count = parseInt(goodsinfo.count);
                    return true;
                }
            })

            localStorage.setItem('car', JSON.stringify(state.car))
        },

        removeFromCar(state,id){
            state.car.some((item,i)=>{
                if(item.id==id){
                    state.car.splice(i,1)
                    return true;
                }
            })

            localStorage.setItem('car', JSON.stringify(state.car))
        },

        updateGoodsSelected(state, info){
            state.car.some(item=>{
                if(item.id==info.id){
                    item.selected = info.selected
                }
            })

            localStorage.setItem('car', JSON.stringify(state.car))
        }

    },
    getters:{
        getAllCount(state){
            var c= 0;
            state.car.forEach(item=>{
                c+=item.count;
            })
            return c;
        },
        getGoodsCount(state){
            var o = {};
            state.car.forEach(item=>{
                o[item.id] = item.count
            })
            return o;
        },
        getGoodsSelected(state){
            var o = {};
            state.car.forEach(item=>{
                o[item.id] = item.selected
            })
            return o;
        },
        getGoodsCountAndAmount(state){
            var o = {
                count:0,
                amount:0
            }

            state.car.forEach(item=>{
                if(item.selected){
                    o.count+=item.count;
                    o.amount+=item.price* item.count
                }
            })

            return o;
        }

    }
})



import moment from 'moment'
Vue.filter('dateFormat', function(dataStr, pattern="YYYY-MM-DD HH:mm:ss"){
    return moment(dataStr).format(pattern);
})

import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.root='http://www.studyvue.com/index.php/'
Vue.http.options.emulateJSON = true

// import {Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui'
// Vue.component(Header.name,Header)
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload)

import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'


import VuePreview from 'vue-preview'
Vue.use(VuePreview)

import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
var vm= new Vue({
    el:'#app',
    render:c=>c(app),
    router,
    store,
})