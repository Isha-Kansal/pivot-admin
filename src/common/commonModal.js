import React from "react";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";

class CommonModal extends React.Component {
  render() {
    const { isOpen, toggle, block_delete, type, id } = this.props;

    return (
      <Modal
        isOpen={isOpen}
        toggle={toggle}
        className="deleteModal mt-5 modal-dialog-centered"
      >
        <ModalHeader toggle={toggle}>
          {type === "block" ? (
            <h2>Want to Block</h2>
          ) : type === "unblock" ? (
            <h2>Want to Unblock</h2>
          ) : type === "deactivate" ? (
            <h2>Want to Deactivate</h2>
          ) : type === "deleteResource" ? (
            <h2>Want to Delete</h2>
          ) : type === "deleteExpert" ? (
            <h2>Want to Delete</h2>
          ) : type === "activate" ? (
            <h2>Want to Activate</h2>
          ) : (
            ""
          )}
        </ModalHeader>
        <ModalBody className="text-center">
          <div className="text-center mb-3"></div>

          {type === "block" ? (
            <p>Do you really want to block this user ?</p>
          ) : type === "unblock" ? (
            <p>Do you really want to unblock this user ?</p>
          ) : type === "deactivate" ? (
            <p>Do you really want to deactivate ?</p>
          ) : type === "deleteResource" ? (
            <p>Do you really want to delete this resource ?</p>
          ) : type === "deleteExpert" ? (
            <p>Do you really want to delete this expert ?</p>
          ) : type === "activate" ? (
            <p>Do you really want to activate ?</p>
          ) : (
            ""
          )}
          <div className="text-center deleteBtn mt-4">
            <Button color="success" onClick={() => block_delete(id)}>
              Yes, Confirmed
            </Button>
          </div>
        </ModalBody>
      </Modal>
    );
  }
}

export default CommonModal;
