import React from 'react'
import About from '../../pages/about/index.md' // <-- THIS
import MarkdownComponent from '../components/markdown-component'
export default () => (
  <main>
    <MarkdownComponent source={About.html} />
  </main>
)
