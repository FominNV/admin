export interface ISelectProps {
  id: string
  label: string
  value: string
  data: Nullable<string[]>
  callback: VoidFunc<string>
}
