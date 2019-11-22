import React from 'react'
import {
  Section,
  Title,
  SubTitle,
  Container,
  Field,
  Control,
  Button,
} from '@brightleaf/elements'
import { Form, TextInput, PasswordInput } from 'react-form-elements'
import { Link, navigate } from '@reach/router'
import GoTrue from 'gotrue-js'

const auth = new GoTrue({
  APIUrl: 'https://forge.kevnz.xyz/.netlify/identity',
  audience: '',
  setCookie: false,
})
export default () => (
  <Section>
    <Title>The Forge</Title>
    <SubTitle as="p">Accept Invite</SubTitle>
    <Container>
      <br />
      <Form
        name="signup"
        className="form"
        onSubmit={({ email, password }) => {
          auth
            .login(email, password, true)

            .then(({ token, role, email }) => {
              console.info('result', { token, role, email })

              navigate('/')
            })
            .catch(error => console.error("It's an error", error))
        }}
      >
        <TextInput
          name="email"
          label="Email"
          className="field control"
          labelClassName="label"
          inputClassName="input"
        />
        <PasswordInput
          name="password"
          label="password"
          className="field control"
          labelClassName="label"
          inputClassName="input"
        />

        <Field>
          <Control>
            <Button isPrimary>Login</Button>
            <Link className="button" to="/">
              Cancel
            </Link>
          </Control>
        </Field>
      </Form>
    </Container>
  </Section>
)
