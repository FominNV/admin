import { FC } from "react"

import "./styles.scss"

const FileLoader: FC = () => {
  return (
    <div className="FileLoader">
      <p className="FileLoader__text">Выберите файл...</p>
      <label
        htmlFor="input__file"
        className="FileLoader__label"
      >
        <input
          id="input__file"
          name="file"
          type="file"
          className="FileLoader__input"
        />
        <div>Обзор</div>
      </label>
    </div>
  )
}

export default FileLoader
