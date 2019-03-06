import React,{Component} from 'react'
import './index.css'

import { Icon,Input } from 'antd';
import Item from 'antd/lib/list/Item';

const GOODS = [{
    name: 'Apple/苹果 iPhone XR 移动联通电信4G手机双卡双待 苹果iPhoneXR',
    price: '6,288',
    id: '001',
    pic:'/imgs/iphoneXR.jpg'
  }, {
    name: 'Xiaomi/小米 红米6 ai双摄8核全面屏智能学生老人拍照青春手机X正品官方旗舰店',
    price: '729',
    id: '002',
    pic:'/imgs/红米6.jpg'
  
  }, {
    name: 'vivo iQOO生而强悍高通骁龙855处理器全面屏智能手机官方正品 vivo IQOO iQ00',
    price: '2998',
    id: '003',
    pic:'/imgs/vivo-IQOO.jpg'
  }];
  

export default class GoodsList extends Component{


    locationTo = (url) => {
        window.location.href = url
    }
    addToCart = (id) =>{
        //模拟的情况，只有一个用户为user
        if(!sessionStorage.getItem('user')){

            let arr = []
            arr.push(id)
            sessionStorage.setItem('user',JSON.stringify(arr))
        }else{
            let arr = JSON.parse(sessionStorage.getItem('user'));
            arr.push(id)        
            sessionStorage.setItem('user',JSON.stringify(arr))
        }
    }


    render(){
        return(
            <div class='container'>
            <div class='header'>
            <div class='search'>
            <Icon type="search" /> <Input placeholder="  搜宝贝" />
            </div>
            <div class='price-section'>
            <Input placeholder="  ¥" /> - <Input placeholder="  ¥" />
            </div>
            </div>
            <div class='goods-list'>
            {
                GOODS.map((item,idx) => {
                    return(
                    <div class='good-item' key={idx} >
                    <img onClick={()=>{this.locationTo('/goods-detail/'+item.id)}} src={item.pic} alt='pic'/>
                    <div class='good-name'>{item.name}</div>
                    <div class='good-price' >¥{item.price}</div>
                    <div onClick={()=>{this.addToCart(item.id)}} class='img-cart'><img  src='/imgs/购物车.png' alt='购物车'></img></div>
                    </div>
                    )
                })
            }
            </div>
            </div>
        )
    }
} 