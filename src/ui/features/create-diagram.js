import React, { useEffect, createRef } from 'react'
import { ArcherContainer, ArcherElement } from 'react-archer'
import { Section, Title, SubTitle, Container } from '@brightleaf/elements'

const rootStyle = { display: 'flex', justifyContent: 'center' }
const rowStyle = {
  margin: '200px 0',
  display: 'flex',
  justifyContent: 'space-between',
  border: '1px solid green',
}
const boxStyle = { padding: '10px', border: '1px solid black' }

const useDragAndDrop = (draggable, target) => {
  useEffect(() => {
    console.log('drags', draggable, target)
    if (draggable.current) {
      console.info('current')
      draggable.current.setAttribute('draggable', true)
    }
    if (target.current) {
      target.current.addEventListener('drop', e => {
        console.info('dropped')
      })
      target.current.addEventListener('dragover', e => {
        console.info('overzs')
        if (!target.current.classList.contains('over')) {
          target.current.classList.add('over')
        }
      })
      target.current.addEventListener('dragend', e => {
        console.info('outs')
      })
    }
  }, [draggable.current])
}

export default () => {
  console.log('create diagram')
  const dragRef = createRef()
  const targetRef = createRef()
  useDragAndDrop(dragRef, targetRef)

  return (
    <Section>
      <Title>Make Things</Title>
      <SubTitle>Create awesome things</SubTitle>
      <Container>
        <ArcherContainer strokeColor="red">
          <div style={rootStyle}>
            <ArcherElement
              id="root"
              relations={[
                {
                  targetId: 'element2',
                  targetAnchor: 'top',
                  sourceAnchor: 'bottom',
                },
              ]}
            >
              <div style={boxStyle}>Root</div>
            </ArcherElement>
          </div>

          <div style={rowStyle}>
            <ArcherElement
              id="element2"
              onRefUpdate={dragRef}
              relations={[
                {
                  targetId: 'element3',
                  targetAnchor: 'left',
                  sourceAnchor: 'right',
                  style: { strokeColor: 'blue', strokeWidth: 1 },
                  label: <div style={{ marginTop: '-20px' }}>Arrow 2</div>,
                },
              ]}
            >
              <div style={boxStyle}>Element 2</div>
            </ArcherElement>

            <ArcherElement id="element3">
              <div style={boxStyle}>Element 3</div>
            </ArcherElement>

            <ArcherElement
              id="element4"
              relations={[
                {
                  targetId: 'root',
                  targetAnchor: 'right',
                  sourceAnchor: 'left',
                  label: 'Arrow 3',
                },
              ]}
            >
              <div style={boxStyle}>Element 4</div>
            </ArcherElement>
          </div>
        </ArcherContainer>
      </Container>
    </Section>
  )
}
