import React, { Component } from 'react'
import styles from './index.less';
import { Button } from 'antd';
import botHead from '../../assets/bot_head.png';

class Answer extends Component {

  render() {
    let { linkObj: { content, linkText } } = this.props;
    return (
      <div className={styles.answer}>
        <img src={botHead} alt="" />
        <div>
          <p>{content}</p>
          <Button type='primary' className={styles.link_button}>{linkText}</Button>
        </div>
      </div>
    )
  }
}
export default Answer;

