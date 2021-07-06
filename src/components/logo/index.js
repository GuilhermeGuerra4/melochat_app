import React from "react";
import {stylesheet} from "./styles";
import LogoSvg from "../../assets/images/melochat_logo.svg";

export default function Logo(props){
    return(
        <LogoSvg width={props.size} style={props.style}></LogoSvg>
    );
}