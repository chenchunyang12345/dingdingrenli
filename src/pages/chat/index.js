import React, { Component } from 'react'
import * as dd from 'dingtalk-jsapi';
export default class index extends Component {
    componentDidMount() {
        dd.ready(() => {
            dd.biz.chat.chooseConversationByCorpId({
                corpId: 'ding062e5af73832130aa39a90f97fcb1e09', //企业id,必须是用户所属的企业的corpid
                isAllowCreateGroup: false,
                filterNotOwnerGroup: false,
                onSuccess: function (res) {
                    console.log(res)
                    //onSuccess将在选择结束之后调用
                    /*{
                        chatId: 'xxxx',
                        title:'xxx'
                    }*/
                },
                onFail: function () { }
            })
            //             dd.runtime.permission.requestAuthCode({
            //                 corpId: 'ding062e5af73832130aa39a90f97fcb1e09',
            //                 onSuccess:(e)=>{
            // console.log(this,e)
            //                 },
            //                 /*{
            //                     code: 'hYLK98jkf0m' //string authCode
            //                 }*/

            //                 onFail : function(err) {
            //                     console.log(err)
            //                 }

            //             });

        });
    }

    render() {
        return (
            <div>
                chat
            </div>
        )
    }
}
