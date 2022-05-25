import { ChangeEvent, FC, useCallback, useMemo } from "react"
import FileLoader from "components/FileLoader"
import Ranger from "components/Ranger"
import classNames from "classnames"
import { IStatusbarProps } from "./types"

import "./styles.scss"

const Statusbar: FC<IStatusbarProps> = ({
  imagePath,
  imageError,
  progress,
  model,
  type,
  description,
  descriptionError,
  setImageFile,
  setDescription
}) => {
  const onChangeHandler = useCallback<
    EventFunc<ChangeEvent<HTMLTextAreaElement>>
  >((e) => {
    setDescription(e.currentTarget.value)
  }, [setDescription])

  const image = useMemo(
    () =>
      (imagePath ? (
        <img
          src={imagePath}
          alt="car"
          className="Statusbar__img"
        />
      ) : (
        <p className="Statusbar__img-text">Выберите изображение</p>
      )),
    [imagePath]
  )

  const imageErrorText = useMemo(
    () => imageError && <p className="Statusbar__image-error">{imageError}</p>,
    [imageError]
  )

  const range = useMemo(() => (
    <Ranger percent={progress} />
  ), [progress])

  const descriptionErrorText = useMemo(() => (
    descriptionError && (
      <div className="Statusbar__description__error">{descriptionError}</div>
    )
  ), [descriptionError])

  const imageWrapClassName = classNames("Statusbar__img-wrap", {
    "Statusbar__img-wrap_error": imageError
  })

  const descriptionClassName = classNames("Statusbar__description", {
    Statusbar__description_error: descriptionError
  })

  return (
    <div className="Statusbar">
      <div className="Statusbar__info">
        <div className={imageWrapClassName}>{imageErrorText || image}</div>
        <p className="Statusbar__model">{model || "Укажите модель"}</p>
        <p className="Statusbar__type">{type || "Выберите тип"}</p>
        <FileLoader setState={setImageFile} />
      </div>

      <div className="Statusbar__range">{range}</div>

      <div className={descriptionClassName}>
        <p className="Statusbar__description__title">Описание</p>
        <textarea
          className="Statusbar__description__textarea"
          maxLength={200}
          onChange={onChangeHandler}
          value={description}
          placeholder="Описание транспортного средства..."
        >
        </textarea>
        {descriptionErrorText}
      </div>
    </div>
  )
}

export default Statusbar
