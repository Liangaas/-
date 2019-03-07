import React,{Component} from 'react'
import './index.css'
import GOODS from '../../data/data.json'

import { Icon,Input } from 'antd';



export default class GoodsList extends Component{


    locationTo = (url) => {
        window.location.href = url
    }
    addToCart = (item) =>{
        //模拟的情况，只有一个用户为user
        console.log(item)
        if(!sessionStorage.getItem('user')){

            let arr = []
            arr.push(item)
            sessionStorage.setItem('user',JSON.stringify(arr))
        }else{
            let arr = JSON.parse(sessionStorage.getItem('user'))
            let flag = false
            for(let i=0;i<arr.length;i++){
                if(item.id === arr[i].id){
                    console.log('come inb')
                    arr[i].num++
                    flag = true
                }
            }
            if(flag === false){
            arr.push(item)     
            }  
            sessionStorage.setItem('user',JSON.stringify(arr))
            flag = false
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
                    <div onClick={(e)=>{this.addToCart(item)}} class='img-cart'><img  src='/imgs/购物车.png' alt='购物车'></img></div>
                    </div>
                    )
                })
            }
            </div>
            </div>
        )
    }
} 

