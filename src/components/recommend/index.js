import React from 'react';

import { Icon, Typography } from 'antd';

import styles from './index.less';

const regExpNoAnswer = new RegExp(/(无答案)/);
const regEXP = new RegExp(/^\s*$/g);

class Recommend extends React.Component {

  chooseList(title) {
    this.props.listenRecommend(title);
  }

  createLi(li_arr) {
    // 定义正则对无答案的处理
    return li_arr.map((item, index) => {
      const title = item.title ? item.title : item;
      const content = item.content ? item.content : '';
      return regExpNoAnswer.test(title) ?
        <li key={index} className={styles.recommend_li_forbiddenChoose}>{title}</li> :
        <li key={index} className={styles.recommend_li} onClick={() => this.chooseList(title)}>
        {/* <li key={index} className={styles.recommend_li}> */}
          {title}
          {content && <div className={styles.recommend_li_content}>
            <Typography.Paragraph ellipsis={{ rows: 3 }}>
              {content}
            </Typography.Paragraph>
          </div>}
        </li>;
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.content === nextProps.content) {
      return false;
    }
    return true;
  }

  render() {
    let { recommendObj } = this.props;
    return (
      <div>
        {
          regEXP.test(recommendObj.title) || recommendObj.items.length === 0 ?
            null :
            <div>
              <div className={styles.recommend_title}>
                <div className={styles.recommend_icon} style={{}}>
                  <Icon type="heart" theme="filled" style={{ marginLeft: 3, color: '#FF8C8C', fontSize: 12 }} />
                </div>
                {recommendObj.title}
              </div>
              <div className={styles.recommend_list}>
                <ul className={styles.recommend_wrap}>
                  {this.createLi(recommendObj.items)}
                </ul>
              </div>
            </div>
        }
      </div>
    )
  }
}

export default Recommend;
