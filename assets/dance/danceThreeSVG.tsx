import React from "react";
import { Dimensions } from "react-native";
import { SvgXml } from "react-native-svg";  

const { width } = Dimensions.get("screen")

export default function SvgComponent(){
  const svgMarkup = `<svg width="375" height="437" viewBox="0 100 375 437" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 208.102s22.4 3.539 45.1 85.837C67.8 376.236 130.8 437 212.967 437 295.133 437 375 322.517 375 248.065V-2H0v210.102Z" fill="url(#a)"/><defs><linearGradient id="a" x1="375" y1="437" x2="-125.603" y2="403.91" gradientUnits="userSpaceOnUse"><stop stop-color="#92A3FD"/><stop offset="1" stop-color="#9DCEFF"/></linearGradient></defs></svg>`;
  const SvgImage = () => <SvgXml xml={svgMarkup} width="100%" height="100%"/>;  

  return <SvgImage />;
}