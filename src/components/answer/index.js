/* eslint-disable no-useless-constructor */
import React, { Component } from 'react'
import { Con } from './styled'
class Answer extends Component {
    constructor(props) {
        super(props)
    }
  
    render() {
        return (
            <Con id='content'>
                  <p>
                    <img src="https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3764939544,2146631850&fm=26&gp=0.jpg" alt=""/>  
                </p>
                    <div>{this.props.Msg}</div>
   
            </Con>
        )
    }
}
export default Answer;