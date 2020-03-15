import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './index.less';
import { Answer, Ask, Emoji, Recommend, InfoCard, LinkAnswer, DatePicker } from '../components/index';
import { Button, Input, message, Icon } from 'antd';
import * as dd from 'dingtalk-jsapi';
import { matchUrlAndName } from '../utils/emoji';
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-undef
const socket = io.connect('http://115.182.62.190:9081/im/ai');

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      dataSource: [
        {}  // 0为时间，1为用户，2为机器人，3为推荐, 4为信息卡片, 5为带链接的信息, 6为选择日期信息
      ],
      // message: '',
      dialogSessionId: '',
      robot: true,
      cansend: false, // 等初始化完成的时候才让发信息
    };
  }

  componentDidMount() {
    this.connectSocket();
    // dd.ready(()=>{

    // })
  }

  componentDidUpdate() {
    this.refs.content.scrollTo({
      top: 99999,
      behavior: "smooth"  // 平滑滚动
    });
  }

  //建立socket连接
  connectSocket() {
    // 定义loading
    message.loading('初始化中', 0);
    socket.on('connect', () => {
      console.log('连接初始化成功，时间：' + new Date().toLocaleTimeString());
      socket.emit('new', {
        nickname: 'testhj',
        orgi: 'ukewo',
        appid: '1BJIZ8',
        userid: '3f2b62a0827efd823b4f859e50e1f611',
        user: '3f2b62a0827efd823b4f859e50e1f611',
        // session: "a9a87db7feb24efab3690fe6c2a20e34",
        // osname: "Windows",
        // browser: "Chrome",
        // title: "%E6%B5%8B%E8%AF%95%E7%95%8C%E9%9D%A2",
        // url: "file%3A%2F%2F%2FC%3A%2FUsers%2FAdministrator%2FDesktop%2Fim.html",
        // traceid: "cc517519f97a4177acbea7c0b0d99929"
      });
    });

    //监听状态
    socket.on('status', data => {
      console.log(data);
      this.setState({
        dialogSessionId: data.dialogSessionId,
      });
      if (data.messageType === 'message') {
        this.setState({
          // message: data.message,
          cansend: true,
          dataSource: [
            ...this.state.dataSource,
            { num: 2, answer: '您好，您今天没打卡~' },
            { num: 3, recommendObj: { title: '您可以选择以下操作', items: [{ title: '补打卡'}, { title: '公出'}, { title: '休假'}] } }
          ]
        });
        // 取消初始化的loading
        message.destroy();
      }
    });

    // 监听服务端消息
    socket.on('message', data => {
      if (data.nickName === 'testhj' && data.channelMessage.robot === false) {

      } else {
        if (data.messageType === 'text') {
          let { instructions, message } = data;
          let { dataSource = [] } = this.state;
          instructions = JSON.parse(instructions);
          console.log(instructions)
          // 答案
          if (message) {
            dataSource.push({ num: 2, answer: message });
          }
          // 处理instructions
          // 信息卡片（可能有多个）
          let infoCardArr = instructions.filter(item => item.type === 'info_card');
          if (infoCardArr.length) {
            infoCardArr.forEach(item => {
              let { params } = item;
              dataSource.push({ num: 4, infoObj: params });
            })
          }
          // 推荐卡片
          let recommendCard = instructions.filter(item => item.type === 'recommendation')[0];
          if (recommendCard) {
            let { params } = recommendCard;
            dataSource.push({ num: 3, recommendObj: params });
          }
          // 选择日期组件
          let dateSelect = instructions.filter(item => item.type === 'dateSelect')[0];
          if (dateSelect) {
            // 渲染选择日期组件
            dataSource.push({ num: 6 });
          }
          // 带链接的卡片
          let linkCard = instructions.filter(item => item.type === 'link')[0];
          if (linkCard) {
            let { params } = linkCard;
            dataSource.push({ num: 5, linkObj: params });
          }

          this.setState({ dataSource });
        }
      }
    });
  }

  listenRecommend(title) { // 监听点击推荐项
    this.sendMsg(title);
  }

  handleOk(msg) {  // 日期选择点击确定
    console.log(msg);
    // 发消息
    this.sendMsg(msg);
  }

  // toHandlePA() {
  //   if (!this.state.cansend) {
  //     // 如果没初始化完成，不让转人工
  //     return;
  //   }

  //   this.setState({
  //     robot: false,
  //   });
  //   message.success('已转人工', 1);
  // }

  btnSendMsg() {
    if (!this.state.cansend) {
      // 如果没初始化完成，不让发消息
      return;
    }

    let inputValue = this.state.inputValue;
    if (inputValue === '') {
    } else {
      this.sendMsg(inputValue);
      this.setState({ inputValue: '' });
    }
  }

  // 发消息方法
  sendMsg(msg) {
    let { dataSource, dialogSessionId, robot } = this.state;
    // 先判断前一个是不是日期选择组件
    if (dataSource.length && dataSource[dataSource.length - 1].num === 6) {
      dataSource.pop();
    }
    // 消息方法
    let obj = {
      num: 1,
      ask: msg,
    };
    dataSource.push(obj);
    this.setState({ dataSource });
    socket.emit('message', {
      appid: '1BJIZ8',
      userid: '3f2b62a0827efd823b4f859e50e1f611',
      robot: robot,
      dialogSessionId: dialogSessionId,
      type: 'message',
      // session: "a9a87db7feb24efab3690fe6c2a20e34",
      orgi: 'ukewo',
      message: msg,
    });
  }

  render() {
    let { inputValue, dataSource, message } = this.state;
    return (
      <div className={styles.box}>
        <div className={styles.chatCon} ref="content">
          {/* {message ? (
            <div className={styles.title_message2}>
              <Alert message={message} type="success" />
            </div>
          ) : null} */}
          {dataSource.map((item, index) => {
            switch (item.num) {
              case 1:
                return <Ask msg={item.ask} key={index} />;
              case 2:
                return <Answer msg={item.answer} linkObj={item.linkObj} key={index} />;
              case 3:
                return <Recommend recommendObj={item.recommendObj} listenRecommend={this.listenRecommend.bind(this)}  key={index} />;
              case 4:
                return <InfoCard infoObj={item.infoObj} key={index} />;
              case 5:
                return <LinkAnswer linkObj={item.linkObj} key={index} />;
              case 6:
                return <DatePicker handleOk={this.handleOk.bind(this)} key={index} />
              default:
                return null;
            }
          }
          )}
        </div>
        <div className={styles.inputSend}>
          {/* <Button
            className="chat__sendBtn"
            onClick={() => this.toHandlePA()}
            type="primary"
            size="small"
          >
            转人工
          </Button> */}
          <Input
            className={styles.chat__myInput}
            value={inputValue}
            onChange={e => this.setState({ inputValue: e.target.value })}
          />
          {/* <Emoji /> */}
          {/* {
            /^\s*$/.test(inputValue) ? (
              <Icon
                type="plus-circle"
                theme="filled"
                style={{ color: 'black', fontSize: '0.25rem' }}
              />
            ) : (
                <Button
                  className="chat__sendBtn"
                  onClick={() => this.btnSendMsg()}
                  type="primary"
                  size="small"
                >
                  发送
                </Button>
              )
          } */}

          <Button
            className={styles.chat__sendBtn}
            onClick={() => this.btnSendMsg()}
            type="primary"
            size="small"
          >
            发送
          </Button>
        </div>
      </div>
    );
  }
}

export default Index;
