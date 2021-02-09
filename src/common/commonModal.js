import React from "react";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
// import DeleteIcon from "../assets/images/dashboard/delete-modal-icon.png";
// import CloseIcon from "../assets/images/dashboard/closeIcon.png";

class CommonModal extends React.Component {
  render() {
    const { isOpen, toggle, loading, blockUser } = this.props;
    console.log("dhjfgdjh", this.props);
    return (
      <Modal
        isOpen={isOpen}
        toggle={toggle}
        className="deleteModal mt-5 modal-dialog-centered"
      >
        <ModalHeader toggle={toggle}></ModalHeader>
        <ModalBody className="text-center">
          <div className="text-center mb-3"></div>

          <h2>Want to Block</h2>
          <p>Do you really want to block this user ?</p>
          <div className="text-center deleteBtn mt-4">
            <Button
              color="primary"
              onClick={() => blockUser()}
              // disabled={loading}
            >
              Yes, Confirmed
            </Button>
          </div>
        </ModalBody>
      </Modal>
    );
  }
}

export default CommonModal;
