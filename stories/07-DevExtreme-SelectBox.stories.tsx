import React from 'react';
import SelectBox from 'devextreme-react/select-box';
import DataSource from 'devextreme/data/data_source';

/**
 * DevExtreme SelectBox 컴포넌트
 *
 * - 다양한 데이터 소스 지원
 * - 검색 기능
 * - 그룹핑
 * - 다단계 연결 (Cascading) 지원
 */
export default {
  title: 'DevExtreme/SelectBox',
  component: SelectBox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `DevExtreme SelectBox는 강력한 드롭다운 선택 컴포넌트입니다.

## 기본 사용법

\`\`\`jsx
import SelectBox from 'devextreme-react/select-box';

const options = [
  { id: 1, name: '옵션 1' },
  { id: 2, name: '옵션 2' },
];

<SelectBox
  dataSource={options}
  displayExpr="name"
  valueExpr="id"
  placeholder="선택하세요"
/>
\`\`\`

## 다단계 연결 (Cascading)

상위 SelectBox 선택 시 하위 SelectBox가 자동으로 필터링됩니다.

\`\`\`jsx
// Center 선택
<SelectBox
  dataSource={centers}
  onValueChanged={(e) => {
    // Tenant SelectBox 필터링
    setFilteredTenants(tenants.filter(t => t.centerId === e.value));
  }}
/>

// Tenant 선택 (Center에 따라 필터링됨)
<SelectBox
  dataSource={filteredTenants}
  onValueChanged={(e) => {
    // Group SelectBox 필터링
    setFilteredGroups(groups.filter(g => g.tenantId === e.value));
  }}
/>
\`\`\`
`,
      },
    },
  },
  tags: ['autodocs'],
};

// 기본 SelectBox
export const Basic = {
  render: () => {
    const statusOptions = [
      { value: 'after_call', label: '후처리 대기' },
      { value: 'on_call', label: '통화중' },
      { value: 'break', label: '휴식' },
    ];

    return (
      <SelectBox
        dataSource={statusOptions}
        displayExpr="label"
        valueExpr="value"
        placeholder="상태 선택"
        width={200}
      />
    );
  },
};

// 검색 가능한 SelectBox
export const Searchable = {
  render: () => {
    const countries = [
      { id: 1, name: '대한민국' },
      { id: 2, name: '미국' },
      { id: 3, name: '일본' },
      { id: 4, name: '중국' },
      { id: 5, name: '영국' },
      { id: 6, name: '프랑스' },
      { id: 7, name: '독일' },
    ];

    return (
      <SelectBox
        dataSource={countries}
        displayExpr="name"
        valueExpr="id"
        placeholder="국가 선택"
        searchEnabled={true}
        width={200}
      />
    );
  },
};

// 그룹핑된 SelectBox
export const Grouped = {
  render: () => {
    const employees = [
      { id: 1, name: '김철수', team: '개발팀' },
      { id: 2, name: '이영희', team: '개발팀' },
      { id: 3, name: '박민수', team: '개발팀' },
      { id: 4, name: '정다은', team: '디자인팀' },
      { id: 5, name: '최지훈', team: '디자인팀' },
      { id: 6, name: '강서연', team: '마케팅팀' },
    ];

    const dataSource = new DataSource({
      store: employees,
      group: 'team',
    });

    return (
      <SelectBox
        dataSource={dataSource}
        displayExpr="name"
        valueExpr="id"
        grouped={true}
        placeholder="직원 선택"
        searchEnabled={true}
        width={200}
      />
    );
  },
};

// 다단계 연결 (Center → Tenant → Group)
export const CascadingSelectBoxes = {
  render: () => {
    const [selectedCenter, setSelectedCenter] = React.useState(null);
    const [selectedTenant, setSelectedTenant] = React.useState(null);
    const [selectedGroup, setSelectedGroup] = React.useState(null);

    // 샘플 데이터
    const centers = [
      { id: 1, name: 'NEXUS' },
      { id: 2, name: 'qat' },
    ];

    const allTenants = [
      { id: 111002, name: '내선대분류', centerId: 1 },
      { id: 111003, name: '콜내선', centerId: 1 },
      { id: 111004, name: '공내선', centerId: 2 },
    ];

    const allGroups = [
      { id: 1, name: '인바운드', tenantId: 111002 },
      { id: 2, name: '아웃바운드', tenantId: 111002 },
      { id: 3, name: '콜그룹1', tenantId: 111003 },
      { id: 4, name: '공그룹1', tenantId: 111004 },
    ];

    // 필터링된 데이터
    const filteredTenants = selectedCenter
      ? allTenants.filter(t => t.centerId === selectedCenter)
      : [];

    const filteredGroups = selectedTenant
      ? allGroups.filter(g => g.tenantId === selectedTenant)
      : [];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: '300px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', color: '#333' }}>
            종류
          </label>
          <SelectBox
            dataSource={centers}
            displayExpr={(item) => item ? `[${item.id}] ${item.name}` : ''}
            valueExpr="id"
            placeholder="분대별"
            value={selectedCenter}
            onValueChanged={(e) => {
              setSelectedCenter(e.value);
              setSelectedTenant(null);
              setSelectedGroup(null);
            }}
            width="100%"
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', color: '#333' }}>
            내선
          </label>
          <SelectBox
            dataSource={filteredTenants}
            displayExpr={(item) => item ? `${item.id}` : ''}
            valueExpr="id"
            placeholder="내선"
            value={selectedTenant}
            onValueChanged={(e) => {
              setSelectedTenant(e.value);
              setSelectedGroup(null);
            }}
            disabled={!selectedCenter}
            width="100%"
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', color: '#333' }}>
            자료 범위
          </label>
          <SelectBox
            dataSource={filteredGroups}
            displayExpr={(item) => item ? `${item.name}` : ''}
            valueExpr="id"
            placeholder="15분대별"
            value={selectedGroup}
            onValueChanged={(e) => {
              setSelectedGroup(e.value);
            }}
            disabled={!selectedTenant}
            width="100%"
          />
        </div>

        <div style={{
          marginTop: '16px',
          padding: '12px',
          backgroundColor: '#f5f5f5',
          borderRadius: '4px',
          fontSize: '13px'
        }}>
          <div><strong>선택된 값:</strong></div>
          <div>종류: {selectedCenter || '미선택'}</div>
          <div>내선: {selectedTenant || '미선택'}</div>
          <div>자료 범위: {selectedGroup || '미선택'}</div>
        </div>
      </div>
    );
  },
};


// 비활성화 상태
export const Disabled = {
  render: () => {
    return (
      <SelectBox
        dataSource={[
          { value: 'option1', label: '옵션 1' },
          { value: 'option2', label: '옵션 2' },
        ]}
        displayExpr="label"
        valueExpr="value"
        value="option1"
        disabled={true}
        width={200}
      />
    );
  },
};
