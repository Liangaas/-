/* eslint-disable no-unused-expressions */
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
            pic:''
        }
    }
    componentDidMount(){
        for(let i=0;i<GOODS.length;i++){
            if(GOODS[i].id === this.props.match.params.id){
                this.setState({
                    name:GOODS[i].name,
                    price:GOODS[i].price,
                    pic:GOODS[i].pic
                })
            }
        }
    }
    render(){
        
        return(
           <div className='good-detail-container'>
               <div className="good-pic"><img  src={this.state.pic} alt="pic"/></div>
               <div className='good-info'>
               <div className="good-name">{this.state.name}</div>
               <div className="good-price"><span>¥</span> {this.state.price}</div>
               <div className='num'>
                    <button onClick={(e) => {
                        this.decrease(e)
                    }}>-</button>
                    <input type="text" value={this.state.num} onChange={(e) => {
                        this.handInputChange(e)
                    }}/>
                    <button onClick={(e) => {
                        this.increase(e)
                    }}>+</button>
                </div>
                <div className="addToCart">加入购物车</div>
               </div>  
           </div>
        )                                                                                 
    }
}
export default GoodsDetail;