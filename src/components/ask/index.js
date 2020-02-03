import React, { Component } from 'react'
import { Con } from './styled'
class Ask extends Component {

    render() {
        return (
            <Con> 
                <div>{this.props.Msg}</div>
                <img src="https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=333354829,1245503780&fm=26&gp=0.jpg" alt=""/>
            </Con>
        )
    }
}
export default Ask;