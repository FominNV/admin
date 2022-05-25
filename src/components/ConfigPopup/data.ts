import { PopupEntityMode } from "store/common/types"
import { IEntityBannerText } from "./types"

export const dataEntityBannerText: IEntityBannerText = {
  [PopupEntityMode.CATEGORY]: {
    create: "Успех! Создана новая категория!",
    update: "Успех! Категория успешно обновлена!",
    delete: "Успех! Категория успешно удалена!"
  },
  [PopupEntityMode.CITY]: {
    create: "Успех! Создан новый город!",
    update: "Успех! Город успешно обновлен!",
    delete: "Успех! Город успешно удален!"
  },
  [PopupEntityMode.POINT]: {
    create: "Успех! Создан новый пункт!",
    update: "Успех! Пункт успешно обновлен!",
    delete: "Успех! Пункт успешно удален!"
  },
  [PopupEntityMode.RATE]: {
    create: "Успех! Создан новый тариф!",
    update: "Успех! Тариф успешно обновлен!",
    delete: "Успех! Тариф успешно удален!"
  },
  [PopupEntityMode.RATE_TYPE]: {
    create: "Успех! Создан новый тип тарифа!",
    update: "Успех! Тип тарифа успешно обновлен!",
    delete: "Успех! Тип тарифа успешно удален!"
  },
  [PopupEntityMode.STATUS]: {
    create: "Успех! Создан новый статус заказа!",
    update: "Успех! Статус заказа успешно обновлен!",
    delete: "Успех! Статус заказа успешно удален!"
  }
}
