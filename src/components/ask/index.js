import React, { Component } from 'react'
import { Con } from './styled'
class Ask extends Component {
 
    render() {
        return (
            <Con>  
                <div>{this.props.Msg}</div>
                <p>
                    <img src="https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3764939544,2146631850&fm=26&gp=0.jpg" alt=""/>  
                </p>
                
            </Con>
        )
    }
}
export default Ask;