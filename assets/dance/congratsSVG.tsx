import React from "react";
import { Dimensions } from "react-native";
import { SvgXml } from "react-native-svg";  

const { width } = Dimensions.get("screen")

export default function SvgComponent(){
  const svgMarkup = `<svg width="255" height="327" viewBox="0 90 255 327" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M231.02 206.56C272.114 128.65 259.073 40.8333 201.892 10.4151C144.712 -20.0032 65.0454 18.4962 23.9521 96.4057C-17.1412 174.315 -4.10004 262.132 53.0803 292.55C110.261 322.969 189.927 284.469 231.02 206.56Z" fill="#97BEFC"/>
  </svg>`;
  const SvgImage = () => <SvgXml xml={svgMarkup} width="100%" height="100%"/>;  

  return <SvgImage />;
}