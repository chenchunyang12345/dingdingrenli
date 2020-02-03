/* eslint-disable no-useless-constructor */
import React, { Component } from 'react'
import { Con } from './styled'
class Answer extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Con>
                 <img src="https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=333354829,1245503780&fm=26&gp=0.jpg" alt=""/>
                    <div>{this.props.Msg}</div>
   
            </Con>
        )
    }
}
export default Answer;