// ** React Imports
import { useEffect, useState } from 'react'

// ** Reactstrap Imports
import { Button, Label, Input, InputGroup, InputGroupText, Card, CardBody, UncontrolledTooltip } from 'reactstrap'

// ** Icon Import
import { PlusCircle, Search } from 'react-feather'
import { Edit16Regular } from "@fluentui/react-icons";

// ** Third Party Components
import PerfectScrollbar from 'react-perfect-scrollbar'
import toastAlert from "@src/utils/alert"

const FieldPenyelenggara = props => {
  const {
    label,
    customClass,
    store,
    dispatch,
    fetchPenyelenggaras,
    addPenyelenggara,
    clearPenyelenggara,
    paramIsShowDetail
  } = props

  // ** States
  const [paramIsSearchPenyelenggara, setParamIsSearchPenyelenggara] = useState(false)
  const [keywordPenyelenggara, setKeywordPenyelenggara] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(fetchPenyelenggaras({
        keyword:keywordPenyelenggara
      }))
    }, 500)

    return () => clearTimeout(timer)
  }, [keywordPenyelenggara])

  const handleClickAddPenyelenggara = () => {
    setKeywordPenyelenggara('')
    setParamIsSearchPenyelenggara(!paramIsSearchPenyelenggara)
  }

  const handleSearchPenyelenggara = (e) => {
    setKeywordPenyelenggara(e.target.value)
  }

  const handleClickPenyelenggara = (record) => {
    dispatch(clearPenyelenggara())
    dispatch(addPenyelenggara(record))

    setKeywordPenyelenggara('')
    setParamIsSearchPenyelenggara(!paramIsSearchPenyelenggara)
  }

  const renderListSearchPenyelenggara = () => {
    if (store.searchPenyelenggaras.length) {
      return store.searchPenyelenggaras.map((record, index) => {
        return (
          <div key={index} className='cursor-pointer'>
            <div 
              className={`employee-task d-flex justify-content-between align-items-center border-bottom botder-2 mb-2 p-2 ${(store.addedPenyelenggara.some(param => param.nik === record.nik)) ? 'bg-success-100' : '100'}`}
              onClick={() => handleClickPenyelenggara(record)}
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

  const renderAddedPenyelenggara = () => {
    if (store.addedPenyelenggara.length) {
      return store.addedPenyelenggara.map((record, index) => {
        return (
          <div key={index} className='mb-auto d-flex py-1'>
            <div id={`addedPenyelenggara${index}`} className="avatar photo-karyawan me-1">
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
            <div className='d-flex flex-column justify-content-center mx-1'>
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
            { (label !== undefined) ? label : 'Penyelenggara' }
          </Label>
          <Button 
            className='btn-icon btn-sm rounded-circle float-end' 
            color='default' 
            type='button'
            onClick={handleClickAddPenyelenggara}
          >
            <Edit16Regular className='text-primary' size={16} />
          </Button>
        </div>
        {
          store.addedPenyelenggara.length ? 
          <>
            <PerfectScrollbar className='mb-4' style={{
              maxHeight:'18.75rem'
            }}>
              {renderAddedPenyelenggara()}
            </PerfectScrollbar>
          </> : <></>
        }
        {
          paramIsSearchPenyelenggara ? 
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
                        placeholder='Cari Penyelenggara' 
                        onChange={handleSearchPenyelenggara}
                        value={keywordPenyelenggara}
                      />
                    </InputGroup>
                    <div className='ps-2 pt-2 pb-2'>
                      <PlusCircle 
                        id='addPenyelenggaraLuar' 
                        className='text-primary cursor-pointer' 
                        size={24} 
                        onClick={() => {toastAlert('error', 'toke')}}
                      />
                      <UncontrolledTooltip placement='left' target='addPenyelenggaraLuar'>
                        Tambah { (label !== undefined) ? label : 'Penyelenggara' } Luar
                      </UncontrolledTooltip>
                    </div>
                  </div>
                  <PerfectScrollbar className='my-5 list-search-penyelenggara' style={{
                    maxHeight:'18.75rem'
                  }}>
                    {renderListSearchPenyelenggara()}
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

export default FieldPenyelenggara