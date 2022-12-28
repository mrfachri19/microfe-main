// ** React Imports
import { useEffect, useState } from 'react'

// ** Reactstrap Imports
import { Button, Label, Input, InputGroup, InputGroupText, Card, CardBody, UncontrolledTooltip } from 'reactstrap'

// ** Icon Import
import { PlusCircle, MinusCircle, Search, Trash } from 'react-feather'

// ** Third Party Components
import PerfectScrollbar from 'react-perfect-scrollbar'
import toastAlert from "@src/utils/alert"

const FieldPembicara = props => {
  const {
    label,
    customClass,
    store,
    dispatch,
    fetchPembicaras,
    addPembicara,
    removePembicara,
    clearPembicara,
    paramIsShowDetail
  } = props

  // ** States
  const [paramIsSearchPembicara, setParamIsSearchPembicara] = useState(false)
  const [keywordPembicara, setKeywordPembicara] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(fetchPembicaras({
        keyword:keywordPembicara
      }))
    }, 500)

    return () => clearTimeout(timer)
  }, [keywordPembicara])

  const PlusMinusButtonPembicara = () => {
    if (paramIsSearchPembicara) {
      return <MinusCircle size={16} />
    } else {
      return <PlusCircle size={16} />
    }
  }

  const handleClickAddPembicara = () => {
    setKeywordPembicara('')
    setParamIsSearchPembicara(!paramIsSearchPembicara)
  }

  const handleSearchPembicara = (e) => {
    setKeywordPembicara(e.target.value)
  }

  const handleClickPembicara = (record) => {
    dispatch(addPembicara(record))
  }

  function handleRemovePembicara(index) {
    setKeywordPembicara('')
    setParamIsSearchPembicara(false)
    dispatch(removePembicara(index))
  }

  const renderListSearchPembicara = () => {
    if (store.searchPembicaras.length) {
      return store.searchPembicaras.map((record, index) => {
        return (
          <div key={index} className='cursor-pointer'>
            <div 
              className={`employee-task d-flex justify-content-between align-items-center border-bottom botder-2 mb-2 p-2 ${(store.addedPembicara.some(param => param.nik === record.nik)) ? 'bg-success-100' : '100'}`}
              onClick={() => handleClickPembicara(record)}
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

  const renderAddedPembicara = () => {
    if (store.addedPembicara.length) {
      return store.addedPembicara.map((record, index) => {
        return (
          <div key={index} className='mb-auto d-flex align-items-center py-1'>
            <Button 
              className='btn-icon btn-sm' 
              color='danger' 
              outline
              type='button'
              onClick={() => handleRemovePembicara(index)}
            >
              <Trash size={16} />
            </Button>
            <div id={`addedPembicara${index}`} className="avatar photo-karyawan mx-2">
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

  if (paramIsShowDetail) {
    return (
      <>
        <div className='mb-4'>
          <Label className='form-label fs-4'>
            { (label !== undefined) ? label : 'Pembicara' }
          </Label>
          <Button 
            className='btn-icon btn-sm rounded-circle float-end' 
            color='default' 
            type='button'
            onClick={handleClickAddPembicara}
          >
            <PlusMinusButtonPembicara />
          </Button>
        </div>
        {
          store.addedPembicara.length ? 
          <>
            <PerfectScrollbar className='mb-4' style={{
              maxHeight:'18.75rem'
            }}>
              {renderAddedPembicara()}
            </PerfectScrollbar>
          </> : <></>
        }
        {
          paramIsSearchPembicara ? 
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
                        placeholder='Cari Pembicara' 
                        onChange={handleSearchPembicara}
                        value={keywordPembicara}
                      />
                    </InputGroup>
                    <div className='ps-2 pt-2 pb-2'>
                      <PlusCircle 
                        id='addPembicaraLuar' 
                        className='text-primary cursor-pointer' 
                        size={24} 
                        onClick={() => {toastAlert('error', 'toke')}}
                      />
                      <UncontrolledTooltip placement='left' target='addPembicaraLuar'>
                        Tambah { (label !== undefined) ? label : 'Pembicara' } Luar
                      </UncontrolledTooltip>
                    </div>
                  </div>
                  <PerfectScrollbar className='my-5 list-search-pembicara' style={{
                    maxHeight:'18.75rem'
                  }}>
                    {renderListSearchPembicara()}
                  </PerfectScrollbar>
                </CardBody>
              </Card>
            </div>
          </> : <></>
        }
      </>
    )
  }

  return null
}

export default FieldPembicara