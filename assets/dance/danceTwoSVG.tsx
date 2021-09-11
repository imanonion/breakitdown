import React from "react";
import { Dimensions } from "react-native";
import { SvgXml } from "react-native-svg";  

const { width } = Dimensions.get("screen")

export default function SvgComponent(){
  const svgMarkup = `<svg width="375" height="406" viewBox="0 100 375 406" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M0 254.043C0 254.043 59.4333 130.437 122.033 130.437C184.633 130.437 228.467 258.742 291.067 258.742C353.667 258.742 346.733 191.957 375 191.957V0H0V254.043Z" fill="url(#paint0_linear)"/>
  <defs>
  <linearGradient id="paint0_linear" x1="375" y1="258.742" x2="-121.545" y2="203.055" gradientUnits="userSpaceOnUse">
  <stop stop-color="#92A3FD"/>
  <stop offset="1" stop-color="#9DCEFF"/>
  </linearGradient>
  </defs>
  </svg>`;
  const SvgImage = () => <SvgXml xml={svgMarkup} width="100%" height="100%"/>;  

  return <SvgImage />;
}