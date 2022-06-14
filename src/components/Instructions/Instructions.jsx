import * as React from "react"
import "./Instructions.css"

export function Instructions(props) {
  return (
    <aside className="instructions">{props.instructions}
      <p></p>
    </aside>
  )
}

export default Instructions
