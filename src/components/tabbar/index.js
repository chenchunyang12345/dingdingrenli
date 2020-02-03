import React, { Component } from 'react'
import {Footer} from "./styled"
import {TabBarRoute} from '../../utils/router_tabbar/index'
export default class index extends Component {
    constructor(props){
        super(props)
    }
    render() {
        let {path} = this.props;
        return (
            <Footer>
                 <ul>
                       {
                           TabBarRoute.map((item)=>(
                               <li key={item.path} onClick={this.handleTo.bind(this,item.path)} className={path===item.path?'active':""}>
                                    <i className="iconfont">{item.icon}</i>
                                    <span>{item.text}</span>
                               </li>
                           ))
                       }
                    </ul>
            </Footer>
        )
    }
    handleTo(path){
        this.props.history.push(path);
    }
}
