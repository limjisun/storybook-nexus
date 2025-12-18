import React from 'react';
import TagBox from 'devextreme-react/tag-box';
import Tooltip from 'devextreme-react/tooltip';
import type { Center, Tenant, Group, Team, Agent, Channel } from '../types';

export interface OrganizationFieldsProps {
  /** 센터 데이터 */
  centers: Center[];
  /** 테넌트 데이터 (필터링된) */
  tenants: Tenant[];
  /** 그룹 데이터 (필터링된) */
  groups: Group[];
  /** 팀 데이터 (필터링된) */
  teams: Team[];
  /** 상담사 데이터 (필터링된) */
  agents: Agent[];
  /** 채널 데이터 (필터링된) */
  channels: Channel[];

  /** 선택된 센터 IDs */
  selectedCenters: number[];
  /** 선택된 테넌트 CIDs */
  selectedTenants: string[];
  /** 선택된 그룹 TIDs */
  selectedGroups: string[];
  /** 선택된 팀 TGIDs */
  selectedTeams: string[];
  /** 선택된 상담사 IDs */
  selectedAgents: number[];
  /** 선택된 채널 IDs */
  selectedChannels: number[];

  /** 센터 변경 핸들러 */
  onCenterChange: (value: number[]) => void;
  /** 테넌트 변경 핸들러 */
  onTenantChange: (value: string[]) => void;
  /** 그룹 변경 핸들러 */
  onGroupChange: (value: string[]) => void;
  /** 팀 변경 핸들러 */
  onTeamChange: (value: string[]) => void;
  /** 상담사 변경 핸들러 */
  onAgentChange: (value: number[]) => void;
  /** 채널 변경 핸들러 */
  onChannelChange: (value: number[]) => void;

  /** ID prefix (여러 인스턴스 구분용) */
  idPrefix?: string;

  /** 표시할 필드 제어 */
  showFields?: {
    center?: boolean;
    tenant?: boolean;
    group?: boolean;
    team?: boolean;
    agent?: boolean;
    channel?: boolean;
  };
}

/**
 * OrganizationFields 컴포넌트
 *
 * 조직 계층 선택 필드들 (센터 → 테넌트 → 그룹 → 팀 → 상담사 → 채널)
 * DevExtreme TagBox와 Tooltip 사용
 * 계층형 선택 시 하위 항목 자동 비활성화
 *
 * showFields props로 표시할 필드를 동적으로 제어할 수 있습니다.
 */
