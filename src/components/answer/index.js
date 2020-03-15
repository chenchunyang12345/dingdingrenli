import React, { Component } from 'react'
import styles from './index.less';
import botHead from '../../assets/bot_head.png';

class Answer extends Component {

  render() {
    let { msg } = this.props;
    return (
      <div className={styles.answer}>
        <img src={botHead} alt="" />
        <div>
          {msg}
        </div>
      </div>
    )
  }
}
export default Answer;

