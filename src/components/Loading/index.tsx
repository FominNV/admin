import { FC } from "react"

import loading from "assets/images/Loading/loading.gif"

import "./styles.scss"

const Loading: FC = () => (
  <div className="Loading">
    <img
      className="Loading__img"
      src={loading}
      alt="loading"
    />
  </div>
)

export default Loading
