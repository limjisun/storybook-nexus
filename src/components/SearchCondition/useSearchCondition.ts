import { useState, useMemo } from 'react';
import type {
  SearchFormValues,
  OrganizationData,
  UseSearchConditionReturn,
  Tenant,
  Group,
  Team,
  Agent,
  Channel,
} from './types';

/**
 * SearchCondition 커스텀 훅
 *
 * 검색 조건의 모든 상태와 로직을 관리합니다.
 * 조직 계층형 선택 시 자동으로 하위 항목을 리셋합니다.
 */
export const useSearchCondition = (
  organizationData?: OrganizationData,
  initialValues?: Partial<SearchFormValues>
): UseSearchConditionReturn => {
  // ========================================
  // State 초기화
  // ========================================
  const today = new Date();
  const weekLater = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

  const [selectedTeam, setSelectedTeam] = useState(initialValues?.selectedTeam || '');
  const [sortOrder, setSortOrder] = useState(initialValues?.sortOrder || '');
  const [agreed, setAgreed] = useState(initialValues?.agreed || false);
  const [startDate, setStartDate] = useState<Date>(initialValues?.startDate || today);
  const [endDate, setEndDate] = useState<Date>(initialValues?.endDate || weekLater);
  const [startTime, setStartTime] = useState<Date>(initialValues?.startTime || new Date());
  const [endTime, setEndTime] = useState<Date>(initialValues?.endTime || new Date());
  const [holidaySetting, setHolidaySetting] = useState<'none' | 'exclude' | 'only' | 'customExclude' | 'weekendOnly'>(
    initialValues?.holidaySetting || 'none'
  );

  const [selectedCenters, setSelectedCenters] = useState<number[]>(initialValues?.selectedCenters || []);
  const [selectedTenants, setSelectedTenants] = useState<string[]>(initialValues?.selectedTenants || []);
  const [selectedGroups, setSelectedGroups] = useState<string[]>(initialValues?.selectedGroups || []);
  const [selectedTeams, setSelectedTeams] = useState<string[]>(initialValues?.selectedTeams || []);
  const [selectedAgents, setSelectedAgents] = useState<number[]>(initialValues?.selectedAgents || []);
  const [selectedChannels, setSelectedChannels] = useState<number[]>(initialValues?.selectedChannels || []);

  // ========================================
  // 필터링 로직
  // ========================================

  // 테넌트 필터링 (센터 선택에 따라)
  const filteredTenants = useMemo<Tenant[]>(() => {
    if (!organizationData || selectedCenters.length === 0) return [];
    return organizationData.tenants.filter(t => selectedCenters.includes(t.center_id));
  }, [organizationData, selectedCenters]);

  // 그룹 필터링 (테넌트 선택에 따라)
  const filteredGroups = useMemo<Group[]>(() => {
    if (!organizationData || selectedTenants.length === 0) return [];
    const tenantIds = selectedTenants.map(cid => parseInt(cid.split(',')[1]));
    return organizationData.groups.filter(g => tenantIds.includes(g.tenant_id));
  }, [organizationData, selectedTenants]);

  // 팀 필터링 (그룹 선택에 따라)
  const filteredTeams = useMemo<Team[]>(() => {
    if (!organizationData || selectedGroups.length === 0) return [];
    const groupIds = selectedGroups.map(tid => parseInt(tid.split(',')[2]));
    return organizationData.teams.filter(t => groupIds.includes(t.upper_id));
  }, [organizationData, selectedGroups]);

  // 상담사 필터링 (팀 선택에 따라)
  const filteredAgents = useMemo<Agent[]>(() => {
    if (!organizationData || selectedTeams.length === 0) return [];

    const uniqueAgents = Array.from(new Set(
      organizationData.allData
        .filter(d => d.agent_id)
        .map(d => JSON.stringify({ id: d.agent_id, name: d.agent_name }))
    )).map(s => JSON.parse(s));

    return uniqueAgents;
  }, [organizationData, selectedTeams]);

  // 채널 필터링 (상담사 선택에 따라)
  const filteredChannels = useMemo<Channel[]>(() => {
    if (!organizationData || selectedAgents.length === 0) return [];

    const uniqueChannels = Array.from(new Set(
      organizationData.allData
        .filter(d => d.channel_id && selectedAgents.includes(d.agent_id))
        .map(d => JSON.stringify({ id: d.channel_id, name: d.channel_name }))
    )).map(s => JSON.parse(s));

    return uniqueChannels;
  }, [organizationData, selectedAgents]);

  // ========================================
  // 계층형 선택 핸들러 (캐스케이딩 리셋)
  // ========================================

  const handleCenterChange = (value: number[]) => {
    setSelectedCenters(value);
    // 하위 항목 모두 리셋
    setSelectedTenants([]);
    setSelectedGroups([]);
    setSelectedTeams([]);
    setSelectedAgents([]);
    setSelectedChannels([]);
  };

  const handleTenantChange = (value: string[]) => {
    setSelectedTenants(value);
    // 하위 항목 리셋
    setSelectedGroups([]);
    setSelectedTeams([]);
    setSelectedAgents([]);
    setSelectedChannels([]);
  };

  const handleGroupChange = (value: string[]) => {
    setSelectedGroups(value);
    // 하위 항목 리셋
    setSelectedTeams([]);
    setSelectedAgents([]);
    setSelectedChannels([]);
  };

  const handleTeamChange = (value: string[]) => {
    setSelectedTeams(value);
    // 하위 항목 리셋
    setSelectedAgents([]);
    setSelectedChannels([]);
  };

  const handleAgentChange = (value: number[]) => {
    setSelectedAgents(value);
    // 하위 항목 리셋
    setSelectedChannels([]);
  };

  // ========================================
  // 반환값
  // ========================================
  return {
    // Values
    values: {
      selectedTeam,
      sortOrder,
      agreed,
      startDate,
      endDate,
      startTime,
      endTime,
      holidaySetting,
      selectedCenters,
      selectedTenants,
      selectedGroups,
      selectedTeams,
      selectedAgents,
      selectedChannels,
    },

    // Setters
    setSelectedTeam,
    setSortOrder,
    setAgreed,
    setStartDate,
    setEndDate,
    setStartTime,
    setEndTime,
    setHolidaySetting,
    setSelectedChannels,

    // Hierarchical handlers
    handleCenterChange,
    handleTenantChange,
    handleGroupChange,
    handleTeamChange,
    handleAgentChange,

    // Filtered data
    filteredTenants,
    filteredGroups,
    filteredTeams,
    filteredAgents,
    filteredChannels,
  };
};
