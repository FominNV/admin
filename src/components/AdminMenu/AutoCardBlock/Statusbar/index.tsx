import { FC } from "react"
import FileLoader from "components/FileLoader"
import Ranger from "components/Ranger"
import car from "assets/images/Admin/car.jpg"

import "./styles.scss"

const Statusbar: FC = () => {
  return (
    <div className="Statusbar">

      <div className="Statusbar__info">
        <img
          src={car}
          alt="car"
          className="Statusbar__img"
        />
        <p className="Statusbar__model">Hyndai, i30 N</p>
        <p className="Statusbar__type">Компакт-кар</p>
        <FileLoader />
      </div>

      <div className="Statusbar__range">
        <Ranger percent={74} />
      </div>
      <div className="Statusbar__description">
        <p className="Statusbar__description__title">Описание</p>
        <textarea
          className="Statusbar__description__textarea"
          maxLength={200}
          defaultValue="Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eaque,
          quidem, commodi soluta qui quae quod dolorum sint alias, possimus
          illum assumenda eligendi cumque?"
        >
        </textarea>
      </div>

    </div>
  )
}

export default Statusbar
