
/*
1. 正则
2.toast 保存成功
3. callbackpardent 回去order页面没有触发到componentwillMount(如何做到关闭弹窗不刷新能实现数据更新)
*/

import React,{Component} from 'react'
import './index.css'
import {Cascader,Input,Select} from 'antd'

const options = [{
    value: '浙江',
    label: '浙江',
    children: [{
      value: '杭州',
      label: '杭州',
      children: [{
        value: '西湖',
        label: '西湖',
      }],
    }],
  }, {
    value: '江苏',
    label: '江苏',
    children: [{
      value: '南京',
      label: '南京',
      children: [{
        value: '中华门',
        label: '中华门',
      }],
    }],
  }];

  const Option = Select.Option

export default class AddUserAddress extends Component{

    state = {
        addressArr: [],
        addressDetail:'',
        name:'',
        tel:''
      }
    
    

    closeWindow = () =>{
        this.props.callbackParent('')
    }

    //集联选择信息
    onChange=(value)=> {
        this.setState({
            addressArr:value
        })
      }

      //选择地址
    //   radioOnChange = (e) => {
    //     console.log('radio checked', e.target.value);
    //     this.setState({
    //       value: e.target.value,
    //     });
    //   }

     
     
      getAddressDetail =(e)=>{
          this.setState({
            addressDetail:e.target.value
          })
      }
      getName =(e)=>{
          this.setState({
            name:e.target.value
          })
      }
     
      getTelNum =(e)=>{
          this.setState({
            tel:e.target.value
          })
      }
      save=()=>{
        var address = this.state.addressArr
        address.push(this.state.addressDetail)
        var object = {
            address:address,
            name:this.state.name,
            tel:this.state.tel
        }
        var arr = []
        if(sessionStorage.getItem('address')){
            arr = JSON.parse(sessionStorage.getItem('address'))
        }
        arr.push(object)
        sessionStorage.setItem('address',JSON.stringify(arr))
        window.location.href = '/order'
      }

    render(){
        return(
            <div className='window'>
            <div className='outerBox'>
            
                <div className="address-info">地址信息：<Cascader options={options} onChange={this.onChange} placeholder="请选择省/市/区/街道" /></div>
                <div className="address-detail">详细地址：<Input onChange={this.getAddressDetail} placeholder="请输入详细地址信息,如道路、小区、楼栋号、单元等信息" /></div>
                <div className='postalCode'>邮政编码：<Input placeholder="请输入邮政编码" /></div>
                <div className='name'>收货人姓名：<Input onChange={this.getName} placeholder="长度不能超过25个字符" /></div>
                <div className='telNum'>
                手机号码：
                <Select defaultValue="86" style={{width:150}} >
                    <Option value="86">中国大陆 +86</Option>
                    <Option value="852">香港 +852</Option>
                    <Option value="853">澳门 +853</Option>
                </Select>
                <Input onChange={this.getTelNum} placeholder="电话号码、手机号码必须填一项" />
                </div>
            <button onClick={this.closeWindow}>取消</button>
            <button onClick={this.save} >保存</button>
            </div>
            </div>
        )
    }
}