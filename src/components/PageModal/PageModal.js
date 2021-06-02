import React from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types'

const PageModal = ({ className, header, modalBody, ...props }) => {
  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      className={className}
      size="lg"
      centered
    >
      {header && (
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">{header}</Modal.Title>
        </Modal.Header>
      )}
      <Modal.Body>{modalBody}</Modal.Body>
    </Modal>
  );
};

PageModal.propTypes = {
  className: PropTypes.any,
  header: PropTypes.any,
  modalBody: PropTypes.any,
};

export default PageModal;
