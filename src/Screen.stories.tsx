import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button.js';
import { AddForm } from './Field.js';
import { Menu, MenuAction, MenuFooter } from './Menu.js';
import { Badge, Row } from './Row.js';
import { BottomBar, Empty, Screen, ScreenBody, ScreenHeader } from './Screen.js';
import { Hint, SectionTitle } from './Text.js';

const meta = {
  title: 'Layout/Screen',
  component: Screen,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Screen>;
export default meta;
type Story = StoryObj<typeof meta>;

const menu = (
  <Menu
    items={[{ label: 'Products', onSelect: () => {} }]}
    footer={
      <>
        <MenuAction onSelect={() => {}}>Refresh app</MenuAction>
        <MenuFooter>a1b2c3d</MenuFooter>
      </>
    }
  />
);

export const ListOfThings: Story = {
  render: () => (
    <Screen>
      <ScreenHeader title="Aisles" onBack={() => {}} backLabel="Back to list" trailing={menu} />
      <ScreenBody>
        <Hint>Drag to match the order you walk the store.</Hint>
        <SectionTitle>Front of store</SectionTitle>
        {['Produce', 'Bakery', 'Dairy'].map((n, i) => (
          <Row key={n}>
            <Row.Main>
              <Row.Grip />
              <Row.Name>{n}</Row.Name>
              <Badge>{i + 2}</Badge>
            </Row.Main>
            <Row.Edit label={`Edit ${n}`} />
          </Row>
        ))}
      </ScreenBody>
      <BottomBar>
        <AddForm placeholder="Add an aisle" onAdd={() => {}} />
      </BottomBar>
    </Screen>
  ),
};

export const LargeTitleWithAccent: Story = {
  render: () => (
    <Screen>
      <ScreenHeader title="No Frills" accent="#457b9d" onBack={() => {}} trailing={menu} />
      <ScreenBody>
        <Empty>Nothing on the list.</Empty>
      </ScreenBody>
    </Screen>
  ),
};

export const FirstRun: Story = {
  render: () => (
    <Screen>
      <ScreenHeader title="Stores" size="large" trailing={menu} />
      <Empty fill>
        <p>No stores yet.</p>
        <Button>Add your first store</Button>
      </Empty>
    </Screen>
  ),
};

export const FormHeader: Story = {
  render: () => (
    <Screen as="form" onSubmit={(e) => e.preventDefault()}>
      <ScreenHeader
        title="Edit store"
        leading={
          <Button variant="link" onClick={() => {}}>
            Cancel
          </Button>
        }
        trailing={
          <>
            <Button variant="link" type="submit">
              Save
            </Button>
            {menu}
          </>
        }
      />
      <ScreenBody stack>
        <Hint>Fields go here.</Hint>
      </ScreenBody>
    </Screen>
  ),
};
