import { Modal } from "antd";
import React from "react";

const ConfirmModal = function ({
  title,
  bodyText,
  handleOk,
  handleCancel,
  isVisible,
  confirmLoading,
}) {
  return (
    <>
      <Modal
        title={title}
        visible={isVisible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{bodyText}</p>
      </Modal>
    </>
  );
};

export default ConfirmModal;
