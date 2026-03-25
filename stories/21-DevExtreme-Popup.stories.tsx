import type { Meta, StoryObj } from '@storybook/react';
import { Popup } from '../src/components/popup';
import React, { useState } from 'react';

const meta: Meta<typeof Popup> = {
  title: 'DevExtreme/Popup',
  component: Popup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Popup>;

// Wrapper 컴포넌트들
const BasicPopupWrapper = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <button onClick={() => setVisible(true)}>Open Popup</button>
      <Popup
        visible={visible}
        title="Basic Popup"
        content="This is a basic popup with simple content."
        onHiding={() => setVisible(false)}
        width={400}
        height={200}
      />
    </div>
  );
};

const ConfirmPopupWrapper = () => {
  const [visible, setVisible] = useState(false);
  const [result, setResult] = useState('');

  const handleConfirm = () => {
    setResult('Confirmed!');
    setVisible(false);
  };

  const handleCancel = () => {
    setResult('Cancelled');
    setVisible(false);
  };

  return (
    <div>
      <button onClick={() => setVisible(true)}>Open Confirm Dialog</button>
      {result && <p style={{ marginTop: 10 }}>Result: {result}</p>}
      <Popup
        visible={visible}
        title="Confirm Action"
        content="Are you sure you want to proceed with this action?"
        onHiding={() => setVisible(false)}
        width={400}
        buttons={[
          {
            text: 'Confirm',
            type: 'default',
            onClick: handleConfirm,
          },
          {
            text: 'Cancel',
            type: 'outlined',
            onClick: handleCancel,
          },
        ]}
      />
    </div>
  );
};

const NestedPopupWrapper = () => {
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);

  return (
    <div>
      <button onClick={() => setVisible1(true)}>Open First Popup</button>

      <Popup
        visible={visible1}
        title="First Popup"
        onHiding={() => setVisible1(false)}
        width={500}
        height={300}
      >
        <div style={{ padding: 20 }}>
          <p>This is the first popup.</p>
          <button onClick={() => setVisible2(true)}>Open Second Popup</button>
        </div>
      </Popup>

      <Popup
        visible={visible2}
        title="Second Popup (Nested)"
        onHiding={() => setVisible2(false)}
        width={400}
        height={200}
        content="This popup is opened from within the first popup."
      />
    </div>
  );
};

const MultiButtonPopupWrapper = () => {
  const [visible, setVisible] = useState(false);
  const [action, setAction] = useState('');

  return (
    <div>
      <button onClick={() => setVisible(true)}>Open Multi-Button Popup</button>
      {action && <p style={{ marginTop: 10 }}>Action: {action}</p>}

      <Popup
        visible={visible}
        title="Choose an Action"
        content="Please select one of the following options:"
        onHiding={() => setVisible(false)}
        width={450}
        buttons={[
          {
            text: 'Save',
            type: 'default',
            onClick: () => {
              setAction('Saved');
              setVisible(false);
            },
          },
          {
            text: 'Delete',
            type: 'normal',
            onClick: () => {
              setAction('Deleted');
              setVisible(false);
            },
          },
          {
            text: 'Cancel',
            type: 'outlined',
            onClick: () => {
              setAction('Cancelled');
              setVisible(false);
            },
          },
        ]}
      />
    </div>
  );
};

const NoFooterPopupWrapper = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <button onClick={() => setVisible(true)}>Open No Footer Popup</button>

      <Popup
        visible={visible}
        title="Information"
        onHiding={() => setVisible(false)}
        width={400}
        closeOnOutsideClick={true}
      >
        <div style={{ padding: 20 }}>
          <p>This popup has no footer.</p>
          <p>You can close it by clicking outside or the X button.</p>
        </div>
      </Popup>
    </div>
  );
};

const AccordionPopupWrapper = () => {
  const [visible, setVisible] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>('section1');

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div>
      <button onClick={() => setVisible(true)}>Open Accordion Popup</button>

      <Popup
        visible={visible}
        title="FAQ - Accordion Style"
        onHiding={() => setVisible(false)}
        width={600}
        height={400}
      >
        <div style={{ padding: 20 }}>
          <div style={{ marginBottom: 10 }}>
            <button
              onClick={() => toggleSection('section1')}
              style={{ width: '100%', padding: 10, textAlign: 'left', cursor: 'pointer' }}
            >
              Section 1: Introduction {openSection === 'section1' ? '▼' : '▶'}
            </button>
            {openSection === 'section1' && (
              <div style={{ padding: 15, background: '#f5f5f5' }}>
                <p>This is the content of section 1.</p>
              </div>
            )}
          </div>

          <div style={{ marginBottom: 10 }}>
            <button
              onClick={() => toggleSection('section2')}
              style={{ width: '100%', padding: 10, textAlign: 'left', cursor: 'pointer' }}
            >
              Section 2: Details {openSection === 'section2' ? '▼' : '▶'}
            </button>
            {openSection === 'section2' && (
              <div style={{ padding: 15, background: '#f5f5f5' }}>
                <p>This is the content of section 2 with more details.</p>
              </div>
            )}
          </div>

          <div>
            <button
              onClick={() => toggleSection('section3')}
              style={{ width: '100%', padding: 10, textAlign: 'left', cursor: 'pointer' }}
            >
              Section 3: Advanced {openSection === 'section3' ? '▼' : '▶'}
            </button>
            {openSection === 'section3' && (
              <div style={{ padding: 15, background: '#f5f5f5' }}>
                <p>This is the content of section 3 with advanced information.</p>
              </div>
            )}
          </div>
        </div>
      </Popup>
    </div>
  );
};

const DraggablePopupWrapper = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <button onClick={() => setVisible(true)}>Open Draggable Popup</button>

      <Popup
        visible={visible}
        title="Draggable Popup"
        content="You can drag this popup by its title bar!"
        onHiding={() => setVisible(false)}
        width={400}
        height={250}
        dragEnabled={true}
      />
    </div>
  );
};

// Stories
export const Basic: Story = {
  render: () => <BasicPopupWrapper />,
};

export const Confirm: Story = {
  render: () => <ConfirmPopupWrapper />,
};

export const Nested: Story = {
  render: () => <NestedPopupWrapper />,
};

export const MultiButton: Story = {
  render: () => <MultiButtonPopupWrapper />,
};

export const NoFooter: Story = {
  render: () => <NoFooterPopupWrapper />,
};

export const Accordion: Story = {
  render: () => <AccordionPopupWrapper />,
};

export const Draggable: Story = {
  render: () => <DraggablePopupWrapper />,
};
