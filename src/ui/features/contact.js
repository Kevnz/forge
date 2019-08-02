import React from 'react'
import { Form, TextArea, TextBox, Section, Title } from 'react-form-elements'
import { Button } from '@brightleaf/elements'
import { usePost } from '@brightleaf/react-hooks'
const ContactForm = () => {
  const { data, error, loading, postData } = usePost('/', {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
  console.info({ data, error, loading })
  return (
    <Section>
      <Title>Contact</Title>

      <Form
        onSubmit={values => {
          postData(values)
        }}
      >
        <TextBox name="userName" label="Your Name" initialValue="" />
        <TextBox
          type="email"
          name="userEmail"
          label="Your Email"
          initialValue=""
        />
        <TextArea label="Your Message" name="message" />

        <Button isPrimary>Send</Button>
      </Form>
    </Section>
  )
}

export default ContactForm
