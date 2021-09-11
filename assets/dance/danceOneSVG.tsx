import React from "react";
import { Dimensions } from "react-native";
import { SvgXml } from "react-native-svg";  

const { width } = Dimensions.get("screen")

export default function SvgComponent(){
  const svgMarkup = `<svg width="375" height="406" viewBox="0 100 375 406" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M375 236.901C375 236.901 302.933 399.894 191.1 405.5C79.2667 411.105 0 350.512 0 350.512V-37H375V236.901Z" fill="url(#paint0_linear)"/>
  <defs>
  <linearGradient id="paint0_linear" x1="375" y1="405.866" x2="-125.641" y2="373.062" gradientUnits="userSpaceOnUse">
  <stop stop-color="#92A3FD"/>
  <stop offset="1" stop-color="#9DCEFF"/>
  </linearGradient>
  </defs>
  </svg>
  `;
  const SvgImage = () => <SvgXml xml={svgMarkup} width="100%" height="100%"/>;  

  return <SvgImage />;
}