import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, Chip, Chips } from './Button.js';
import { Field, Input } from './Field.js';
import { InlineField, Sheet } from './Sheet.js';
import { Hint } from './Text.js';
import { Toast } from './Toast.js';

const meta = {
  title: 'Overlays/Sheet',
  component: Sheet,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Sheet>;
export default meta;
type Story = StoryObj<typeof meta>;
// Render-only stories: the component's required props are supplied inside render.
type Free = StoryObj;

export const EntrySheet: Story = {
  args: {
    label: 'Yogurt',
    title: 'Yogurt',
    leading: <Button variant="link">Remove</Button>,
    trailing: <Button variant="link">Done</Button>,
    onDismiss: () => {},
    children: (
      <>
        <Chips>
          <Chip pressed>Greek</Chip>
          <Chip pressed={false}>Vanilla</Chip>
        </Chips>
        <Field label="Note">
          <Input placeholder="Greek, PC brand, on sale…" />
        </Field>
        <Field label="Quantity">
          <Input placeholder="1" inputMode="decimal" />
        </Field>
        <InlineField>
          <Hint>Until</Hint>
          <Input size="sm" type="date" defaultValue="2026-09-30" />
        </InlineField>
      </>
    ),
  },
};

export const UndoToast: Free = {
  render: () => (
    <div style={{ minHeight: '8rem' }}>
      <Toast action="Undo" onAction={() => {}}>
        Milk ✓
      </Toast>
    </div>
  ),
};
