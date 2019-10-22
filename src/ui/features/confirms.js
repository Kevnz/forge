import React, { useRef } from 'react'
import { TextArea, TextBox, Hidden, Form } from 'react-form-elements'
import { Section, Title, ConfirmButton } from '@brightleaf/elements'
console.log('ConfirmButton', ConfirmButton)
const ContactForm = () => {
  const formRef = useRef()
  return (
    <Section>
      <Title>Contact</Title>

      <Form
        name="contact"
        onSubmit={values => {
          console.log('The form onform submit', values)
        }}
        ref={formRef}
      >
        <TextBox
          name="userName"
          label="Your Name"
          initialValue=""
          className="field control"
          labelClassName="label"
          inputClassName="input"
        />
        <TextBox
          type="email"
          name="userEmail"
          label="Your Email"
          initialValue=""
          className="field control"
          labelClassName="label"
          inputClassName="input"
        />
        <TextArea
          label="Your Message"
          name="message"
          className="field control"
          labelClassName="label"
          inputClassName="textarea"
        />
        <Hidden name="form-name" initialValue="contact" />

        <ConfirmButton
          question="Are you sure you want to send the message?"
          onConfirm={e => {
            console.log('confirm button click')
            console.log('form ref', formRef.current)
            formRef.current.submit()
          }}
          onCancel={() => {
            console.log('cancelled')
            formRef.current.reset()
          }}
        >
          Send
        </ConfirmButton>
      </Form>
    </Section>
  )
}

export default ContactForm
