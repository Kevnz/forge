import React from 'react'

import {
  Modal,
  useToggle,
  ModalCard,
  ModalCardBody,
  ModalCardFoot,
  ModalCardHead,
  Button,
  Field,
  Control,
} from '@brightleaf/elements'

const ConfirmButton = ({
  onConfirm,
  onCancel,
  question,
  confirmText,
  declineText,
  isDisabled,
  children,
}) => {
  const [modalShown, setModalShown] = useToggle(false)

  return (
    <>
      <Button
        disabled={isDisabled}
        isPrimary
        isLoading={modalShown}
        onClick={e => {
          setModalShown(true)
          e.preventDefault()
        }}
      >
        {children}
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
          <Field isGrouped>
            <Control>
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
            </Control>
          </Field>
        </ModalCardFoot>
      </Modal>
    </>
  )
}

ConfirmButton.defaultProps = {
  confirmText: 'Ok',
  onCancel: () => {},
  onConfirm: () => {},
  declineText: 'Cancel',
  question: 'Are you sure?',
}

export default ConfirmButton
