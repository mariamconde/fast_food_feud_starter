import * as React from "react"
import { nutritionFacts } from "../../constants"
import "./NutritionalLabel.css"

export function NutritionalLabel(props) {

  const {item} = props
  // console.log(props.item)
  return (
    <div className="nutritional-label">
      <h3 className="title">Nutrition Facts</h3>
      
      <h4 className="item-name">{item.item_name}</h4>

      <ul className="fact-list">{
         nutritionFacts.map((fact) => {
        return <NutritionalLabelFact
          label={fact.label}
          key={fact.id}
          attribute={fact.attribute}
          item={props.item}/>
       })}
      </ul>
    </div>
  )
}

export function NutritionalLabelFact(props) {
  return (
    <li className="nutrition-fact">
      <span className="fact-label">{props.label}</span>{" "}
      <span className="fact-value">{props.item[props.attribute]}</span>
    </li>
  )
}

export default NutritionalLabel
