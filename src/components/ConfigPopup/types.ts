import { Dispatch, SetStateAction } from "react"
import {
  ICity,
  IPostCategory,
  IPostCity,
  IPostPoint,
  IPostRate,
  IPostRateType,
  IRateType
} from "store/admin/types"
import { PopupEntityMode } from "store/common/types"

export type CheckFieldType = (
  value: string,
  setError: Dispatch<SetStateAction<Nullable<string>>>,
  fieldType: string,
) => boolean

export type CreateSecondFieldComponent = (type: string) => JSX.Element

export type SetConfigFieldsType = (
  mode: PopupEntityMode,
  id: Nullable<string>,
) => void

export type SetAddBodyType = (
  name: string,
  data: ICity[] | IRateType[],
) => void

export type FetchBodyType = Nullable<
  IPostCategory | IPostCity | IPostPoint | IPostRate | IPostRateType
>

export type PostEntiyId = Nullable<ICity | IRateType>

export interface IEntityBannerText {
  [index: string]: {
    create: string
    update: string
    delete: string
  }
}
