/* eslint-disable no-unused-expressions */
import React from 'react';

class GoodsDetail extends React.Component{
    render(){
        console.log(this.props)
        return(
           
            <ul className='goods'>
            {
                this.props.list.map((ele,idx)=>{
                    return(
                    <li key={idx} style={{marginBottom:20,listStyle:'none'}}>
                        <span>{ele.name}</span>|
                        <span>¥ {ele.price}</span>|
                        <span>剩余 {ele.amount} 件</span>|
                    </li>
                    )
                })
            }
            </ul>
        )
    }
}
export default GoodsDetail;