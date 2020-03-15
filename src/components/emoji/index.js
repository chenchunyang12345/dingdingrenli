import React, { Component } from 'react';
import styles from './index.less';
import { Icon } from 'antd';

import EmojiArea from './emojiArea';

class Emoji extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emojiVisible: false,  // 表情选择是否出现
    }
  }

  // 表情选择开关
  emojiSwitch = () => {
    let { emojiVisible } = this.state;
    this.setState({
      emojiVisible: !emojiVisible
    })
  }

  render() {
    let { emojiVisible } = this.state;
    return (
      <div className={styles.emoji}>
        {/* 表情选择区 */}
        {
          emojiVisible ? (
            <div className={styles.emoji__wrap}>
              <EmojiArea />
            </div>
          ) :
          null
        }
        {/* 界面图标 */}
        <div onClick={this.emojiSwitch}>
          <Icon
            type="smile"
            theme="filled"
            style={{color: 'black', fontSize: '0.25rem'}}
          />
        </div>
      </div>
    )
  }
}
export default Emoji;
