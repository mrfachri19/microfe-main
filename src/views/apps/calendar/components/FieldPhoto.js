// ** React Import
import { useState } from 'react'

// ** Reactstrap Imports
import { Button, Label, Input } from 'reactstrap'

// ** Icon Import
import { PlusCircle, Trash } from 'react-feather'

// ** Third Party Components
import { isEmptyObject } from 'jquery'

const FieldPhoto = props => {
  const {
    label,
    store,
    dispatch,
    changePhoto,
    removePhoto,
    paramIsShowDetail
  } = props

  const [file, setFile] = useState('')
  const [imgData, setImgData] = useState(null)

  const handleClickButton = () => {
    const filePhoto = document.getElementById('filePhoto')
    filePhoto.click()
  }

  const handleChangeFilePhoto = (e) => {
    if (e.target.files.length) {
      for (let i = 0; i < e.target.files.length; i++) {
        const record = e.target.files[i];
        dispatch(changePhoto(record))
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          setImgData(reader.result);
        });
        reader.readAsDataURL(e.target.files[i]);
      }
    }

    setFile('')
  }

  function handleRemovePhoto() {
    dispatch(removePhoto())
  }

  const renderPhoto = () => {
    if (!isEmptyObject(store.photo)) {
      return (
        <>
          <Button 
            className='btn-icon' 
            color='danger' 
            type='button'
            onClick={handleRemovePhoto}
            style={{
              position:'absolute'
            }}
          >
            <Trash size={16} />
          </Button>
          <img className='rounded' src={imgData ? imgData : store.photo.photoPath} alt='...' style={{ width:'100%', maxHeight:'15rem' }} />
        </>
      )
    }

    return null
  }

  if (paramIsShowDetail) {
    return (
      <>
        <div className='mb-4 '>
          <Label className='form-label fs-4'>
            { (label !== undefined) ? label : 'Foto Acara' }
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
            id='filePhoto'
            type='file'
            className='d-none'
            accept='image/*'
            onChange={handleChangeFilePhoto}
            value={file}
          />
        </div>
        <div className='mb-4' style={{
          maxHeight:'18.75rem'
        }}>
          {renderPhoto()}
        </div>
      </>
    )
  }

  return null
}

export default FieldPhoto