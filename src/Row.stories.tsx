import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button.js';
import { Input } from './Field.js';
import { Badge, CheckRow, Monogram, Row } from './Row.js';
import { SectionTitle } from './Text.js';

const meta = {
  title: 'Rows/Row',
  component: Row,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Row>;
export default meta;
type Story = StoryObj<typeof meta>;

export const WithPencil: Story = {
  render: () => (
    <Row>
      <Row.Main>
        <Row.Name>Dairy</Row.Name>
        <Badge>12</Badge>
      </Row.Main>
      <Row.Edit label="Edit Dairy" />
    </Row>
  ),
};

export const StoreRows: Story = {
  render: () => (
    <>
      <SectionTitle>Toronto</SectionTitle>
      <Row accent="#457b9d">
        <Row.Main>
          <Monogram color="#457b9d">NF</Monogram>
          <Row.Name>No Frills</Row.Name>
          <Badge tone="priority">!2</Badge>
          <Badge>7</Badge>
        </Row.Main>
        <Row.Edit label="Edit No Frills" />
      </Row>
      <Row accent="#e63946">
        <Row.Main>
          <Monogram color="#e63946">M</Monogram>
          <Row.Name>Metro</Row.Name>
        </Row.Main>
        <Row.Edit label="Edit Metro" />
      </Row>
    </>
  ),
};

export const NameAndMeta: Story = {
  render: () => (
    <>
      <Row>
        <Row.Main>
          <Row.Text>
            <Row.Name>Yogurt</Row.Name>
            <Row.Meta>Greek, PC brand</Row.Meta>
          </Row.Text>
          <Row.Meta>×2</Row.Meta>
        </Row.Main>
        <Row.Edit label="Edit Yogurt" />
      </Row>
      <Row muted>
        <Row.Main>
          <Row.Name style={{ textDecoration: 'line-through' }}>Milk</Row.Name>
        </Row.Main>
      </Row>
    </>
  ),
};

export const Draggable: Story = {
  render: () => (
    <>
      <Row>
        <Row.Main>
          <Row.Grip />
          <Row.Name>Produce</Row.Name>
          <Badge>4</Badge>
        </Row.Main>
        <Row.Edit label="Edit Produce" />
      </Row>
      <Row lifted>
        <Row.Main>
          <Row.Grip />
          <Row.Name>Bakery (lifted)</Row.Name>
        </Row.Main>
        <Row.Edit label="Edit Bakery" />
      </Row>
    </>
  ),
};

export const Editing: Story = {
  render: () => (
    <Row editing>
      <Row.Body>
        <Input defaultValue="Dairy" aria-label="Aisle name" />
        <Row.Actions>
          <Button variant="danger">Remove</Button>
          <Button variant="link">Cancel</Button>
          <Button variant="link">Done</Button>
        </Row.Actions>
      </Row.Body>
    </Row>
  ),
};

export const Link: Story = {
  name: 'Row.Button',
  render: () => (
    <Row.Button>
      <Row.Text>
        <Row.Name>Bananas</Row.Name>
        <Row.Meta>Produce · 2 prices</Row.Meta>
      </Row.Text>
      <Row.Chevron />
    </Row.Button>
  ),
};

export const Checkbox: Story = {
  name: 'CheckRow',
  render: function Render() {
    const [a, setA] = useState(true);
    const [b, setB] = useState(false);
    return (
      <>
        <CheckRow checked={a} onChange={setA}>
          <Row.Name>Flour</Row.Name>
        </CheckRow>
        <CheckRow checked={b} onChange={setB}>
          <Row.Name>
            Butter <Row.Meta>×2</Row.Meta>
          </Row.Name>
        </CheckRow>
        <Row editing>
          <Row.Body>
            <CheckRow inset checked={b} onChange={setB}>
              <Row.Text>
                <Row.Name>Optional</Row.Name>
                <Row.Meta>Usually in the house.</Row.Meta>
              </Row.Text>
            </CheckRow>
          </Row.Body>
        </Row>
      </>
    );
  },
};

export const Static: Story = {
  name: 'Row.Content + Row.Action',
  render: () => (
    <Row>
      <Row.Content>
        <Row.Name>Bananas</Row.Name>
        <Badge>3</Badge>
      </Row.Content>
      <Row.Action label="Remove Bananas">×</Row.Action>
    </Row>
  ),
};
