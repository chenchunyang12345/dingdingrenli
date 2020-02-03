import services from "../services/services";
export default {
    namespace: "websoket",
    state:{
        sid: ""
    },
    reducers: {
        setSid(state,{payload}){
            let {sid}=payload;
            return {...state,sid}
        }
    },
    effects: {
        *soket({ payload, resolve, reject }, { call, put }) {
            const res=yield call(services.websoket['websoket'],{payload});
                if(res){
                    let msg=res.data.substring(14,50);
                    let payload={
                        sid:msg
                    }
                    yield put({type:"setSid",payload})
                    resolve(res);
                }
        },
        *soketSend({ payload, resolve, reject }, { call, put }){
            const res=yield call(services.websoketsend['websoketsend'],{payload});
           if(res.data=="ok"){
            resolve(res);
           }
        },
        *soketSendGet({ payload, resolve, reject }, { call, put }){
            console.log(12)
            const res=yield call(services.websoketsendget['websoketsendget'],{payload});
            if(res.data){
                resolve(res)
            }
        },
        *handlesoketSendGet({ payload, resolve, reject }, { call, put }){
            const res=yield call(services.websoketsend['websoketsend'],{payload});
            if(res.data){
                resolve(res)
            }
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {

        }
    }

}