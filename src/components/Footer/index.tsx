import { FC, ReactNode, useMemo } from "react"
import { Link } from "react-router-dom"
import dataLinks from "./data"

import "./styles.scss"

const Footer: FC = () => {
  const links = useMemo<ReactNode>(
    () =>
      dataLinks.map((elem) => (
        <Link
          key={elem.id}
          to={elem.path}
          className="Footer__links_item"
        >
          {elem.name}
        </Link>
      )),
    []
  )

  return (
    <div className="Footer">
      <div className="Footer__links">{links}</div>

      <div className="Footer__info">Copyright © 2020 Simbirsoft</div>
    </div>
  )
}

export default Footer
