import React , {Component} from 'react'
import {Route} from 'react-router-dom'

import Cart from '../page/cart'
import GoodsList from '../page/goods-list'

export default class RouterIndex extends Component {
    render(){
        return(
            //这里不需要在外面嵌套Route，如果嵌套会导致Route不可用
            <div>
                <Route path='/cart' component={Cart} />
                <Route path='/goods-list' component={GoodsList}/>
           </div>
        )
    }
}