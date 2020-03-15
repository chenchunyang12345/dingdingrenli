import React, { Component } from 'react';
import styles from './index.less';

class CardItem extends Component {
  createContent(content) {
    return Object.getOwnPropertyNames(content).map((value, idx) => {
      return (
        <div key={idx}>
          <div>
            {value}:&nbsp;&nbsp;&nbsp;&nbsp;{JSON.stringify(content[value])}
          </div>
        </div>
      );
    });
  }

  render() {
    let { infoObj: { title, content } } = this.props;
    console.log(title)
    console.log(title)
    return (
      <div className={styles.card_flex}>
        <div className={styles.card_wrap}>
          <div className={styles.card_title}>{title}</div>
          {/* 兼容字符串和对象 */}
          {typeof content === 'string' ? (
            <div className={styles.card_content}>{content}</div>
          ) : (
              <div className={styles.card_content}>{this.createContent(content)}</div>
            )}
        </div>
      </div>
    );
  }
}

export default CardItem;
