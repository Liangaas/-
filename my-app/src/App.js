import React, { Component } from 'react';
import logo from './logo.svg';
import Nav from './component/nav';
import Cart from './page/cart';
import GoodsDetail from './page/goods-detail';
import './App.css';

const LIST = [{
  text:'购物车',
  url:'/cart'
},{
  text:'百度',
  url:'http://www.baidu/com'
}];

const GOODS = [{
  name: 'iPhone 7',
  price: '6,888',
  amount: 37
}, {
  name: 'iPad',
  price: '3,488',
  amount: 82
}, {
  name: 'MacBook Pro',
  price: '11,888',
  amount: 15
}];

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className='nav_bar'>
           <Nav list={LIST}/>
        </div>
        <Cart/>
        <GoodsDetail list={GOODS}/>
      </div>
    );
  }
}

export default App;
