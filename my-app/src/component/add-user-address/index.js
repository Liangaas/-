
/*
1. 正则 ✅
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
        phoneNumber:'',
        infoCheck:{
          
          addressInfoEmpty:null,
          addressDetailEmpty:null,
          postalCodeEmpty:null,
          nameEmpty:null,
          phoneNumberEmpty:null,
          illegalPhoneNumber:false,
          illegaName:false

        }
      }
    
    

    closeWindow = () =>{
        this.props.callbackParent('')
    }

    //集联选择信息
    onChange=(value)=> {

        this.setState({
            addressArr:value,
            infoCheck:{
              ...this.state.infoCheck,
              addressInfoEmpty:false
            }
        })
      }

      //选择地址
    //   radioOnChange = (e) => {
    //     console.log('radio checked', e.target.value);
    //     this.setState({
    //       value: e.target.value,
    //     });
    //   }

    isPhoneNumber = (phoneNumber) => {
      const reg = /^0?(13[0-9]|15[0-3,5-9]|17[0,3,5-8]|18[0-9]|14[57]|19[89])[0-9]{8}$/;
      return reg.test(phoneNumber);
   }
    isName = (name) =>{
      const reg =  /^\s*[a-z0-9_()-][a-z0-9_() -]{0,23}[a-z0-9_()-]\s*$/i
      return reg.test(name);
    }
     
      getAddressDetail =(e)=>{
          const addressDetail = e.target.value
          let addressDetailEmpty = true
          if(addressDetail){
            addressDetailEmpty = false
          }else{
            addressDetailEmpty = true
          }
          this.setState({
            addressDetail: addressDetail,
            infoCheck:{
              ...this.state.infoCheck,
              addressDetailEmpty:addressDetailEmpty
            }
          })
      }
      getName =(e)=>{
          const name = e.target.value
          let nameEmpty = true
          if(name){
            nameEmpty = false
          }else{
            nameEmpty = true
          }
          let illegaName = false
          if(!this.isName(name)){
            illegaName =true
          }
          this.setState({
            name:e.target.value,
            infoCheck:{
              ...this.state.infoCheck,
              nameEmpty:nameEmpty,
              illegaName:illegaName
            }
          })
      }
     
      getPhoneNumber =(e)=>{
          const phoneNumber = e.target.value
          let phoneNumberEmpty = true
          if(phoneNumber){
            phoneNumberEmpty = false
          }else{
            phoneNumberEmpty = true
          }
          
          let illegalPhoneNumber = false
          if(!this.isPhoneNumber(phoneNumber)){
            illegalPhoneNumber = true
          }

          this.setState({
            phoneNumber:e.target.value,
            infoCheck:{
              ...this.state.infoCheck,
              phoneNumberEmpty:phoneNumberEmpty,
              illegalPhoneNumber:illegalPhoneNumber
            }
          })
      }
      getPostalCode =(e)=>{
        const postalCode = e.target.value
        let postalCodeEmpty = true
        if(postalCode){
          postalCodeEmpty = false
        }else{
          postalCodeEmpty = true
        }
        this.setState({
          infoCheck:{
            ...this.state.infoCheck,
            postalCodeEmpty:postalCodeEmpty
          }
        })
      }
      save=()=>{
        let flag = false
        let addressInfoEmpty = false
        let addressDetailEmpty = false
        let postalCodeEmpty = false
        let nameEmpty = false
        let phoneNumberEmpty = false

        if(this.state.infoCheck.addressInfoEmpty === null){
          
           addressInfoEmpty = true
           flag = true
        }
        if(this.state.infoCheck.addressDetailEmpty === null){
          addressDetailEmpty = true
          flag = true
       }
       if(this.state.infoCheck.postalCodeEmpty === null){
        postalCodeEmpty = true
        flag = true
       }
      if(this.state.infoCheck.postalCodeEmpty === null){
        postalCodeEmpty = true
        flag = true
      }
      if(this.state.infoCheck.nameEmpty === null){
        nameEmpty = true
        flag = true
      }
      if(this.state.infoCheck.phoneNumberEmpty === null){
        phoneNumberEmpty = true
        flag = true
      }
     
      if(flag === true){
   
        this.setState({
          infoCheck:{
            ...this.state.infoCheck,
            addressInfoEmpty:addressInfoEmpty,
            addressDetailEmpty:addressDetailEmpty,
            postalCodeEmpty:postalCodeEmpty,
            nameEmpty:nameEmpty,
            phoneNumberEmpty:phoneNumberEmpty

          }
        })
        return
      }

      console.log(this.state.infoCheck)

        if(this.state.infoCheck.addressInfoEmpty){
          return 
        }
        var address = this.state.addressArr
        address.push(this.state.addressDetail)
        var object = {
            address:address,
            name:this.state.name,
            phoneNumber:this.state.phoneNumber
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
                {this.state.infoCheck.addressInfoEmpty && <div className='error'>地址信息不能为空</div>}
                <div className="address-detail">详细地址：<Input onChange={this.getAddressDetail} placeholder="请输入详细地址信息,如道路、小区、楼栋号、单元等信息" /></div>
                {this.state.infoCheck.addressDetailEmpty && <div className='error'>详细地址不能为空</div>}
                <div className='postalCode'>邮政编码：<Input onChange={this.getPostalCode} placeholder="请输入邮政编码" /></div>
                {this.state.infoCheck.postalCodeEmpty && <div className='error'>邮政编码不能为空</div>}
                <div className='name'>收货人姓名：<Input onChange={this.getName} placeholder="长度不能超过25个字符" /></div>
                {this.state.infoCheck.illegalName && <div className='error'>收货人姓名为2-25个字符</div>}
                {this.state.infoCheck.nameEmpty && <div className='error'>收货人姓名不能为空</div>}
                <div className='phoneNumber'>
                手机号码：
                <Select defaultValue="86" style={{width:150}} >
                    <Option value="86">中国大陆 +86</Option>
                    <Option value="852">香港 +852</Option>
                    <Option value="853">澳门 +853</Option>
                </Select>
                <Input onChange={this.getPhoneNumber} placeholder="电话号码、手机号码必须填一项" />
                {this.state.infoCheck.illegalPhoneNumber&&!this.state.infoCheck.phoneNumberEmpty && <div className='error'>手机号码格式不正确，请重新输入</div>}
                {this.state.infoCheck.phoneNumberEmpty && <div className='error'>手机号不能为空</div>}
                </div>
            <button onClick={this.closeWindow}>取消</button>
            <button onClick={this.save} >保存</button>
            </div>
            </div>
        )
    }
}