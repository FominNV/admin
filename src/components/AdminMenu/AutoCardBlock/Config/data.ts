import { ButtonBgColor, IButtonProps } from "components/Button/types"
import { IConfigInput } from "./types"

export const dataConfigButton: IButtonProps[] = [
  {
    name: "Сохранить",
    bgColor: ButtonBgColor.BLUE
  },
  {
    name: "Отменить",
    bgColor: ButtonBgColor.GRAY_LIGHT
  },
  {
    name: "Удалить",
    bgColor: ButtonBgColor.RED
  }
]

export const dataConfigInput: IConfigInput[] = [
  {
    id: "config_input_model",
    label: "Модель автомобиля",
    placeholder: "Введите модель",
    defaultValue: "Hyndai, i30 N"
  },
  {
    id: "config_input_type",
    label: "Тип автомобиля",
    placeholder: "Укажите тип",
    defaultValue: "Компакт-кар"
  },
  {
    id: "config_input_color",
    label: "Доступные цвета",
    placeholder: "Введите цвет",
    defaultValue: "Синий"
  }
]