export const OrganizationFields: React.FC<OrganizationFieldsProps> = ({
  centers,
  tenants,
  groups,
  teams,
  agents,
  channels,
  selectedCenters,
  selectedTenants,
  selectedGroups,
  selectedTeams,
  selectedAgents,
  selectedChannels,
  onCenterChange,
  onTenantChange,
  onGroupChange,
  onTeamChange,
  onAgentChange,
  onChannelChange,
  idPrefix = 'org',
  showFields = {
    center: true,
    tenant: true,
    group: true,
    team: true,
    agent: true,
    channel: true,
  },
}) => {
  // 공통 onMultiTagPreparing 함수
  const handleMultiTagPreparing = (args: any) => {
    if (args.selectedItems.length < 2) {
      args.cancel = true;
    } else {
      args.text = `${args.selectedItems.length} 선택`;
    }
  };

  return (
    <>
      {/* ========== 센터 ========== */}
      {showFields.center && (
        <div className='search-panel__data'>
          <TagBox
            id={`${idPrefix}_center_tagbox`}
            dataSource={centers}
            displayExpr="name"
            valueExpr="id"
            placeholder="센터 선택"
            value={selectedCenters}
            onValueChanged={(e) => onCenterChange(e.value)}
            showSelectionControls={true}
            maxDisplayedTags={1}
            searchEnabled={true}
            onMultiTagPreparing={handleMultiTagPreparing}
          />
          <Tooltip
            target={`#${idPrefix}_center_tagbox`}
            showEvent={selectedCenters.length > 0 ? 'mouseenter' : 'none'}
            hideEvent={selectedCenters.length > 0 ? 'mouseleave' : 'none'}
            hideOnOutsideClick={false}
            position="bottom"
          >
            <div
              style={{ textAlign: 'left' }}
              dangerouslySetInnerHTML={{
                __html: selectedCenters
                  .map(id => centers.find(c => c.id === id)?.name)
                  .join('<br>')
              }}
            />
          </Tooltip>
        </div>
      )}

      {/* ========== 테넌트 ========== */}
      {showFields.tenant && (
        <div className='search-panel__data'>
          <TagBox
            id={`${idPrefix}_tenant_tagbox`}
            dataSource={tenants}
            displayExpr="name"
            valueExpr="cid"
            placeholder="테넌트 선택"
            value={selectedTenants}
            onValueChanged={(e) => onTenantChange(e.value)}
            showSelectionControls={true}
            maxDisplayedTags={1}
            searchEnabled={true}
            disabled={selectedCenters.length === 0}
            onMultiTagPreparing={handleMultiTagPreparing}
          />
          <Tooltip
            target={`#${idPrefix}_tenant_tagbox`}
            showEvent={selectedTenants.length > 0 ? 'mouseenter' : 'none'}
            hideEvent={selectedTenants.length > 0 ? 'mouseleave' : 'none'}
            hideOnOutsideClick={false}
            position="bottom"
          >
            <div
              style={{ textAlign: 'left' }}
              dangerouslySetInnerHTML={{
                __html: selectedTenants
                  .map(cid => tenants.find(t => t.cid === cid)?.name)
                  .join('<br>')
              }}
            />
          </Tooltip>
        </div>
      )}

      {/* ========== 그룹 ========== */}
      {showFields.group && (
        <div className='search-panel__data'>
          <TagBox
            id={`${idPrefix}_group_tagbox`}
            dataSource={groups}
            displayExpr="name"
            valueExpr="tid"
            placeholder="그룹 선택"
            value={selectedGroups}
            onValueChanged={(e) => onGroupChange(e.value)}
            showSelectionControls={true}
            maxDisplayedTags={1}
            searchEnabled={true}
            disabled={selectedTenants.length === 0}
            onMultiTagPreparing={handleMultiTagPreparing}
          />
          <Tooltip
            target={`#${idPrefix}_group_tagbox`}
            showEvent={selectedGroups.length > 0 ? 'mouseenter' : 'none'}
            hideEvent={selectedGroups.length > 0 ? 'mouseleave' : 'none'}
            hideOnOutsideClick={false}
            position="bottom"
          >
            <div
              style={{ textAlign: 'left' }}
              dangerouslySetInnerHTML={{
                __html: selectedGroups
                  .map(tid => groups.find(g => g.tid === tid)?.name)
                  .join('<br>')
              }}
            />
          </Tooltip>
        </div>
      )}

      {/* ========== 팀 ========== */}
      {showFields.team && (
        <div className='search-panel__data'>
          <TagBox
            id={`${idPrefix}_team_tagbox`}
            dataSource={teams}
            displayExpr="name"
            valueExpr="tgid"
            placeholder="팀 선택"
            value={selectedTeams}
            onValueChanged={(e) => onTeamChange(e.value)}
            showSelectionControls={true}
            maxDisplayedTags={1}
            searchEnabled={true}
            disabled={selectedGroups.length === 0}
            onMultiTagPreparing={handleMultiTagPreparing}
          />
          <Tooltip
            target={`#${idPrefix}_team_tagbox`}
            showEvent={selectedTeams.length > 0 ? 'mouseenter' : 'none'}
            hideEvent={selectedTeams.length > 0 ? 'mouseleave' : 'none'}
            hideOnOutsideClick={false}
            position="bottom"
          >
            <div
              style={{ textAlign: 'left' }}
              dangerouslySetInnerHTML={{
                __html: selectedTeams
                  .map(tgid => teams.find(t => t.tgid === tgid)?.name)
                  .join('<br>')
              }}
            />
          </Tooltip>
        </div>
      )}

      {/* ========== 상담사 ========== */}
      {showFields.agent && (
        <div className='search-panel__data'>
          <TagBox
            id={`${idPrefix}_agent_tagbox`}
            dataSource={agents}
            displayExpr="name"
            valueExpr="id"
            placeholder="상담사 선택"
            value={selectedAgents}
            onValueChanged={(e) => onAgentChange(e.value)}
            showSelectionControls={true}
            maxDisplayedTags={1}
            searchEnabled={true}
            disabled={selectedTeams.length === 0}
            onMultiTagPreparing={handleMultiTagPreparing}
          />
          <Tooltip
            target={`#${idPrefix}_agent_tagbox`}
            showEvent={selectedAgents.length > 0 ? 'mouseenter' : 'none'}
            hideEvent={selectedAgents.length > 0 ? 'mouseleave' : 'none'}
            hideOnOutsideClick={false}
            position="bottom"
          >
            <div
              style={{ textAlign: 'left' }}
              dangerouslySetInnerHTML={{
                __html: selectedAgents
                  .map(id => agents.find(a => a.id === id)?.name)
                  .join('<br>')
              }}
            />
          </Tooltip>
        </div>
      )}

      {/* ========== 채널 ========== */}
      {showFields.channel && (
        <div className='search-panel__data'>
          <TagBox
            id={`${idPrefix}_channel_tagbox`}
            dataSource={channels}
            displayExpr="name"
            valueExpr="id"
            placeholder="채널 선택"
            value={selectedChannels}
            onValueChanged={(e) => onChannelChange(e.value)}
            showSelectionControls={true}
            maxDisplayedTags={1}
            searchEnabled={true}
            disabled={selectedAgents.length === 0}
            onMultiTagPreparing={handleMultiTagPreparing}
          />
          <Tooltip
            target={`#${idPrefix}_channel_tagbox`}
            showEvent={selectedChannels.length > 0 ? 'mouseenter' : 'none'}
            hideEvent={selectedChannels.length > 0 ? 'mouseleave' : 'none'}
            hideOnOutsideClick={false}
            position="bottom"
          >
            <div
              style={{ textAlign: 'left' }}
              dangerouslySetInnerHTML={{
                __html: selectedChannels
                  .map(id => channels.find(c => c.id === id)?.name)
                  .join('<br>')
              }}
            />
          </Tooltip>
        </div>
      )}
    </>
  );
};
