import React , {Component} from 'react'
import {Route} from 'react-router-dom'

import Cart from '../page/cart'
import GoodsList from '../page/goods-list'
import GoodsDetail from '../page/goods-detail'
import Order from '../page/order'
import Success from '../page/success'

export default class RouterIndex extends Component {
    render(){
        return(
            //这里不需要在外面嵌套Route，如果嵌套会导致Route不可用
            <div>
                <Route path='/cart' component={Cart} />
                <Route path='/goods-list' component={GoodsList}/>
                <Route path='/goods-detail/:id' component={GoodsDetail}/> 
                <Route path='/order' component={Order}/>
                <Route path='/success' component={Success}/>
           </div>
        )
    }
}