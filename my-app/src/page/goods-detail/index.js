/* eslint-disable no-unused-expressions */
import React from 'react';

class GoodsDetail extends React.Component{
    
    render(){
        return(
           <div>
            <h1>hello goods detail</h1>
            <div>{this.props.match.params.id}</div>
            </div>
        )
    }
}
export default GoodsDetail;