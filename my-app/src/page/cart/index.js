import React,{Component} from 'react';
import GOODS from '../../data/data.json'
import './index.css';

  


export default class Cart extends Component{
    constructor(props){
        super(props)
        this.state = {
            arr:[],
            totalPrice:0
        }
    }

    componentDidMount(){
     if(sessionStorage.getItem('user')){
        var list = JSON.parse(sessionStorage.getItem('user'))
        console.log(list)
        this.setState({
            arr:list
        })
        }
      }

      componentDidUpdate(){
       

        //检测是否是全选了

        var bool=this.state.arr.every((ele,index)=>{
            if(ele.checked==true){
                return true
            }else {
                return false
            }
        })
        // console.log(bool)
        if(bool==true){
            this.refs.allSelected.checked=true
        }else {
            this.refs.allSelected.checked=false
        }
    }

    //获取输入框的值
    handInputChange=(e,i)=>{
        var reg = /^[0-9]*$/
        this.setState({
            arr:this.state.arr.map((ele,index)=>{
                if(index==i){
                    if(reg.test(ele.num)){
                    ele.num=e.target.value
                    }else{
                        ele.num = 1
                    }
                    return ele
                }else {
                    return ele
                }
            })
        })
        this.SumPrice()
    }

    //增加
    increase=(e,i)=>{
        console.log(e.target.value)
        //文本框的值 e.target.value 需要赋值给 json 数据的下标为index
        this.setState({
            arr:this.state.arr.map((ele,index)=>{
                if(index==i){
                    ele.num=ele.num*1+1
                    return ele
                }else {
                    return ele
                }
            })
        })
        this.SumPrice()
 
    }

    //减少
    decrease=(e,i)=> {
       
        this.setState({
            arr: this.state.arr.map((ele, index) => {
                if (index == i) {
                    if(ele.num<=1){
                        ele.num = 1
                        return ele
 
                    }else{
                        ele.num = ele.num*1-1
                        return ele
 
                    }
 
                } else {
                    return ele
                }
            })
        })
        this.SumPrice()
    }

    //删除
    delete=(e,i)=>{
        let arr = this.state.arr.filter((ele,index)=>{
            if(index !=i ){
                return true
            }
        })
        sessionStorage.setItem('user',JSON.stringify(arr))
        this.setState({
            arr:arr
        })
    }

     //获取单选框的值
     getCheckedChange=(e,i)=>{
        this.setState({
            arr:this.state.arr.map((ele,index)=>{
                if(index==i){
                    ele.checked=e.target.checked
                    return ele
                }else {
                    return ele
                }
            })
        })
        this.SumPrice()
    }

    //点击全选和全不选
    CheckedChange=(e)=>{
        if(e.target.checked==true){
            this.setState({
                arr:this.state.arr.map((ele,index)=>{
                    ele.checked=true
                    return ele
                })
            })
 
        }else if(e.target.checked==false){
            this.setState({
                arr:this.state.arr.map((ele,index)=>{
                    ele.checked=false
                    return ele
                })
            })
        }
        this.SumPrice()
    }

     //计算总价
     SumPrice=()=>{
       let arr = this.state.arr
       var sum = 0
       for(let i=0; i<arr.length;i++){
          if(arr[i].checked === true){
              sum+=arr[i].price*arr[i].num
          }
       }
       this.setState({
        totalPrice:sum
       })
    }

    render(){
        return(
            <div class='container'>
             <div className='section'>
                <div className='list'>
                    {
                        this.state.arr.map((ele,index)=>{
                            return (
                                <div className='item' key={index}>
 
                                            <div className='radio'>
                                                <input type="checkbox" checked={ele.checked} onChange={
                                                    (e)=>{
                                                        this.getCheckedChange(e,index)
                                                    }
                                                }/>
                                            </div>
 
                                            <div className='pic'>
                                                <img src={ele.pic} alt="" />
                                            </div>
 
                                            <div className='goods'>
                                                <h3>{ele.name}</h3>
                                                <div className='num'>
                                                    <button onClick={(e)=>{
                                                        // console.log(e,index)
                                                        this.decrease(e,index)
                                                    }}>-</button>
                                                    {/*获取文本框的值*/}
                                                    <input type="text" value={ele.num} onChange={(e)=>{
                                                        // console.log(e,index)
                                                        this.handInputChange(e,index)
                                                    }}/>
                                                    <button onClick={(e)=>{
                                                        // console.log(e,index)
                                                        this.increase(e,index)
                                                    }}>+</button>
                                                </div>
 
                                                <div className="price">
                                                    <div>单价: {ele.price} 总价:{ele.price*ele.num}</div>
                                                </div>
 
                                            </div>
                                            <div className='del'>
                                                <button onClick={(e)=>{
                                                    this.delete(e,index)
                                                }}>删除</button>
                                            </div>
                                        </div>
                            )
                        })
                    }
                </div>
            </div>

            <div className="footer">
                全选: <input type="checkbox" ref="allSelected" onChange={(e)=>{this.CheckedChange(e)}}/>
                合计: {this.state.totalPrice}
                <button>结算</button>
            </div>

         </div>
        )
    }

}




 


 
 
