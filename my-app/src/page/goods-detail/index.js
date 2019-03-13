/* eslint-disable no-unused-expressions */


/*
Todo：
1.加入购物车需要一个toast来提醒加入购物车成功
*/ 
import React from 'react'
import GOODS from '../../data/data.json'
import './index.css'
class GoodsDetail extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            name:'',
            price:'',
            num: 1 ,
            id:'',
            pic:''
        }
    }
    componentDidMount(){
        for(let i=0;i<GOODS.length;i++){
            if(GOODS[i].id === this.props.match.params.id){
                this.setState({
                    name:GOODS[i].name,
                    price:GOODS[i].price,
                    pic:GOODS[i].pic,
                    id:GOODS[i].id
                })
            }
        }
    }
    decrease(){
        if(this.state.num === 1)
        return
        this.setState({
            num:this.state.num - 1
        })
    }
    increase(){
       
        this.setState({
            num:this.state.num + 1
        })
    }
    handInputChange(e){
        var reg = /^[0-9]*$/
        if(!reg.test(e.target.value))
        return
        this.setState({
            num:e.target.value
        })
        
    }
    addToCart(){

        var arr = JSON.parse(sessionStorage.getItem('user'))
        for(let i=0;i<arr.length;i++){
            if(this.state.id === arr[i].id){
                arr[i].num = arr[i].num + this.state.num
            }
        }
        sessionStorage.setItem('user',JSON.stringify(arr))
    }
    render(){
        
        return(
           <div className='good-detail-container'>
               <div className="good-pic"><img  src={this.state.pic} alt="pic"/></div>
               <div className='good-info'>
               <div className="good-name">{this.state.name}</div>
               <div className="good-price"><span>¥</span> {this.state.price}</div>
               <div className='num'>
                    <button onClick={() => {
                        this.decrease()
                    }}>-</button>
                    <input type="text" value={this.state.num} onChange={(e) => {
                        this.handInputChange(e)
                    }}/>
                    <button onClick={() => {
                        this.increase()
                    }}>+</button>
                </div>
                <div className="addToCart" onClick={()=>{this.addToCart()}}>加入购物车</div>
               </div>  
           </div>
        )                                                                                 
    }
}
export default GoodsDetail;