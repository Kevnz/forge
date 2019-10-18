import React, { useEffect } from 'react'

import {
  Modal,
  useToggle,
  ModalCard,
  ModalCardBody,
  ModalCardFoot,
  ModalCardHead,
  Button,
} from '@brightleaf/elements'

const Confirm = ({
  onConfirm,
  onCancel,
  question,
  show,
  confirmText,
  declineText,
  buttonText,
  isDisabled,
}) => {
  const [modalShown, setModalShown] = useToggle(false)

  return (
    <>
      <Button
        isPrimary
        isLoading={modalShown}
        onClick={e => {
          console.log('show')
          setModalShown(true)
          e.preventDefault()
        }}
      >
        {buttonText}
      </Button>
      <Modal
        includeTrigger={false}
        triggerText=""
        triggerFn={setModalShown}
        isActive={modalShown}
        ModalType={ModalCard}
        onCloseClick={onCancel}
      >
        <ModalCardHead title="Success"></ModalCardHead>
        <ModalCardBody>{question}</ModalCardBody>
        <ModalCardFoot>
          <Button
            isSuccess
            onClick={e => {
              e.preventDefault()
              onConfirm()
              setModalShown(false)
            }}
          >
            {confirmText}
          </Button>
          <Button
            onClick={e => {
              e.preventDefault()
              onCancel()
              setModalShown(false)
            }}
          >
            {declineText}
          </Button>
        </ModalCardFoot>
      </Modal>
    </>
  )
}

Confirm.defaultProps = {
  confirmText: 'Ok',
  onCancel: () => {},
  onConfirm: () => {},
  declineText: 'Cancel',
  buttonText: 'Save',
}

export default Confirm
