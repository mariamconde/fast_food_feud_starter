import * as React from "react"
import "./Chip.css"
import {useState} from "react"

export function Chip({ 
  label = "", 
  isActive = false,
  onClick = () => {},
  xOnClick = () => {},
  
}) 
{

let buttonClassName  = ""
if(isActive == false){
  buttonClassName = "chip"
} else{
buttonClassName = "chip active"
}
  // `chip ${isAcive ? "active" : ""}`
  // <button className={buttonClassName} onClick={onClick}>
  return (
    <button className={`chip ${isActive ? "active" : ""}`} onClick={onClick}>
      <p className="label">{label}</p>
      <span className="close" role="button" onClick={xOnClick}>{`x`}</span>
    
    </button>
  )
}

export default Chip
