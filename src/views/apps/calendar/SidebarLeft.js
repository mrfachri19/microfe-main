// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import classnames from 'classnames'

// ** Reactstrap Imports
import { CardBody, Button, Input, Label } from 'reactstrap'

// ** Third Party Components
import { Plus } from "react-feather";

// ** Filters Checkbox Array
const filters = [
  { label: 'Task', color: 'warning', className: 'form-check-warning mb-4' },
  { label: 'Event', color: 'info', className: 'form-check-info mb-4' },
  { label: 'Holiday', color: 'danger', className: 'form-check-danger mb-4' }
]

const SidebarLeft = props => {
  // ** Props
  const { handleAddEventSidebar, toggleSidebar, updateFilter, updateAllFilters, store, dispatch } = props

  // ** Function to handle Add Event Click
  const handleAddEventClick = () => {
    toggleSidebar(false)
    handleAddEventSidebar()
  }

  return (
    <Fragment>
      <div className='sidebar-wrapper p-4'>
        <CardBody className='card-body d-flex justify-content-center my-sm-0 mb-3'>
          <Button color='primary' block onClick={handleAddEventClick}>
            Tambah Acara
            <Plus
              size={14}
              style={{
                verticalAlign: "top",
                marginLeft: "0.25rem"
              }}
            />
          </Button>
        </CardBody>
        <CardBody className='my-4'>
          <div className='form-check mb-4'>
            <Input
              id='view-all'
              type='checkbox'
              label='Semua'
              className='select-all'
              checked={store.selectedCalendars.length === filters.length}
              onChange={e => dispatch(updateAllFilters(e.target.checked))}
            />
            <Label className='form-check-label' for='view-all'>
              Semua
            </Label>
          </div>
          <div className='calendar-events-filter'>
            {filters.length &&
              filters.map(filter => {
                return (
                  <div
                    key={`${filter.label}-key`}
                    className={classnames('form-check', {
                      [filter.className]: filter.className
                    })}
                  >
                    <Input
                      type='checkbox'
                      key={filter.label}
                      label={filter.label}
                      className='input-filter'
                      id={`${filter.label}-event`}
                      checked={store.selectedCalendars.includes(filter.label)}
                      onChange={() => {
                        dispatch(updateFilter(filter.label))
                      }}
                    />
                    <Label className='form-check-label' for={`${filter.label}-event`}>
                      {filter.label}
                    </Label>
                  </div>
                )
              })}
          </div>
        </CardBody>
      </div>
    </Fragment>
  )
}

export default SidebarLeft
