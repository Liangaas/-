import React,{Component} from 'react'
import './index.css'
import GOODS from '../../data/data.json'

import { Icon,Input } from 'antd';



export default class GoodsList extends Component{

    constructor(props) {
        super(props)
        this.state = {
            searchText:'',
            startPriceText:'',
            endPriceText:'',
            list:GOODS
        }
    }

    componentDidMount(){
        
    }
    locationTo = (url) => {
        window.location.href = url
    }
    addToCart = (item) =>{
        //模拟的情况，只有一个用户为user

        if(!sessionStorage.getItem('user')){

            let arr = []
            arr.push(item)
            sessionStorage.setItem('user',JSON.stringify(arr))
        }else{
            let arr = JSON.parse(sessionStorage.getItem('user'))
            let flag = false
            for(let i=0;i<arr.length;i++){
                if(item.id === arr[i].id){
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
    handleSearchTextChange = (e) =>{
        var searchInputText = e.target.value
        this.setState({
            searchText : searchInputText
        })
        
    }
    includeName = (item) => {
        return (item.name.toUpperCase().indexOf(this.state.searchText.toUpperCase())!== -1)
    }
    handleSearchRequest(){
        var arr = GOODS.filter(this.includeName)
        this.setState({
            list:arr
        })
    }
   
    handleStartPriceChange=(e)=>{
        var startPriceInputText = e.target.value
        this.setState({
            startPriceText:startPriceInputText
        })

    }
    handleEndPriceChange=(e)=>{
        var endPriceInputText = e.target.value
        this.setState({
            endPriceText:endPriceInputText
        })
    }
    withinPriceSection = (item) =>{      
        return (parseFloat(item.price)>=this.state.startPriceText&&parseFloat(item.price)<=this.state.endPriceText)||
        (parseFloat(item.price)<=this.state.startPriceText&&parseFloat(item.price)>=this.state.endPriceText)
    }
    handleFindRequest(){
        var arr = GOODS.filter(this.withinPriceSection)
        this.setState({
            list:arr
        })
    }

    render(){
        return(
            <div className='container'>
            <div className='header'>
            <div className='search'>
            
            <Icon type="search" /> <Input className='searchInput' type='text' onChange={this.handleSearchTextChange} placeholder="  搜宝贝" />
            <button onClick={()=>{this.handleSearchRequest()}}>搜索</button>
            </div>
            <div className='price-section'>
            <Input type='text' onChange={this.handleStartPriceChange} className='start-price' placeholder="  ¥" /> - <Input type='text' onChange={this.handleEndPriceChange} className='end-price' placeholder="  ¥" />
            <button onClick={()=>{this.handleFindRequest()}}>确定</button>
            </div>
            </div>
            <div className='goods-list'>
            {
                this.state.list.map((item,idx) => {
                    return(
                    <div className='good-item' key={idx} >
                    <img onClick={()=>{this.locationTo('/goods-detail/'+item.id)}} src={item.pic} alt='pic'/>
                    <div className='good-name'>{item.name}</div>
                    <div className='good-price' >¥{item.price}</div>
                    <div onClick={(e)=>{this.addToCart(item)}} className='img-cart'><img  src='/imgs/购物车.png' alt='购物车'></img></div>
                    </div>
                    )
                })
            }
            </div>
            </div>
        )
    }
} 

