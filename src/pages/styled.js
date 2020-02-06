import styled from "styled-components";

export const Box = styled.div`
width:100%;
height:100%;
overflow:auto;
.chatCon{
    padding: 10px;
    font-size: 15px;
    line-height: 15px;
    margin-bottom:0.4rem;
    max-height:600px;
    overflow:auto;
    .title_message{
      padding:0.1rem;
    background-color: #EAEAEA;
    border-radius:0.04rem;

    }
    .title_message2{
      padding:0.1rem;
    background-color: #fff;
    border-radius:0.04rem;
      border-bottom:#f90;
    }
    img{
      width:30px;
      height:38px;
    }
}
.inputSend{
  width:100%;
  height:0.4rem;
  background:#ccc;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .chat__myInput {
  width: 70%;
  height:0.3rem;
  border: 1rpx solid #ccc;
}

.chat__sendBtn {
  width:20%;
  height:0.3rem;
  line-height: 0.3rem;
  text-align: center;
}
}

`