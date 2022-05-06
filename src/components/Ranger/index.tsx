import { FC } from "react"
import { IRangerProps } from "./types"

import "./styles.scss"

const Ranger: FC<IRangerProps> = ({ percent }) => {
  return (
    <div className="Ranger">
      <div className="Ranger__header">
        <p className="Ranger__name">Заполнено</p>
        <p className="Ranger__name">{percent}%</p>
      </div>

      <div className="Ranger__wrap-line">
        <div
          className="Ranger__fill-line"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}

export default Ranger
