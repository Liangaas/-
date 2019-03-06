import React,{Component} from 'react'
import './index.css'

import { Icon,Input } from 'antd';


export default class GoodsList extends Component{
    render(){
        return(
            <div class='goods-list'>
            <div class='search'>
            <Icon type="search" /> <Input placeholder="  搜宝贝" />
            </div>
            <div class='price-section'>
            <Input placeholder="  ¥" /> - <Input placeholder="  ¥" />
            </div>
            </div>
        )
    }
} 