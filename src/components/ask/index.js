import React, { Component } from 'react'
import styles from './index.less';
import userHead from '../../assets/user_head.jpeg';
class Ask extends Component {

  render() {
    return (
      <div className={styles.ask}>
        <div>{this.props.msg}</div>
        <img src={userHead} alt="" />
      </div>
    )
  }
}
export default Ask;
