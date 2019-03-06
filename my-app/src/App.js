import React, { Component } from 'react';
import Cart from './page/cart';
import GoodsDetail from './page/goods-detail';
import './App.css';
import './index.css';
import {BrowserRouter as Router,Link,Route } from 'react-router-dom'; 
import {Icon} from 'antd'
import RouterIndex from './routers'


const GOODS = [{
  name: 'Apple/苹果 iPhone XR 移动联通电信4G手机双卡双待 苹果iPhoneXR',
  price: '6,288',
  amount: 1079,
  pic:'/imgs/iphoneXR.jpg'
}, {
  name: 'Xiaomi/小米 红米6 ai双摄8核全面屏智能学生老人拍照青春手机X正品官方旗舰店',
  price: '729',
  amount: 1000
}, {
  name: 'MacBook Pro',
  price: '11,888',
  amount: 15
}];

class App extends Component {
  render() {
    return (
      <div className="App">
      <Router>
        <div>
                <div class='nav'>
                <li><Link to='/cart'><Icon class='icon' type="shopping-cart" />  购物车</Link></li>
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
