// ** React Import
import { useState } from 'react'

// ** Reactstrap Imports
import { Button, Label, Input } from 'reactstrap'

// ** Icon Import
import { PlusCircle, Trash } from 'react-feather'

// ** Third Party Components
import PerfectScrollbar from 'react-perfect-scrollbar'

const FieldLampiran = props => {
  const {
    label,
    store,
    dispatch,
    addAttachment,
    removeAttachment,
    paramIsShowDetail
  } = props

  const [file, setFile] = useState('')

  const handleClickButton = () => {
    const fileLampiran = document.getElementById('fileLampiran')
    fileLampiran.click()
  }

  const handleChangeFileLampiran = (e) => {
    if (e.target.files.length) {
      for (let i = 0; i < e.target.files.length; i++) {
        const record = e.target.files[i];
        dispatch(addAttachment(record))
      }
    }

    setFile('')
  }

  function handleRemoveLampiran(index) {
    dispatch(removeAttachment(index))
  }

  const renderLampiran = () => {
    if (store.attachments.length) {
      return store.attachments.map((record, index) => {
        return (
          <div key={index} className='mb-auto d-flex py-1'>
            <Button 
              className='btn-icon' 
              color='danger' 
              outline
              type='button'
              onClick={() => handleRemoveLampiran(index)}
            >
              <Trash size={16} />
            </Button>
            <div className='d-flex flex-column justify-content-center mx-3'>
              <small className='text-break'>{record.name}</small>
            </div>
          </div>
        )
      })
    }

    return null
  }

  function formatBytes(bytes, decimals = 0) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  if (paramIsShowDetail) {
    return (
      <>
        <div className='mb-4'>
          <Label className='form-label fs-4'>
            { (label !== undefined) ? label : 'Lampiran' }
          </Label>
          <Button 
            className='btn-icon btn-sm rounded-circle float-end' 
            color='default' 
            type='button'
            onClick={handleClickButton}
          >
            <PlusCircle size={16} />
          </Button>
          <Input
            id='fileLampiran'
            type='file'
            className='d-none'
            multiple
            onChange={handleChangeFileLampiran}
            value={file}
          />
        </div>
        {
          store.attachments.length ? 
          <>
            <PerfectScrollbar className='mb-4' style={{
              maxHeight:'18.75rem'
            }}>
              {renderLampiran()}
            </PerfectScrollbar>
          </> : <></>
        }
      </>
    )
  }

  return null
}

export default FieldLampiran