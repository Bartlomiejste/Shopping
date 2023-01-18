import styled from "styled-components";


export const Box = styled.div`
background:#939597;
margin-top: 150px;

img {
max-width: 100%;
margin: 40px 0;
max-height: 200px;
object-fit: scale-down;
cursor:pointer;
}

div {
padding: 10px;
font-size: 14px;
justify-content:space-evenly;
transition-duration: .3s;
border-radius:50px;
border: 1px solid black;

}

img:hover{
    transform: scale(1.2);
}

p {
    font-weight: bold;
}
`;

