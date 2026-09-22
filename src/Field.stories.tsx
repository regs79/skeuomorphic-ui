import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Chip, Chips, Segmented } from './Button.js';
import { AddForm, Field, Input, Select } from './Field.js';

const meta = {
  title: 'Controls/Field',
  component: Field,
} satisfies Meta<typeof Field>;
export default meta;
type Story = StoryObj<typeof meta>;
// Render-only stories: the component's required props are supplied inside render.
type Free = StoryObj;

export const TextField: Story = {
  args: { label: 'Name', children: <Input placeholder="Loblaws (cottage)" autoCapitalize="words" /> },
};

export const WithHint: Story = {
  args: {
    label: 'Location',
    hint: 'Optional. Puts this area at the top of the list when you are nearby.',
    children: <Input placeholder="43.65, -79.38" inputMode="decimal" />,
  },
};

export const SelectField: Story = {
  args: {
    label: 'Area',
    children: (
      <Select defaultValue="toronto">
        <option value="toronto">Toronto</option>
        <option value="cottage">Cottage</option>
        <option value="__new__">New area…</option>
      </Select>
    ),
  },
};

export const GroupOfButtons: Free = {
  name: 'Holding buttons (as="div")',
  render: function Render() {
    const [hide, setHide] = useState(true);
    return (
      <div style={{ display: 'grid', gap: '1.25rem' }}>
        <Field as="div" label="Completed items" hint="Whether the completed section starts open.">
          <Segmented
            value={hide}
            onChange={setHide}
            options={[
              { value: true, label: 'Hidden' },
              { value: false, label: 'Shown' },
            ]}
          />
        </Field>
        <Field as="div" label="Carries" hint="Optional. With nothing picked, this store is offered for everything.">
          <Chips>
            <Chip pressed>Groceries</Chip>
            <Chip pressed={false}>Pharmacy</Chip>
            <Chip suggested>+ Hardware</Chip>
          </Chips>
        </Field>
      </div>
    );
  },
};

export const Sizes: Free = {
  render: () => (
    <div style={{ display: 'grid', gap: '1rem' }}>
      <Input size="sm" type="date" defaultValue="2026-09-30" aria-label="Small" />
      <Input placeholder="Medium (default)" />
      <Input size="lg" placeholder="Large: the add bar" />
    </div>
  ),
};

export const Add: Free = {
  name: 'AddForm',
  render: () => <AddForm placeholder="Add an aisle" onAdd={(t) => alert(t)} />,
};
