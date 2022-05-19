import { FC } from "react"
import Config from "../Config"
import Statusbar from "../Statusbar"
import "./styles.scss"

const AutoCard: FC = () => {
  return (
    <section className="AutoCard">
      <Statusbar />
      <Config />
    </section>
  )
}

export default AutoCard
