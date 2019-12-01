import React from 'react'
import {
  Section,
  Title,
  SubTitle,
  Container,
  Button,
  Loader,
  Notification,
} from '@brightleaf/elements'
import { useAsync } from '@brightleaf/react-hooks'
import { delay } from '@kev_nz/async-tools'
import BackOff from 'back-off'

const backoff = new BackOff({
  times: 5,
  delay: 50,
  backoff: true,
})

const asyncTask = async () => {
  console.info('async task')
  let tries = 0
  const retryTask = async payload => {
    console.info('the retry')
    await delay(100)
    tries++
    if (tries < 3) {
      throw new Error('not enough')
    }
    return {
      name: 'Executed',
      times: tries,
    }
  }
  try {
    const resultOfBackOff = await backoff.execute(() =>
      retryTask({ data: 0, value: 1000 })
    )

    console.info('resultOfBackOff', resultOfBackOff)
    return resultOfBackOff
  } catch (err) {
    console.error('The Final Error', err)
  }
}

export default () => {
  const { loading, error, data, execute, ...other } = useAsync(() =>
    asyncTask()
  )
  console.info({ error, data })
  console.info('other', other)
  return (
    <Section>
      <Title>Make Things</Title>
      <SubTitle as="p">Create awesome things</SubTitle>
      <Container>
        <br />
        <Button
          isPrimary
          onClick={e => {
            e.preventDefault()
            console.log('click', execute.toString())
            execute()
          }}
        >
          Back Off Test
        </Button>
        {loading && <Loader />}
        {data && (
          <Notification
            isShown={data && data.name}
            isSuccess
            isDismissible={false}
          >
            {data.name} {data.times} times
          </Notification>
        )}
        {error && data && (
          <Notification
            isShown={data && data.name}
            isDanger
            isDismissible={false}
          >
            {data.name} {data.times} times
          </Notification>
        )}
      </Container>
    </Section>
  )
}
