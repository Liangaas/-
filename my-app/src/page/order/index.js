/**
 * 1. 购物车没有数据的arr.map
 * 2. 默认选择一个地址
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import {List,Table} from 'antd'
import './index.css'
import AddUserAddress from '../../component/add-user-address'

const columns = [
    {
    title: '店铺宝贝',
    dataIndex: 'goods',
    key: 'goods',
    render:((record) =>{
        return(
            <div>
                <img onClick={()=>window.location.href = '/goods-detail/'+record.id} src={record.pic} alt='pic'/>
                <span onClick={()=>window.location.href = '/goods-detail/'+record.id}>{record.name}</span>
            </div>
        )
    })

    
  }, {
    title: '单价',
    dataIndex: 'price',
    key: 'price',
  }, {
    title: '数量',
    dataIndex: 'num',
    key: 'num',
  },{
      title:'小计',
      dataIndex:'sum',
      key:'sum'
  }];

export default class Order extends Component{
    constructor(props){
        super(props)
        this.state = {
            goodsArr:[],
            address:[],
            allSum:0,
            addressText:'',
            username:'',
            phoneNumber:'',
            addNewAddressDiv:document.createElement('div')
        }
    }
    componentDidMount(){
        var goodsList  = JSON.parse(sessionStorage.getItem('user'))
        var addressList = JSON.parse(sessionStorage.getItem('address'))
        var sum = 0 
        console.log(goodsList)
        if(!addressList) addressList=[]
        if(goodsList.length > 0){
          for(let i=0;i<goodsList.length;i++){
              if(goodsList[i].checked !==true){
                  goodsList.splice(i,1)                                                                                  
              }
          }
       }
       goodsList=goodsList.map((ele) =>{

            return(
                {
                    goods:{
                        pic:ele.pic,
                        name:ele.name,
                        id:ele.id
                    },
                    price:ele.price,
                    num:ele.num,
                    sum:ele.price*ele.num
                }
            )

       })
        goodsList.forEach(element => {
            sum += element.sum
        });

        this.setState({
            goodsArr:goodsList,
            addressArr:addressList,
            allSum:sum

        })

    }
    addNewAddress(){
        ReactDOM.render(<AddUserAddress callbackParent={this.onChildChange}/>,this.state.addNewAddressDiv)
        document.getElementById('root').appendChild(this.state.addNewAddressDiv)
    }
    onChildChange = () =>{
        document.getElementById('root').removeChild(this.state.addNewAddressDiv)
    }

    radioSelect=(e)=>{
    
        var arr = e.target.value.split(';')
        console.log(arr)
        var addressText = arr[0].replace(/,/g," ")
        var username = arr[1]
        var phoneNumber = arr[2]
        this.setState({
            addressText:addressText,
            username:username,
            phoneNumber:phoneNumber
        })
    }


    render(){

        return(
            <div className='order-container'>
            <div className='confirm-address'>
             <h3>确认送货地址</h3>
                  <List
                        dataSource={this.state.addressArr}
                        renderItem={(ele, index) => (
                        <List.Item>
                        <input type="radio" value={ele.address+';'+ele.name+';'+ele.phoneNumber} onChange={this.radioSelect} name="killOrder" />
                        <div className='address'>{ele.address}</div>
                        <div className='name'>({ele.name} 收)</div>
                        <div className='phoneNumber'>{ele.phoneNumber}</div>                            
                        </List.Item>)}
                    />
                    <button className='addAdress' onClick={()=>{this.addNewAddress()}}>使用新地址</button>
            </div>
            <div className='confirm-address'>
            <h3>确认订单信息</h3>
            <Table dataSource={this.state.goodsArr} columns={columns}/>
            </div>
            <div className="allSum">
            <div className="actualPayment">实付款： <span>¥ </span>{this.state.allSum}</div>
            <div className="sendAddress">寄送至： {this.state.addressText}</div>
            <div className="receiver">接受人： {this.state.username}  {this.state.phoneNumber}</div>
            <button onClick={()=>window.location.href = '/cart'} className='backToCart'>返回购物车</button><button onClick={()=>window.location.href='/success'} className='submitOrder'>提交订单</button>
            </div>
            </div>
        )
    }
}