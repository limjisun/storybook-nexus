import React, { useState, useRef, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import TagBox, { TagBoxTypes } from 'devextreme-react/tag-box';
import Tooltip from 'devextreme-react/tooltip';
import DataSource from 'devextreme/data/data_source';

/**
 * DevExtreme TagBox 컴포넌트
 *
 * - 다중 선택 지원
 * - 태그 형식으로 표시
 * - Multi-tag 기능 (많은 항목 선택 시 개수로 표시)
 * - 검색 기능
 */
const meta = {
  title: 'DevExtreme/TagBox',
  component: TagBox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `DevExtreme TagBox는 다중 선택을 지원하는 태그 입력 컴포넌트입니다.

## 기본 사용법

\`\`\`tsx
import TagBox from 'devextreme-react/tag-box';

const products = [
  { id: 1, name: '제품 A' },
  { id: 2, name: '제품 B' },
  { id: 3, name: '제품 C' },
];

<TagBox
  dataSource={products}
  displayExpr="name"
  valueExpr="id"
  placeholder="제품 선택"
/>
\`\`\`

## Multi-tag 기능

많은 항목을 선택했을 때 UI를 깔끔하게 유지하기 위해 Multi-tag 기능을 사용할 수 있습니다.

### maxDisplayedTags
표시할 태그의 최대 개수를 제한합니다. 이 한계를 초과하면 "3 more" 같은 형태로 표시됩니다.

\`\`\`tsx
<TagBox
  dataSource={products}
  maxDisplayedTags={3}
/>
\`\`\`

### showMultiTagOnly
모든 선택된 항목을 개별 태그 대신 하나의 멀티태그로만 표시합니다.

\`\`\`tsx
<TagBox
  dataSource={products}
  showMultiTagOnly={true}
/>
\`\`\`

## 주요 Props

- \`maxDisplayedTags\`: 표시할 태그의 최대 개수
- \`showMultiTagOnly\`: 멀티태그만 표시 여부
- \`searchEnabled\`: 검색 기능 활성화
- \`selectAllMode\`: 전체 선택 모드 ('page' | 'allPages')
- \`showSelectionControls\`: 선택 컨트롤(체크박스) 표시
`,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TagBox>;

export default meta;
type Story = StoryObj<typeof meta>;


// 전체 선택 기능 (그룹화 + 툴팁)
export const WithSelectAll: Story = {
  render: () => {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [tooltipVisible, setTooltipVisible] = useState<boolean>(false);
    const tagBoxId = 'employee_tagbox';

    const employees = [
      { center_id: 1, tenant_id: 1, id: 1, name: '김철수', tenant_name: 'A회사' },
      { center_id: 1, tenant_id: 1, id: 2, name: '이영희', tenant_name: 'A회사' },
      { center_id: 1, tenant_id: 1, id: 3, name: '박민수', tenant_name: 'A회사' },
      { center_id: 1, tenant_id: 2, id: 4, name: '정다은', tenant_name: 'B회사' },
      { center_id: 1, tenant_id: 2, id: 5, name: '최지훈', tenant_name: 'B회사' },
      { center_id: 1, tenant_id: 3, id: 6, name: '강서연', tenant_name: 'C회사' },
      { center_id: 1, tenant_id: 3, id: 7, name: '윤상호', tenant_name: 'C회사' },
      { center_id: 1, tenant_id: 3, id: 8, name: '한지민', tenant_name: 'C회사' },
      { center_id: 1, tenant_id: 4, id: 9, name: '조민지', tenant_name: 'D회사' },
      { center_id: 1, tenant_id: 4, id: 10, name: '홍길동', tenant_name: 'D회사' },
    ];

    // DataSource로 그룹화
    const dataSource = new DataSource({
      store: employees,
      group: 'tenant_name',
    });

    // 툴팁 내용 생성
    const getTooltipContent = () => {
      if (selectedItems.length === 0) return '';

      return selectedItems.map((value) => {
        const [center_id, tenant_id, id] = value.split(',');
        const emp = employees.find(e =>
          e.center_id === parseInt(center_id) &&
          e.tenant_id === parseInt(tenant_id) &&
          e.id === parseInt(id)
        );
        return emp ? `[${emp.id}] ${emp.name}` : '';
      }).filter(Boolean).join('<br>');
    };

    const handleValueChanged = (e: TagBoxTypes.ValueChangedEvent) => {
      setSelectedItems(e.value);
    };

    return (
      <div style={{ minWidth: '400px' }}>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', color: '#333' }}>
          직원 선택 (회사별 그룹화 + 툴팁)
        </label>
        <div>
          <TagBox
            id={tagBoxId}
            dataSource={dataSource}
            displayExpr={(item: any) => {
              if (item) return `[${item.id}] ${item.name}`;
            }}
            valueExpr={(item: any) => {
              if (item) return `${item.center_id},${item.tenant_id},${item.id}`;
            }}
            placeholder="직원을 선택하세요"
            value={selectedItems}
            onValueChanged={handleValueChanged}
            grouped={true}
            showSelectionControls={true}
            selectAllMode="allPages"
            maxDisplayedTags={2}
            searchEnabled={true}
            width="100%"
            dropDownOptions={{
              minWidth: 400,
            }}
            groupTemplate={(data: any) => {
              return `[${data.items[0].tenant_id}] ${data.key}`;
            }}
            onMultiTagPreparing={(args: any) => {
              const selectedItemsLength = args.selectedItems.length;
              if (selectedItemsLength < 2) {
                args.cancel = true;
              } else {
                args.text = `${selectedItemsLength} 선택됨`;
              }
            }}
          />
          <Tooltip
            target={`#${tagBoxId}`}
            showEvent={selectedItems.length > 0 ? 'mouseenter' : 'none'}
            hideEvent={selectedItems.length > 0 ? 'mouseleave' : 'none'}
            hideOnOutsideClick={false}
            position="bottom"
          >
            <div
              style={{ textAlign: 'left' }}
              dangerouslySetInnerHTML={{ __html: getTooltipContent() }}
            />
          </Tooltip>
        </div>
        <div style={{
          marginTop: '16px',
          padding: '12px',
          backgroundColor: '#f5f5f5',
          borderRadius: '4px',
          fontSize: '13px',
          color: '#666'
        }}>
          <div><strong>선택된 직원:</strong> {selectedItems.length}명</div>
          {selectedItems.length > 0 && (
            <div style={{ marginTop: '8px' }}>
              {selectedItems.map((value, index) => {
                const [center_id, tenant_id, id] = value.split(',');
                const emp = employees.find(e =>
                  e.center_id === parseInt(center_id) &&
                  e.tenant_id === parseInt(tenant_id) &&
                  e.id === parseInt(id)
                );
                return emp ? `${emp.name} (${emp.tenant_name})` : '';
              }).filter(Boolean).join(', ')}
            </div>
          )}
        </div>
        <div style={{ marginTop: '8px', fontSize: '12px', color: '#999' }}>
          💡 2개 이상 선택하면 "N 선택됨" 형태로 표시되며, TagBox에 마우스를 올리면 툴팁으로 전체 목록을 볼 수 있습니다.
        </div>
      </div>
    );
  },
};

// 계층 구조 연결 선택 (센터 > 테넌트 > 그룹 > 팀 > 상담사 > 상담채널)
export const HierarchicalChainedSelection: Story = {
  render: () => {
    const [selectedCenters, setSelectedCenters] = useState<number[]>([]);
    const [selectedTenants, setSelectedTenants] = useState<string[]>([]);
    const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
    const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
    const [selectedAgents, setSelectedAgents] = useState<number[]>([]);
    const [selectedChannels, setSelectedChannels] = useState<number[]>([]);

    // 센터 데이터 (실제 API 응답 형식)
    const centers = [
      { id: 1, name: 'NEXUS', rid: 1, db_kind: 8, ip: '127.0.0.1' }
    ];

    // 테넌트 데이터 (실제 API 응답 형식) - center_id로 그룹화됨
    const tenants = [
      { id: 1, center_id: 1, center_name: 'NEXUS', cid: '1,1', alias: 'nexus', name: 'DEFAULT', hostname: 'nexuscommunity.net' },
      { id: 11, center_id: 1, center_name: 'NEXUS', cid: '1,11', alias: 'qat', name: 'qat', hostname: 'nexuscommunity.net' },
      { id: 12, center_id: 1, center_name: 'NEXUS', cid: '1,12', alias: 'testttt', name: 'test', hostname: 'asdff' },
      { id: 15, center_id: 1, center_name: 'NEXUS', cid: '1,15', alias: 'testlab', name: 'testlab', hostname: null },
      { id: 16, center_id: 1, center_name: 'NEXUS', cid: '1,16', alias: 'sixteen', name: '16test', hostname: null }
    ];

    // 그룹 데이터 - tenant_id로 그룹화됨
    const groups = [
      { id: 111, center_id: 1, tenant_id: 11, tenant_name: 'qat', tid: '1,11,111', name: 'QA그룹' },
      { id: 1201, center_id: 1, tenant_id: 12, tenant_name: 'test', tid: '1,12,1201', name: '1201' },
      { id: 1501, center_id: 1, tenant_id: 15, tenant_name: 'testlab', tid: '1,15,1501', name: 'Lab그룹' },
    ];

    // 파트 데이터 - upper_id(group_id)로 그룹화됨
    const parts = [
      { id: 1, center_id: 1, tenant_id: 11, upper_id: 111, group_name: 'QA그룹', tgid: '1,11,111,1', name: '상담파트' },
      { id: 2, center_id: 1, tenant_id: 11, upper_id: 111, group_name: 'QA그룹', tgid: '1,11,111,2', name: '기술파트' },
      { id: 1, center_id: 1, tenant_id: 12, upper_id: 1201, group_name: '1201', tgid: '1,12,1201,1', name: '영업파트' },
      { id: 2, center_id: 1, tenant_id: 12, upper_id: 1201, group_name: '1201', tgid: '1,12,1201,2', name: '고객지원파트' },
    ];

    // 전체 계층 데이터 (그룹 이하는 샘플)
    const allData = [
      // qat 테넌트 - QA그룹 - call팀
      { center_id: 1, tenant_cid: '1,11', tenant_id: 11, tenant_name: 'qat', group_id: 111, group_name: 'QA그룹', team_id: 1111, team_name: 'call' },
      // qat 테넌트 - QA그룹 - chat팀
      { center_id: 1, tenant_cid: '1,11', tenant_id: 11, tenant_name: 'qat', group_id: 111, group_name: 'QA그룹', team_id: 1112, team_name: 'chat' },
      // test 테넌트 - 1201그룹 - 영업팀 - 김상담 - 전화
      { center_id: 1, tenant_cid: '1,12', tenant_id: 12, tenant_name: 'test', group_id: 1201, group_name: '1201', team_id: 12011, team_name: '영업팀', agent_id: 120111, agent_name: '김상담', channel_id: 1201111, channel_name: '전화' },
      // test 테넌트 - 1201그룹 - 영업팀 - 김상담 - 채팅
      { center_id: 1, tenant_cid: '1,12', tenant_id: 12, tenant_name: 'test', group_id: 1201, group_name: '1201', team_id: 12011, team_name: '영업팀', agent_id: 120111, agent_name: '김상담', channel_id: 1201112, channel_name: '채팅' },
      // test 테넌트 - 1201그룹 - 영업팀 - 이상담
      { center_id: 1, tenant_cid: '1,12', tenant_id: 12, tenant_name: 'test', group_id: 1201, group_name: '1201', team_id: 12011, team_name: '영업팀', agent_id: 120112, agent_name: '이상담' },
      // test 테넌트 - 1201그룹 - 고객지원팀 - 박상담 - 이메일
      { center_id: 1, tenant_cid: '1,12', tenant_id: 12, tenant_name: 'test', group_id: 1201, group_name: '1201', team_id: 12012, team_name: '고객지원팀', agent_id: 120121, agent_name: '박상담', channel_id: 1201211, channel_name: '이메일' },
      // testlab 테넌트 - Lab그룹 - 테스트팀
      { center_id: 1, tenant_cid: '1,15', tenant_id: 15, tenant_name: 'testlab', group_id: 1501, group_name: 'Lab그룹', team_id: 15011, team_name: '테스트팀' },
    ];

    // 선택된 센터에 따른 테넌트 필터링
    const filteredTenants = selectedCenters.length > 0
      ? tenants.filter(t => selectedCenters.includes(t.center_id))
      : [];

    // 선택된 테넌트에 따른 그룹 필터링 (실제 groups 데이터 사용)
    const filteredGroups = selectedTenants.length > 0
      ? (() => {
          const tenantIds = selectedTenants.map(cid => parseInt(cid.split(',')[1]));
          return groups.filter(g => tenantIds.includes(g.tenant_id));
        })()
      : [];

    // 선택된 그룹에 따른 팀 필터링 (실제 parts 데이터 사용)
    const filteredTeams = selectedGroups.length > 0
      ? (() => {
          const groupIds = selectedGroups.map(tid => parseInt(tid.split(',')[2]));
          return parts.filter(p => groupIds.includes(p.upper_id));
        })()
      : [];

    // 선택된 팀에 따른 상담사 필터링
    const filteredAgents = selectedTeams.length > 0
      ? Array.from(new Set(
          allData
            .filter(d =>
              selectedCenters.includes(d.center_id) &&
              selectedTenants.includes(d.tenant_cid) &&
              selectedGroups.includes(d.group_id) &&
              d.team_id && selectedTeams.includes(d.team_id) &&
              d.agent_id
            )
            .map(d => JSON.stringify({ id: d.agent_id, name: d.agent_name }))
        )).map(s => JSON.parse(s))
      : [];

    // 선택된 상담사에 따른 채널 필터링
    const filteredChannels = selectedAgents.length > 0
      ? Array.from(new Set(
          allData
            .filter(d =>
              selectedCenters.includes(d.center_id) &&
              selectedTenants.includes(d.tenant_cid) &&
              selectedGroups.includes(d.group_id) &&
              d.team_id && selectedTeams.includes(d.team_id) &&
              d.agent_id && selectedAgents.includes(d.agent_id) &&
              d.channel_id
            )
            .map(d => JSON.stringify({ id: d.channel_id, name: d.channel_name }))
        )).map(s => JSON.parse(s))
      : [];

    // 선택 초기화 함수
    const handleCenterChange = (value: number[]) => {
      setSelectedCenters(value);
      setSelectedTenants([]);
      setSelectedGroups([]);
      setSelectedTeams([]);
      setSelectedAgents([]);
      setSelectedChannels([]);
    };

    const handleTenantChange = (value: string[]) => {
      setSelectedTenants(value);
      setSelectedGroups([]);
      setSelectedTeams([]);
      setSelectedAgents([]);
      setSelectedChannels([]);
    };

    const handleGroupChange = (value: string[]) => {
      setSelectedGroups(value);
      setSelectedTeams([]);
      setSelectedAgents([]);
      setSelectedChannels([]);
    };

    const handleTeamChange = (value: string[]) => {
      setSelectedTeams(value);
      setSelectedAgents([]);
      setSelectedChannels([]);
    };

    const handleAgentChange = (value: number[]) => {
      setSelectedAgents(value);
      setSelectedChannels([]);
    };

    return (
      <div style={{ width: '100%' }}>
        <h3 style={{ marginBottom: '16px' }}>계층형 연결 선택</h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
          {/* 센터 선택 */}
          <div style={{ minWidth: '150px', flex: 1 }}>
            <TagBox
              id="center_tagbox"
              dataSource={centers}
              displayExpr="name"
              valueExpr="id"
              placeholder="센터 선택"
              value={selectedCenters}
              onValueChanged={(e) => handleCenterChange(e.value)}
              showSelectionControls={true}
              maxDisplayedTags={1}
              searchEnabled={true}
              onMultiTagPreparing={(args: any) => {
                if (args.selectedItems.length < 2) {
                  args.cancel = true;
                } else {
                  args.text = `${args.selectedItems.length} 선택`;
                }
              }}
            />
            <Tooltip
              target="#center_tagbox"
              showEvent={selectedCenters.length > 0 ? 'mouseenter' : 'none'}
              hideEvent={selectedCenters.length > 0 ? 'mouseleave' : 'none'}
              hideOnOutsideClick={false}
              position="bottom"
            >
              <div
                style={{ textAlign: 'left' }}
                dangerouslySetInnerHTML={{
                  __html: selectedCenters.map(id => centers.find(c => c.id === id)?.name).join('<br>')
                }}
              />
            </Tooltip>
          </div>

          {/* 테넌트 선택 */}
          <div style={{ minWidth: '150px', flex: 1 }}>
            <TagBox
              id="tenant_tagbox"
              dataSource={filteredTenants}
              displayExpr="name"
              valueExpr="cid"
              placeholder="테넌트 선택"
              value={selectedTenants}
              onValueChanged={(e) => handleTenantChange(e.value)}
              showSelectionControls={true}
              maxDisplayedTags={1}
              searchEnabled={true}
              disabled={selectedCenters.length === 0}
              onMultiTagPreparing={(args: any) => {
                if (args.selectedItems.length < 2) {
                  args.cancel = true;
                } else {
                  args.text = `${args.selectedItems.length} 선택`;
                }
              }}
            />
            <Tooltip
              target="#tenant_tagbox"
              showEvent={selectedTenants.length > 0 ? 'mouseenter' : 'none'}
              hideEvent={selectedTenants.length > 0 ? 'mouseleave' : 'none'}
              hideOnOutsideClick={false}
              position="bottom"
            >
              <div
                style={{ textAlign: 'left' }}
                dangerouslySetInnerHTML={{
                  __html: selectedTenants.map(cid => filteredTenants.find(t => t.cid === cid)?.name).join('<br>')
                }}
              />
            </Tooltip>
          </div>

          {/* 그룹 선택 */}
          <div style={{ minWidth: '150px', flex: 1 }}>
            <TagBox
              id="group_tagbox"
              dataSource={filteredGroups}
              displayExpr="name"
              valueExpr="tid"
              placeholder="그룹 선택"
              value={selectedGroups}
              onValueChanged={(e) => handleGroupChange(e.value)}
              showSelectionControls={true}
              maxDisplayedTags={1}
              searchEnabled={true}
              disabled={selectedTenants.length === 0}
              onMultiTagPreparing={(args: any) => {
                if (args.selectedItems.length < 2) {
                  args.cancel = true;
                } else {
                  args.text = `${args.selectedItems.length} 선택`;
                }
              }}
            />
            <Tooltip
              target="#group_tagbox"
              showEvent={selectedGroups.length > 0 ? 'mouseenter' : 'none'}
              hideEvent={selectedGroups.length > 0 ? 'mouseleave' : 'none'}
              hideOnOutsideClick={false}
              position="bottom"
            >
              <div
                style={{ textAlign: 'left' }}
                dangerouslySetInnerHTML={{
                  __html: selectedGroups.map(tid => filteredGroups.find(g => g.tid === tid)?.name).join('<br>')
                }}
              />
            </Tooltip>
          </div>

          {/* 팀 선택 */}
          <div style={{ minWidth: '150px', flex: 1 }}>
            <TagBox
              id="team_tagbox"
              dataSource={filteredTeams}
              displayExpr="name"
              valueExpr="tgid"
              placeholder="팀 선택"
              value={selectedTeams}
              onValueChanged={(e) => handleTeamChange(e.value)}
              showSelectionControls={true}
              maxDisplayedTags={1}
              searchEnabled={true}
              disabled={selectedGroups.length === 0}
              onMultiTagPreparing={(args: any) => {
                if (args.selectedItems.length < 2) {
                  args.cancel = true;
                } else {
                  args.text = `${args.selectedItems.length} 선택`;
                }
              }}
            />
            <Tooltip
              target="#team_tagbox"
              showEvent={selectedTeams.length > 0 ? 'mouseenter' : 'none'}
              hideEvent={selectedTeams.length > 0 ? 'mouseleave' : 'none'}
              hideOnOutsideClick={false}
              position="bottom"
            >
              <div
                style={{ textAlign: 'left' }}
                dangerouslySetInnerHTML={{
                  __html: selectedTeams.map(tgid => filteredTeams.find(t => t.tgid === tgid)?.name).join('<br>')
                }}
              />
            </Tooltip>
          </div>

          {/* 상담사 선택 */}
          <div style={{ minWidth: '150px', flex: 1 }}>
            <TagBox
              id="agent_tagbox"
              dataSource={filteredAgents}
              displayExpr="name"
              valueExpr="id"
              placeholder="상담사 선택"
              value={selectedAgents}
              onValueChanged={(e) => handleAgentChange(e.value)}
              showSelectionControls={true}
              maxDisplayedTags={1}
              searchEnabled={true}
              disabled={selectedTeams.length === 0}
              onMultiTagPreparing={(args: any) => {
                if (args.selectedItems.length < 2) {
                  args.cancel = true;
                } else {
                  args.text = `${args.selectedItems.length} 선택`;
                }
              }}
            />
            <Tooltip
              target="#agent_tagbox"
              showEvent={selectedAgents.length > 0 ? 'mouseenter' : 'none'}
              hideEvent={selectedAgents.length > 0 ? 'mouseleave' : 'none'}
              hideOnOutsideClick={false}
              position="bottom"
            >
              <div
                style={{ textAlign: 'left' }}
                dangerouslySetInnerHTML={{
                  __html: selectedAgents.map(id => filteredAgents.find(a => a.id === id)?.name).join('<br>')
                }}
              />
            </Tooltip>
          </div>

          {/* 상담채널 선택 */}
          <div style={{ minWidth: '150px', flex: 1 }}>
            <TagBox
              id="channel_tagbox"
              dataSource={filteredChannels}
              displayExpr="name"
              valueExpr="id"
              placeholder="채널 선택"
              value={selectedChannels}
              onValueChanged={(e) => setSelectedChannels(e.value)}
              showSelectionControls={true}
              maxDisplayedTags={1}
              searchEnabled={true}
              disabled={selectedAgents.length === 0}
              onMultiTagPreparing={(args: any) => {
                if (args.selectedItems.length < 2) {
                  args.cancel = true;
                } else {
                  args.text = `${args.selectedItems.length} 선택`;
                }
              }}
            />
            <Tooltip
              target="#channel_tagbox"
              showEvent={selectedChannels.length > 0 ? 'mouseenter' : 'none'}
              hideEvent={selectedChannels.length > 0 ? 'mouseleave' : 'none'}
              hideOnOutsideClick={false}
              position="bottom"
            >
              <div
                style={{ textAlign: 'left' }}
                dangerouslySetInnerHTML={{
                  __html: selectedChannels.map(id => filteredChannels.find(c => c.id === id)?.name).join('<br>')
                }}
              />
            </Tooltip>
          </div>
        </div>

        {/* 선택 결과 표시 */}
        <div style={{
          padding: '12px',
          backgroundColor: '#f5f5f5',
          borderRadius: '4px',
          fontSize: '13px',
        }}>
          <div><strong>선택 결과:</strong></div>
          <div style={{ marginTop: '8px', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '4px 12px' }}>
            <span style={{ color: '#666' }}>센터:</span>
            <span>{selectedCenters.map(id => centers.find(c => c.id === id)?.name).join(', ') || '-'}</span>

            <span style={{ color: '#666' }}>테넌트:</span>
            <span>{selectedTenants.map(cid => filteredTenants.find(t => t.cid === cid)?.name).join(', ') || '-'}</span>

            <span style={{ color: '#666' }}>그룹:</span>
            <span>{selectedGroups.map(tid => filteredGroups.find(g => g.tid === tid)?.name).join(', ') || '-'}</span>

            <span style={{ color: '#666' }}>팀:</span>
            <span>{selectedTeams.map(tgid => filteredTeams.find(t => t.tgid === tgid)?.name).join(', ') || '-'}</span>

            <span style={{ color: '#666' }}>상담사:</span>
            <span>{selectedAgents.map(id => filteredAgents.find(a => a.id === id)?.name).join(', ') || '-'}</span>

            <span style={{ color: '#666' }}>상담채널:</span>
            <span>{selectedChannels.map(id => filteredChannels.find(c => c.id === id)?.name).join(', ') || '-'}</span>
          </div>
        </div>

        <div style={{ marginTop: '12px', fontSize: '12px', color: '#999' }}>
          💡 이전 단계를 선택하면 다음 단계의 옵션이 활성화됩니다. 이전 단계 선택을 변경하면 하위 선택이 초기화됩니다.
        </div>
      </div>
    );
  },
};

