// ** React Imports
import { useEffect, useState } from 'react'

// ** Reactstrap Imports
import { Button, Label, Input, InputGroup, InputGroupText, Card, CardBody } from 'reactstrap'

// ** Icon Import
import { PlusCircle, MinusCircle, Search, Trash } from 'react-feather'

// ** Third Party Components
import PerfectScrollbar from 'react-perfect-scrollbar'

const FieldPartisipan = props => {
  const {
    label,
    customClass,
    store,
    dispatch,
    fetchPartisipans,
    addPartisipan,
    removePartisipan,
    clearPartisipan
  } = props

  // ** States
  const [paramIsSearchPartisipan, setParamIsSearchPartisipan] = useState(false)
  const [keywordPartisipan, setKeywordPartisipan] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(fetchPartisipans({
        keyword:keywordPartisipan
      }))
    }, 500)

    return () => clearTimeout(timer)
  }, [keywordPartisipan])

  const PlusMinusButtonPartisipan = () => {
    if (paramIsSearchPartisipan) {
      return <MinusCircle size={16} />
    } else {
      return <PlusCircle size={16} />
    }
  }

  const handleClickAddPartisipan = () => {
    setKeywordPartisipan('')
    setParamIsSearchPartisipan(!paramIsSearchPartisipan)
  }

  const handleSearchPartisipan = (e) => {
    setKeywordPartisipan(e.target.value)
  }

  const handleClickPartisipan = (record) => {
    dispatch(addPartisipan(record))
  }

  function handleRemovePartisipan(index) {
    setKeywordPartisipan('')
    setParamIsSearchPartisipan(false)
    dispatch(removePartisipan(index))
  }

  const renderListSearchPartisipan = () => {
    if (store.searchPartisipans.length) {
      return store.searchPartisipans.map((record, index) => {
        return (
          <div key={index} className='cursor-pointer'>
            <div 
              className={`employee-task d-flex justify-content-between align-items-center border-bottom botder-2 mb-2 p-2 ${(store.addedPartisipan.some(param => param.nik === record.nik)) ? 'bg-success-100' : '100'}`}
              onClick={() => handleClickPartisipan(record)}
            >
              <div className="mb-auto">
                <div className="avatar photo-karyawan me-1">
                  <img 
                    alt="..." 
                    src={record.foto}
                    style={{
                      width:'2.75rem',
                      height:'2.75rem',
                      border:'1px solid var(--bs-tertiary)'
                    }}
                  />
                </div>
              </div>
              <div className="me-auto ms-2">
                <span className="mb-0 fs-4 d-block fw-bolder">{record.name} - {record.nik}</span>
                <small className="m-0 text-muted">{record.v_short_posisi}</small>
              </div>
            </div>
          </div>
        )
      })
    }
    
    return (
      <div className='text-center text-muted my-5'>
        <i>Data Karyawan Tidak Ditemukan</i>
      </div>
    )
  }

  const renderAddedPartisipan = () => {
    if (store.addedPartisipan.length) {
      return store.addedPartisipan.map((record, index) => {
        return (
          <div key={index} className='mb-auto d-flex align-items-center py-1'>
            <Button 
              className='btn-icon btn-sm' 
              color='danger' 
              outline
              type='button'
              onClick={() => handleRemovePartisipan(index)}
            >
              <Trash size={16} />
            </Button>
            <div id={`addedPartisipan${index}`} className="avatar photo-karyawan mx-2">
              <img 
                alt="..." 
                src={record.foto}
                style={{
                  width:'2.75rem',
                  height:'2.75rem',
                  border:'1px solid var(--bs-tertiary)'
                }}
              />
            </div>
            <div className='d-flex flex-column justify-content-center'>
              <span className='fs-3 fw-bolder'>{record.name} - {record.nik}</span>
              <span className='fs-3 text-muted'>{record.v_short_posisi}</span>
            </div>
          </div>
        )
      })
    }
    
    return null
  }

  return (
    <>
      <div className='mb-4'>
        <Label className='form-label fs-4'>
          { (label !== undefined) ? label : 'Partisipan' }
        </Label>
        <Button 
          className='btn-icon btn-sm rounded-circle float-end' 
          color='default' 
          type='button'
          onClick={handleClickAddPartisipan}
        >
          <PlusMinusButtonPartisipan />
        </Button>
      </div>
      {
        store.addedPartisipan.length ? 
        <>
          <PerfectScrollbar className='mb-4' style={{
            maxHeight:'18.75rem'
          }}>
            {renderAddedPartisipan()}
          </PerfectScrollbar>
        </> : <></>
      }
      {
        paramIsSearchPartisipan ? 
        <>
          <div className={ (customClass !== undefined) ? customClass : 'mb-4' }>
            <Card style={{
              position:'absolute',
              zIndex:27,
              left:'1.25rem',
              right:'1.25rem'
            }}>
              <CardBody>
                <div className='d-flex align-items-center'>
                  <InputGroup className='input-group-merge'>
                      <InputGroupText>
                        <Search size={16} />
                      </InputGroupText>
                    <Input 
                      placeholder='Cari Partisipan' 
                      onChange={handleSearchPartisipan}
                      value={keywordPartisipan}
                    />
                  </InputGroup>
                </div>
                <PerfectScrollbar className='my-5 list-search-partisipan' style={{
                  maxHeight:'18.75rem'
                }}>
                  {renderListSearchPartisipan()}
                </PerfectScrollbar>
              </CardBody>
            </Card>
          </div>
        </> : <></>
      }
    </>
  )
}

export default FieldPartisipan