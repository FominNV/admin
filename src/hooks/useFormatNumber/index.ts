import { useFormatNumberType } from "./types"

const useFormatNumber: useFormatNumberType = (value) => (
  new Intl.NumberFormat("ru-RU").format(value)
)

export default useFormatNumber
