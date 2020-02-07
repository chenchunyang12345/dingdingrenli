import React, { Component } from 'react'
import { connect } from 'dva';
import { Box } from "./styled"
import { Answer, Ask } from "../components/index"
import Hidden from '../components/hidden/index'
import { Alert, Button, Input, message } from 'antd';
import * as dd from 'dingtalk-jsapi';
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-undef
const socket = io.connect('http://115.182.62.190:9081/im/ai');
class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
      dataSource: [],
      message: '',
      dialogSessionId: '',
      robot: true,
      cansend: false, // 等初始化完成的时候才让发信息
    }
  }

  componentDidMount() {
    this.connectSocket();
    // dd.ready(()=>{

    // })
  }

  //建立socket连接
  connectSocket() {
    // 定义loading
    message.loading('初始化中', 0);
    socket.on('connect', () => {
      console.log("连接初始化成功，时间：" + new Date().toLocaleTimeString());
      socket.emit('new', {
        nickname: "testhj",
        orgi: "ukewo",
        appid: "1BJIZ8",
        userid: "3f2b62a0827efd823b4f859e50e1f611",
        user: "3f2b62a0827efd823b4f859e50e1f611",
        // session: "a9a87db7feb24efab3690fe6c2a20e34",
        // osname: "Windows",
        // browser: "Chrome",
        // title: "%E6%B5%8B%E8%AF%95%E7%95%8C%E9%9D%A2",
        // url: "file%3A%2F%2F%2FC%3A%2FUsers%2FAdministrator%2FDesktop%2Fim.html",
        // traceid: "cc517519f97a4177acbea7c0b0d99929"
      });
    })

    //监听状态
    socket.on("status", (data) => {
      console.log(data)
      this.setState({
        dialogSessionId:data.dialogSessionId
      })
      if (data.messageType === 'message') {
        this.setState({
          message: data.message,
          cansend: true,
        })
        // 取消初始化的loading
        message.destroy();
      }
    })

    // 监听服务端消息
    socket.on('message', (data) => {
      console.log(data.nickName,data.channelMessage.robot)
      if(data.nickName==='testhj'&& data.channelMessage.robot===false){

      }else{
        if (data.messageType === "text") {
          let obj = { num: 'out', answer: data.message }
          let { dataSource = [] } = this.state;
          dataSource.push(obj);
          this.setState({ dataSource });
        }
      }
    });
  }

  componentDidUpdate(){
    this.refs.content.scrollTop = 99999;
  }

  render() {
    let { inputValue, dataSource, message } = this.state;
    return (
      <Box>
        <div className="chatCon" ref="content">
          <div className="title_message">
            欢迎您来咨询华来知识！
          </div>
          {
            message ? (
              <div className="title_message2">
                <Alert message={message} type="success" />
              </div>
            ) : null
          }
          {
            dataSource.map((item, index) => (
              <div key={index}   >
                <Hidden visible={item.num === 'out'} >
                  <Answer Msg={item.answer}  ></Answer>
                </Hidden>
                <Hidden visible={item.num === 'in'}  >
                  <Ask Msg={item.ask}></Ask>
                </Hidden>
              </div>
            ))
          }
        </div>
        <div className='inputSend'>
          <Button className="chat__sendBtn" onClick={() => this.toHandlePA()} type="primary" size="small">转人工</Button>
          <Input className="chat__myInput" value={inputValue} onChange={e => this.setState({ inputValue: e.target.value })}  />
          <Button className="chat__sendBtn" onClick={() => this.btnSendMsg()} type="primary" size="small">发送</Button>
        </div>
      </Box>
    )
  }

  toHandlePA(){
    if (!this.state.cansend) { // 如果没初始化完成，不让转人工
      return;
    }

    this.setState({
      robot: false,
    })
    message.success('已转人工', 1);
  }

  btnSendMsg() {
    if (!this.state.cansend) { // 如果没初始化完成，不让发消息
      return;
    }

    let inputValue = this.state.inputValue;
    let dialogSessionId = this.state.dialogSessionId;
    let robot = this.state.robot;
    if (inputValue === '') {

    } else {
      let obj = { num: "in", ask: inputValue, img: "https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=333354829,1245503780&fm=26&gp=0.jpg"}
      let { dataSource = [] } = this.state;
      dataSource.push(obj);
      this.setState({ dataSource });
      socket.emit('message', {
        appid: "1BJIZ8",
        userid: "3f2b62a0827efd823b4f859e50e1f611",
        robot: robot,
        dialogSessionId: dialogSessionId,
        type: "message",
        // session: "a9a87db7feb24efab3690fe6c2a20e34",
        orgi: "ukewo",
        message: inputValue,
      })
      this.setState({ inputValue: "" });
    }
  }
}

export default Index
