import { MouseEvent } from "react"

export enum ButtonBgColor {
  BLUE = "blue",
  RED = "red",
  GRAY_LIGHT = "gray-light"
}

export enum ButtonFontColor {
  WHITE = "white",
  BLUE_DARK = "blue-dark"
}

export interface IButtonProps {
  name: string
  bgColor: ButtonBgColor
  color?: ButtonFontColor
  disabled?: boolean
  navigatePath?: string
  loading?: boolean
  onClick?: EventFunc<MouseEvent>
}
