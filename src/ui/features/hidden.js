import React from 'react'
import { Form, TextArea, TextBox, Hidden } from 'react-form-elements'
import { Button, Section, Title } from '@brightleaf/elements'
import { usePost } from '@brightleaf/react-hooks/lib/use-post'
const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

const ContactForm = () => {
  const { data, error, loading, postData } = usePost('/', {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
  console.info({ data, error, loading })
  return (
    <Section>
      <Title>Contact</Title>

      <Form
        name="contact"
        onSubmit={values => {
          postData(encode(values))
        }}
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

        <Button isPrimary>Send</Button>
      </Form>
    </Section>
  )
}
console.log('rende')
export default ContactForm
