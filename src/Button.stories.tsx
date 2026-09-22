import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, Chip, Chips, Segmented } from './Button.js';

const meta = {
  title: 'Controls/Button',
  component: Button,
  args: { children: 'Add store', variant: 'primary', block: false, disabled: false },
  argTypes: { variant: { control: 'select', options: ['primary', 'secondary', 'link', 'danger', 'quiet'] } },
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
export const Secondary: Story = { args: { variant: 'secondary', children: 'Recipes' } };
export const Link: Story = { args: { variant: 'link', children: 'Done' } };
export const Danger: Story = { args: { variant: 'danger', children: 'Remove' } };
export const Quiet: Story = { args: { variant: 'quiet', children: '3 other areas' } };
export const Disabled: Story = { args: { disabled: true } };

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '1rem' }}>
      <Button block>Add store</Button>
      <Button variant="secondary" block>
        Nothing nearby — add a store here
      </Button>
      <Button variant="quiet" block>
        3 other areas
      </Button>
      <Button variant="danger" block>
        Delete recipe
      </Button>
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
        <Button variant="danger">Remove</Button>
        <Button variant="link">Cancel</Button>
        <Button variant="link">Done</Button>
      </div>
    </div>
  ),
};

export const ChipToggles: Story = {
  name: 'Chips',
  render: function Render() {
    const [on, setOn] = useState<string[]>(['Produce']);
    const toggle = (n: string) => setOn((s) => (s.includes(n) ? s.filter((x) => x !== n) : [...s, n]));
    return (
      <Chips>
        {['Produce', 'Dairy', 'Bakery'].map((n) => (
          <Chip key={n} pressed={on.includes(n)} onClick={() => toggle(n)}>
            {n}
          </Chip>
        ))}
        <Chip suggested>+ Hardware</Chip>
      </Chips>
    );
  },
};

export const SegmentedControl: Story = {
  name: 'Segmented',
  render: function Render() {
    const [mode, setMode] = useState<'category' | 'manual'>('category');
    return (
      <Segmented
        label="List style"
        value={mode}
        onChange={setMode}
        options={[
          { value: 'category', label: 'Grouped by aisle' },
          { value: 'manual', label: 'Simple list' },
        ]}
      />
    );
  },
};
