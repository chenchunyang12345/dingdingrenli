const {get,post} =require('../utils/request').default;
export default{
    websoket:{
        websoket:({payload})=>get(`/socket.io/?EIO=${payload.EIO}&transport=${payload.transport}`)
    },
    websoketsend:{
        websoketsend:({payload})=>post(`/socket.io/?EIO=${payload.EIO}&transport=${payload.transport}&sid=${payload.sid}`,payload.body)
    },
    websoketsendget:{
        websoketsendget:({payload})=>get(`/socket.io/?EIO=${payload.EIO}&transport=${payload.transport}&sid=${payload.sid}`)
    }
}