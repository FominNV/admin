import { FC } from "react"
import { useTypedSelector } from "store/selectors"
import { Helmet } from "react-helmet-async"
import Sidebar from "components/SidebarBlock/Sidebar"

import "./styles.scss"

const AdminLayout: FC = ({ children }) => {
  const { pageTitle } = useTypedSelector((state) => state.common)

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>

      <div className="AdminLayout">
        <Sidebar />
        {children}
      </div>
    </>
  )
}
export default AdminLayout
