import React, { Component } from 'react';
import styles from './index.less';
import { Carousel } from 'antd';

class EmojiArea extends Component {

  render() {
    return (
      <div className={styles.emojiArea}>
        <Carousel>
          <div>123213123131</div>
          <div>123123123141242141</div>
          <div>1231234231124312523</div>
        </Carousel>
      </div>
    )
  }
}
export default EmojiArea;
