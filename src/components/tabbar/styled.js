import styled from "styled-components"

export const Footer = styled.div`
    width:100%;
    height: .5rem;
    background: #c33;
    position: fixed;
    left:0;
    bottom: 0;
    border-top:1px solid #ccc;
    ul{
        width:100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        li{
            width:100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color:#ccc;
            i{
                font-size:.16rem;
            }
            span{
                font-size: .14rem;
            }
        }
        .active{
            color:#c33;  
        }
    }


    
`