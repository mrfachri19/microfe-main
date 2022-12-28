// ** React Imports
import { Fragment, useState } from "react";

// ** Reactstrap Imports
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const ModalConfig = [
  {
    id: 5,
    btnTitle: "Extra Large Modal",
    modalTitle: "Extra Large Modal",
    modalClass: "modal-xl"
  }
];

const ModalSizes = () => {
  // ** State
  const [modal, setModal] = useState(true);

  // const toggleModal = (id) => {
  //   if (modal !== id) {
  //     setModal(id);
  //   } else {
  //     setModal(null);
  //   }
  // };

  const renderModal = ModalConfig.map((item) => {
    return (
      <Fragment key={item.id}>
        <div>
          <Button
            color="primary"
            onClick={() => toggleModal(item.id)}
            key={item.title}
            outline
          >
            {item.btnTitle}
          </Button>
        </div>
        <Modal
          key={item.id}
          isOpen={modal}
          toggle={() => toggleModal(item.id)}
          className={`modal-dialog-centered ${item.modalClass}`}
        >
          <ModalHeader toggle={() => toggleModal(item.id)}>
            {item.modalTitle}
            {item.title}
          </ModalHeader>
          <ModalBody>
            <Fragment>
              <p>
                Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
                cursus magna, vel scelerisque nisl consectetur et. Donec sed
                odio dui. Donec ullamcorper nulla non metus auctor fringilla.
              </p>
            </Fragment>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => toggleModal(item.id)}
              outline
            >
              Accept
            </Button>
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  });

  return <div className="demo-inline-spacing">{renderModal}</div>;
};
export default ModalSizes;
