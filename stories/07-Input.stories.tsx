import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Input from '../src/components/form/Input';
import type { InputProps } from '../src/components/form/Input';

/**
 * Input 컴포넌트
 *
 * 텍스트 입력을 위한 기본 Input 컴포넌트입니다.
 *
 * ## Features
 * - ✅ 다양한 input 타입 지원 (text, email, password, tel, number, search, url)
 * - ✅ 크기 조절 (small, medium, large)
 * - ✅ 전체 너비 옵션
 * - ✅ disabled, readonly, error 상태
 * - ✅ placeholder 지원
 *
 * ## Usage
 * ```tsx
 * import { Input } from '@/components/form';
 *
 * <Input
 *   type="text"
 *   placeholder="이름을 입력하세요"
 *   value={value}
 *   onChange={(e) => setValue(e.target.value)}
 *   fullWidth
 * />
 * ```
 */
const meta = {
  title: 'Form/Input',
  component: Input,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'tel', 'number', 'search', 'url'],
      description: 'Input 타입',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Input 크기',
    },
    disabled: {
      control: 'boolean',
      description: 'disabled 상태',
    },
    readOnly: {
      control: 'boolean',
      description: 'readonly 상태',
    },
    error: {
      control: 'boolean',
      description: 'error 상태',
    },
    fullWidth: {
      control: 'boolean',
      description: '전체 너비 사용',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// ========================================
// Stories
// ========================================

/**
 * 기본 사용 예시
 *
 * 가장 기본적인 Input 사용 예시입니다.
 */
export const Default: Story = {
  args: {
    placeholder: '텍스트를 입력하세요',
    type: 'text',
  },
};

/**
 * 타입별 Input
 *
 * 다양한 input 타입을 지원합니다.
 */
export const Types: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>
          Text
        </label>
        <Input type="text" placeholder="텍스트 입력" fullWidth />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>
          Email
        </label>
        <Input type="email" placeholder="이메일 입력" fullWidth />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>
          Password
        </label>
        <Input type="password" placeholder="비밀번호 입력" fullWidth />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>
          Tel
        </label>
        <Input type="tel" placeholder="전화번호 입력" fullWidth />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>
          Number
        </label>
        <Input type="number" placeholder="숫자 입력" fullWidth />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>
          Search
        </label>
        <Input type="search" placeholder="검색" fullWidth />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>
          URL
        </label>
        <Input type="url" placeholder="URL 입력" fullWidth />
      </div>
    </div>
  ),
};

/**
 * 상태별 Input
 *
 * Normal, Disabled, ReadOnly, Error 상태를 지원합니다.
 */
export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>
          Normal
        </label>
        <Input placeholder="일반 상태" fullWidth />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>
          Disabled
        </label>
        <Input placeholder="비활성 상태" disabled fullWidth />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>
          ReadOnly
        </label>
        <Input value="읽기 전용 값" readOnly fullWidth />
      </div>
    </div>
  ),
};

/**
 * 전체 너비
 *
 * fullWidth prop으로 전체 너비를 사용할 수 있습니다.
 */
export const FullWidth: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>
          기본 너비
        </label>
        <Input placeholder="기본 너비" />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>
          전체 너비
        </label>
        <Input placeholder="전체 너비" fullWidth />
      </div>
    </div>
  ),
};

/**
 * 값 입력
 *
 * value와 onChange를 사용한 제어 컴포넌트입니다.
 
export const WithValue: Story = {
  render: () => {
    const [value, setValue] = React.useState('');
    return (
      <div style={{ width: '300px' }}>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>
          입력한 값: {value || '(없음)'}
        </label>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="텍스트를 입력하세요"
          fullWidth
        />
      </div>
    );
  },
};
 */
/**
 * 폼 예시
 *
 * 실제 폼에서 사용하는 예시입니다.

export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = React.useState({
      name: '',
      email: '',
      phone: '',
      address: '',
    });

    const handleChange = (field: string, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return (
      <div style={{ width: '400px', padding: '20px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
        <h3 style={{ marginTop: 0 }}>고객 정보 입력</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>
              이름 *
            </label>
            <Input
              type="text"
              placeholder="이름을 입력하세요"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              fullWidth
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>
              이메일 *
            </label>
            <Input
              type="email"
              placeholder="example@email.com"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              fullWidth
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>
              전화번호
            </label>
            <Input
              type="tel"
              placeholder="010-1234-5678"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              fullWidth
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>
              주소
            </label>
            <Input
              type="text"
              placeholder="주소를 입력하세요"
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              fullWidth
            />
          </div>
        </div>
      </div>
    );
  },
};
 */
