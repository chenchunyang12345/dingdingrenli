
export const TabBarRoute = [
    {
        path:"/home",
        // component:Home,
        meta:{
            flag:true
        },
        icon:"\ue66c",
        text:"首页"
    },
    {
        path:"/chat",
        // component:Classify,
        meta:{
            flag:true
        },
        icon:"\ue66c",
        text:"聊天"
    },
    {
        path:"/maillist",
        // component:Buycar,
        meta:{
            flag:true
        },
        icon:"\ue600",
        text:"联系人"
    },
    {
        path:"/mine",
        // component:Mine,
        meta:{
            flag:true,
            requiredAuth:true
        },
        icon:"\ue66c",
        text:"我的"
    }
];
