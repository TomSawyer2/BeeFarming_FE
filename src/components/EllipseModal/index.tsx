import { Modal } from 'antd';
import React from 'react';

interface IProps {
  content?: string;
  maxLength?: number;
}

const EllipseModal = (props: IProps) => {
  const { content = '--', maxLength = 10 } = props;

  const handleOpenModal = (content: string) => {
    Modal.info({
      icon: null,
      content,
      width: 800,
      centered: true,
    });
  };

  if (content?.length <= maxLength) {
    return <span>{content}</span>;
  } else {
    return (
      <span onClick={() => handleOpenModal(content)}>{content?.substring(0, maxLength)}...</span>
    );
  }
};

export default EllipseModal;
