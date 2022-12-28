// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'

// ** Icons Imports
import { Link } from 'react-router-dom'

const BreadcrumbsDefault = () => {
  return (
    <Fragment>
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to='#'> Dashboard </Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to='#'> Tugas </Link>
        </BreadcrumbItem>
        {/* <BreadcrumbItem active>
          <span> Data </span>
        </BreadcrumbItem> */}
      </Breadcrumb>
    </Fragment>
  )
}
export default BreadcrumbsDefault
