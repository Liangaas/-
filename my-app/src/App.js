import React, { Component } from 'react';
import Cart from './page/cart';
import GoodsDetail from './page/goods-detail';
import './App.css';
import './index.css';
import {BrowserRouter as Router,Link,Route } from 'react-router-dom'; 
import {Icon} from 'antd'
import RouterIndex from './routers'


class App extends Component {
  state = {
    cartNum:0
  }
  componentDidMount(){
      var arr=JSON.parse(sessionStorage.getItem('user'));
      console.log(arr)
      console.log(arr.length)
      if(arr){
      console.log(arr)
      this.setState({
        cartNum:arr.length
      })
    }
  }
  render() {
    return (
      <div className="App">
      <Router>
        <div>
                <div class='nav'>
                <li><Link to='/cart'><Icon class='icon' type="shopping-cart" />购物车{this.state.cartNum}</Link></li>
                <li><Link to='/goods-list'>宝贝列表</Link></li>    
                </div>
                {/* 如果RouterIndex在.nav里面，那么cart和goodslist模块也在.nav里面 */}
                <RouterIndex/>
        </div>
      </Router>
        
      </div>
    );
  }
}

export default App;
