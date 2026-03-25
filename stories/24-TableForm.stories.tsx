import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { CheckBox } from 'devextreme-react/check-box';
import { SelectBox } from 'devextreme-react/select-box';
import { NumberBox } from 'devextreme-react/number-box';
import Input from '../src/components/form/Input';
import '../src/styles/TableForm.css';

const meta: Meta = {
  title: 'Nexus Custom/Table Form',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

// Example 1: 읽기 전용 정보 표시
export const ReadOnlyInfo: Story = {
  render: () => {
    const userData = {
      id: 'MASTER',
      name: 'MANA',
      tenantId: 'NONE',
      level: '시스템매니저',
    };

    return (
      <div>
        <h3 style={{ marginBottom: '16px' }}>읽기 전용 정보 표시</h3>
        <p style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>
          사용자 프로필 등 정보만 표시할 때 사용합니다.
        </p>

        <div className="table-form">
          <div className="table-form__section">
            <div className="table-form__row">
              <div className="table-form__label table-form__label--md">아이디</div>
              <div className="table-form__content">
                <span className="table-form__text">{userData.id}</span>
              </div>
            </div>
          </div>

          <div className="table-form__section">
            <div className="table-form__row">
              <div className="table-form__label table-form__label--md">이름</div>
              <div className="table-form__content">
                <span className="table-form__text">{userData.name}</span>
              </div>
            </div>
          </div>

          <div className="table-form__section">
            <div className="table-form__row">
              <div className="table-form__label table-form__label--md">테넌트 ID</div>
              <div className="table-form__content">
                <span className="table-form__text">{userData.tenantId}</span>
              </div>
            </div>
          </div>

          <div className="table-form__section">
            <div className="table-form__row">
              <div className="table-form__label table-form__label--md">레벨</div>
              <div className="table-form__content">
                <span className="table-form__text">{userData.level}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

// Example 2: 편집 가능한 폼
export const EditableForm: Story = {
  render: () => {
    const [isEditingName, setIsEditingName] = useState(false);
    const [editableName, setEditableName] = useState('관리자');
    const [email, setEmail] = useState('admin@example.com');

    return (
      <div>
        <h3 style={{ marginBottom: '16px' }}>편집 가능한 입력 폼</h3>
        <p style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>
          Input 컴포넌트와 수정 버튼을 함께 사용합니다.
        </p>

        <div className="table-form">
          <div className="table-form__section">
            <div className="table-form__row">
              <div className="table-form__label table-form__label--mlg">이름</div>
              <div className="table-form__content">
                <div className="table-form__inline" style={{ flex: 1 }}>
                  <Input
                    type="text"
                    value={editableName}
                    readOnly={!isEditingName}
                    onChange={(e) => setEditableName(e.target.value)}
                    maxLength={64}
                    fullWidth
                  />
                  {!isEditingName && (
                    <button
                      type="button"
                      onClick={() => setIsEditingName(true)}
                      className="form-edit-btn"
                      aria-label="Edit"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="table-form__section">
            <div className="table-form__row">
              <div className="table-form__label table-form__label--mlg">이메일</div>
              <div className="table-form__content">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

// Example 3: 체크박스 그룹
export const CheckboxGroup: Story = {
  render: () => {
    const [isPopupUse, setIsPopupUse] = useState(true);
    const [isAlarmUse, setIsAlarmUse] = useState(false);

    return (
      <div>
        <h3 style={{ marginBottom: '16px' }}>체크박스 그룹</h3>
        <p style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>
          여러 체크박스를 가로로 배치합니다.
        </p>

        <div className="table-form">
          <div className="table-form__section">
            <div className="table-form__row">
              <div className="table-form__label table-form__label--md">기능 사용</div>
              <div className="table-form__content">
                <div className="table-form__checkbox-group">
                  <CheckBox
                    value={isPopupUse}
                    onValueChanged={(e) => setIsPopupUse(e.value)}
                    text="팝업 기능 사용"
                  />
                  <CheckBox
                    value={isAlarmUse}
                    onValueChanged={(e) => setIsAlarmUse(e.value)}
                    text="알림음 기능 사용"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

// Example 4: 복잡한 인풋 그룹
export const ComplexInputGroup: Story = {
  render: () => {
    const [timeMin, setTimeMin] = useState(1);
    const [timeSec, setTimeSec] = useState(30);
    const [callCount, setCallCount] = useState(30);

    const timeSecOptions = [
      { value: 0, name: '0' },
      { value: 10, name: '10' },
      { value: 20, name: '20' },
      { value: 30, name: '30' },
      { value: 40, name: '40' },
      { value: 50, name: '50' },
    ];

    return (
      <div>
        <h3 style={{ marginBottom: '16px' }}>복잡한 인풋 그룹</h3>
        <p style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>
          여러 입력 필드를 조합하여 사용합니다.
        </p>

        <div className="table-form">
          <div className="table-form__section">
            <div className="table-form__row">
              <div className="table-form__label table-form__label--mlg">대기 시간 설정</div>
              <div className="table-form__content">
                <div className="table-form__input-group">
                  <NumberBox
                    value={timeMin}
                    onValueChanged={(e) => setTimeMin(e.value || 0)}
                    width={60}
                    min={0}
                    showSpinButtons={true}
                  />
                  <span className="table-form__text">분</span>
                  <SelectBox
                    dataSource={timeSecOptions}
                    displayExpr="name"
                    valueExpr="value"
                    value={timeSec}
                    onValueChanged={(e) => setTimeSec(e.value)}
                    width={80}
                  />
                  <span className="table-form__text">초</span>
                </div>
              </div>
            </div>
          </div>

          <div className="table-form__section">
            <div className="table-form__row">
              <div className="table-form__label table-form__label--mlg">대기호 콜 수</div>
              <div className="table-form__content">
                <div className="table-form__input-group">
                  <NumberBox
                    value={callCount}
                    onValueChanged={(e) => setCallCount(e.value || 0)}
                    width={80}
                    min={0}
                    showSpinButtons={true}
                  />
                  <span className="table-form__text">콜 이상시 알람</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

// Example 5: 수직 그룹 레이아웃
export const VerticalGroupLayout: Story = {
  render: () => {
    const timeSecOptions = [
      { value: 0, name: '0' },
      { value: 10, name: '10' },
      { value: 20, name: '20' },
      { value: 30, name: '30' },
      { value: 40, name: '40' },
      { value: 50, name: '50' },
    ];

    return (
      <div>
        <h3 style={{ marginBottom: '16px' }}>수직 그룹 레이아웃</h3>
        <p style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>
          여러 옵션을 세로로 배치할 때 사용합니다.
        </p>

        <div className="table-form">
          <div className="table-form__section">
            <div className="table-form__row">
              <div className="table-form__label table-form__label--mlg">알람 상세 설정</div>
              <div className="table-form__content">
                <div className="table-form__group">
                  <div className="table-form__inline">
                    <CheckBox value={true} text="대기 시간이" />
                    <div className="table-form__input-group">
                      <NumberBox value={1} width={60} min={0} />
                      <span className="table-form__text">분</span>
                      <SelectBox dataSource={timeSecOptions} value={30} width={80} />
                      <span className="table-form__text">초과시 알람 울림</span>
                    </div>
                  </div>

                  <div className="table-form__inline">
                    <CheckBox value={false} text="대기호가" />
                    <div className="table-form__input-group">
                      <NumberBox value={30} width={80} min={0} />
                      <span className="table-form__text">콜 이상시 알람 울림</span>
                    </div>
                  </div>

                  <div className="table-form__inline">
                    <CheckBox
                      value={false}
                      text="대기 시간 조건과 대기호 조건 모두 만족시 알람 울림"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

// Example 6: Label 너비 옵션
export const LabelWidthOptions: Story = {
  render: () => (
    <div>
      <h3 style={{ marginBottom: '16px' }}>Label 너비 옵션</h3>
      <p style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>
        레이블의 너비를 조정할 수 있습니다.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div className="table-form">
          <div className="table-form__section">
            <div className="table-form__row">
              <div className="table-form__label table-form__label--sm">Small (100px)</div>
              <div className="table-form__content">
                <span className="table-form__text">table-form__label--sm</span>
              </div>
            </div>
          </div>
        </div>

        <div className="table-form">
          <div className="table-form__section">
            <div className="table-form__row">
              <div className="table-form__label table-form__label--md">Medium (140px)</div>
              <div className="table-form__content">
                <span className="table-form__text">table-form__label--md (기본값)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="table-form">
          <div className="table-form__section">
            <div className="table-form__row">
              <div className="table-form__label table-form__label--mlg">
                Medium-Large (160px)
              </div>
              <div className="table-form__content">
                <span className="table-form__text">table-form__label--mlg</span>
              </div>
            </div>
          </div>
        </div>

        <div className="table-form">
          <div className="table-form__section">
            <div className="table-form__row">
              <div className="table-form__label table-form__label--lg">Large (180px)</div>
              <div className="table-form__content">
                <span className="table-form__text">table-form__label--lg</span>
              </div>
            </div>
          </div>
        </div>

        <div className="table-form">
          <div className="table-form__section">
            <div className="table-form__row">
              <div className="table-form__label table-form__label--xl">Extra Large (220px)</div>
              <div className="table-form__content">
                <span className="table-form__text">table-form__label--xl</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Example 7: 전체 폼 예시
export const CompleteFormExample: Story = {
  render: () => {
    const [name, setName] = useState('홍길동');
    const [email, setEmail] = useState('hong@example.com');
    const [useNotification, setUseNotification] = useState(true);
    const [useEmail, setUseEmail] = useState(false);
    const [interval, setInterval] = useState(10);

    return (
      <div>
        <h3 style={{ marginBottom: '16px' }}>전체 폼 예시</h3>
        <p style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>
          다양한 입력 요소를 조합한 완전한 폼입니다.
        </p>

        <div className="table-form">
          <div className="table-form__section">
            <div className="table-form__row">
              <div className="table-form__label table-form__label--md">사용자 정보</div>
              <div className="table-form__content">
                <span className="table-form__text">기본 정보</span>
              </div>
            </div>
          </div>

          <div className="table-form__section">
            <div className="table-form__row">
              <div className="table-form__label table-form__label--md">이름</div>
              <div className="table-form__content">
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                />
              </div>
            </div>
          </div>

          <div className="table-form__section">
            <div className="table-form__row">
              <div className="table-form__label table-form__label--md">이메일</div>
              <div className="table-form__content">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                />
              </div>
            </div>
          </div>

          <div className="table-form__section">
            <div className="table-form__row">
              <div className="table-form__label table-form__label--md">알림 설정</div>
              <div className="table-form__content">
                <div className="table-form__checkbox-group">
                  <CheckBox
                    value={useNotification}
                    onValueChanged={(e) => setUseNotification(e.value)}
                    text="푸시 알림"
                  />
                  <CheckBox
                    value={useEmail}
                    onValueChanged={(e) => setUseEmail(e.value)}
                    text="이메일 알림"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="table-form__section">
            <div className="table-form__row">
              <div className="table-form__label table-form__label--md">알림 간격</div>
              <div className="table-form__content">
                <div className="table-form__input-group">
                  <NumberBox
                    value={interval}
                    onValueChanged={(e) => setInterval(e.value || 0)}
                    width={80}
                    min={1}
                    max={60}
                    showSpinButtons={true}
                  />
                  <span className="table-form__text">분</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};
