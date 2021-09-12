import React from "react";
import { Dimensions } from "react-native";
import { SvgXml } from "react-native-svg";  

const { width } = Dimensions.get("screen")

export default function SvgComponent(){
  const svgMarkup = `<svg width="278" height="293" viewBox="0 70 278 293" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M132.427 292.774C205.42 292.774 264.88 266.252 276.611 192.261C288.342 118.27 186.894 152.727 188.78 85.6436C190.666 18.5884 168.313 -20.3908 107.106 11.07C45.8995 42.5308 55.1623 108.781 46.1213 139.521C28.5386 199.169 -68.3885 292.774 132.427 292.774Z" fill="#98BFFD"/>
  <path d="M38.6046 145.904C45.0256 128.073 44.1915 111.441 36.7416 108.757C29.2918 106.072 18.0472 118.351 11.6262 136.182C5.20524 154.014 6.03931 170.645 13.4892 173.33C20.939 176.015 32.1836 163.736 38.6046 145.904Z" fill="#98BFFD"/>
  <path d="M251.779 110.371C261.329 102.022 259.87 84.7224 248.52 71.7311C237.17 58.7398 220.228 54.9765 210.678 63.3257C201.128 71.6748 202.588 88.9746 213.938 101.966C225.287 114.957 242.23 118.72 251.779 110.371Z" fill="#98BFFD"/>
  </svg>
  `;
  const SvgImage = () => <SvgXml xml={svgMarkup} width="100%" height="100%"/>;  

  return <SvgImage />;
}