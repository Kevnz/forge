import React, { useRef } from 'react'
import { TextArea, TextBox, Hidden, Form } from 'react-form-elements'
import { Button, Section, Title } from '@brightleaf/elements'

import Confirm from '../components/confirm'

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

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

        <Confirm
          question="Are you sure you want to send the message?"
          onConfirm={e => {
            console.log('confirm button click')
            console.log('form ref', formRef.current)
            formRef.current.submit()
          }}
          onCancel={() => {
            console.log('cancelled')
          }}
        >
          Send
        </Confirm>
      </Form>
    </Section>
  )
}
console.log('rende')
export default ContactForm
