import React from "react";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
// import DeleteIcon from "../assets/images/dashboard/delete-modal-icon.png";
// import CloseIcon from "../assets/images/dashboard/closeIcon.png";

class CommonModal extends React.Component {
  render() {
    const { isOpen, toggle, loading, blockUser, type, id } = this.props;
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

          {type === "block" ? (
            <h2>Want to Block</h2>
          ) : type === "unblock" ? (
            <h2>Want to Unblock</h2>
          ) : type === "deactivate" ? (
            <h2>Want to Deactivate</h2>
          ) : (
            ""
          )}
          {type === "block" ? (
            <p>Do you really want to block this {id} user ?</p>
          ) : type === "unblock" ? (
            <p>Do you really want to unblock this {id} user ?</p>
          ) : type === "deactivate" ? (
            <p>Do you really want to deactivate this {id} user ?</p>
          ) : (
            ""
          )}
          <div className="text-center deleteBtn mt-4">
            <Button
              color="primary"
              onClick={() => blockUser(id)}
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
