import React from 'react'
import { Section, Title, SubTitle, Container } from '@brightleaf/elements'
import { OrgDiagram } from 'basicprimitivesreact'
import primitives from 'basicprimitives'

export default () => {
  var photos = {
    a:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAA8CAIAAACrV36WAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGnSURBVGhD7dnBbQJBDAVQk1o2QjlQwKYGzpSwKQfq4IxICRTB9jLZHCJFwWv7/7EiDt6zmX2yPYMHNq01eb7n5flI36JiIXWpbFW2kAwgsdVblS0kA0hs9db/ZWs+vW/Wno9PxPE3dhls6Od+HI1XT1d64Sb8R5utEulwdbA8VY+LZ/kqkfF456pBHxDz5Xxze/p2vsxukBbAshTVOE0PO4B2cUlWKrgUTKsrV0eut3RVU/cm5aKKqPXVbjuIDPtDUh2JImq1+jmjkupIFNFStXadHncWXkecpb3393me4oJZnionXyjLV6W4QFZEleHCWNG+0eKggQJiRVV6vhAXwoqrul0AC1H1uuIsTLUyukYH1jBL7WJ8lgq6oqwkVXSQDrLSVEFXjJWoirlCrFRVyBVhJasirgCr65tEv7a5A5jL0tcN7vNl9OVcHqtXRbocVr+Kc9k3H/3qPL69Ise7dh0SsS+2JmtFddgvdy/gGbY7Jdp2GRcyrlu1BfUjxtiPRm/lqVbGHOMHnU39zQm0I/UbBLA+GVosJHGVrcoWkgEktnoLydYXkF/LiXG21MwAAAAASUVORK5CYII=',
  }
  const config = {
    pageFitMode: primitives.common.PageFitMode.AutoSize,
    autoSizeMinimum: { width: 100, height: 100 },
    cursorItem: 0,
    highlightItem: 0,
    hasSelectorCheckbox: primitives.common.Enabled.True,
    items: [
      {
        id: 0,
        parent: null,
        title: 'Big Dawg',
        description: 'Top of the heap',
        image: photos.a,
      },
      {
        id: 1,
        parent: 0,
        title: 'Scrub',
        description: 'Nobody Special',
        image: photos.a,
      },
      {
        id: 2,
        parent: 0,
        title: 'Another Pleeb',
        description: 'LOL',
        image: photos.a,
      },
    ],
  }
  return (
    <Section>
      <Title>Make Things</Title>
      <SubTitle>Create awesome things</SubTitle>
      <Container>
        <OrgDiagram centerOnCursor={true} config={config} />
      </Container>
    </Section>
  )
}
