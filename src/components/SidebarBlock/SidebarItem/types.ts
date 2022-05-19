export interface ISidebarItemProps {
  id: string
  name: string
  icon: JSX.Element
  active: boolean
  callback: VoidFunc<string>
}
