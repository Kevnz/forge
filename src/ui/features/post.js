import React, { useEffect } from 'react'
import { useAsync } from '@brightleaf/react-hooks'
import MarkdownComponent from '../components/markdown-component'
export default ({ slug }) => {
  const { loading, error, data, execute } = useAsync(() => {
    return import(`../../../_posts/blog/${slug}.md`)
  })

  useEffect(() => {
    execute()
  }, [slug])

  if (loading) {
    return <div>loading</div>
  }
  return (
    <main>
      <MarkdownComponent source={data.html} />
    </main>
  )
}
