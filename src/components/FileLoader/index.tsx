import { ChangeEvent, FC, useCallback, useState } from "react"
import { IFileLoaderProps } from "./types"

import "./styles.scss"

const FileLoader: FC<IFileLoaderProps> = ({ setState }) => {
  const [file, setFile] = useState<Nullable<File>>(null)

  const onChangeHandler = useCallback<EventFunc<ChangeEvent<HTMLInputElement>>>((e) => {
    if (e.currentTarget.files) {
      setFile(e.currentTarget.files[0])
      setState(e.currentTarget.files[0])
    }
  }, [setState])

  const text = file ? file.name : "Выберите файл..."

  return (
    <div className="FileLoader">
      <p className="FileLoader__text">{text}</p>
      <label
        htmlFor="input__file"
        className="FileLoader__label"
      >
        <input
          id="input__file"
          name="file"
          type="file"
          className="FileLoader__input"
          onChange={onChangeHandler}
        />
        <div>Обзор</div>
      </label>
    </div>
  )
}

export default FileLoader
