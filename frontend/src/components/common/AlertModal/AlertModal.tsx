import { Fragment } from 'react';

import { alertModalTitle, alertText, messageContainer } from './AlertModal.styled';
import Modal from '../Modal/Modal';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  title?: string;
}

const AlertModal = ({ isOpen, onClose, message, title }: AlertModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Header position="center">
        <Modal.Title css={alertModalTitle}>{title || '알림'}</Modal.Title>
        <Modal.IconButton onClick={onClose} />
      </Modal.Header>
      <Modal.Content css={messageContainer}>
        {message.split('\n').map((text) => (
          <Fragment key={text}>
            <span css={alertText}>{text}</span>
            <br />
          </Fragment>
        ))}
      </Modal.Content>
      <Modal.Footer buttonPosition="center">
        <Modal.TextButton onClick={onClose}>닫기</Modal.TextButton>
      </Modal.Footer>
    </Modal>
  );
};

export default AlertModal;