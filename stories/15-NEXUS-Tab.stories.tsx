import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DndContext, DragEndEvent, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { Tab } from '../src/components/Tab';
import type { TabItem } from '../src/components/Tab';
import { TabDragOverlay } from '../src/components/Tab/DraggableTabItem';
import { SplitPanel } from '../src/components/SplitPanel';

/**
 * NEXUS Tab 컴포넌트
 *
 * 가로 스크롤 가능한 탭 네비게이션 컴포넌트입니다.
 * 탭 닫기, 현재 탭 찾기 등의 기능을 제공합니다.
 *
 * ## Features
 * - ✅ 가로 스크롤 (탭이 많을 때)
 * - ✅ 탭 닫기 버튼
 * - ✅ 현재 탭 찾기 (자동 스크롤)
 * - ✅ 다른 탭 닫기
 * - ✅ 모든 탭 닫기
 * - ✅ 드롭다운 메뉴
 *
 * ## Usage
 * ```tsx
 * import { Tab } from '@/components/Tab';
 *
 * const tabs = [
 *   { id: '1', label: '탭 1', closable: true },
 *   { id: '2', label: '탭 2', closable: true },
 * ];
 *
 * <Tab
 *   tabs={tabs}
 *   activeTabId="1"
 *   onTabClick={(id) => console.log(id)}
 *   onTabClose={(id) => console.log('close', id)}
 * />
 * ```
 */
const meta = {
  title: 'NEXUS-CUSTOM/탭',
  component: Tab,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '가로 스크롤 가능한 탭 네비게이션 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tab>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 화면 분할 모드 (기본)
 *
 * 분할 버튼을 클릭하면 화면이 좌우로 나뉘어집니다.
 * 각 섹션 간 탭 드래그 이동이 가능합니다.
 * - 8px 이상 드래그해야 탭 이동 (클릭과 구분)
 * - 좌우 패널 간 탭 드래그 가능
 * - DragOverlay로 드래그 중 시각적 피드백 제공
 */
export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 600,
      },
    },
  },
  render: () => {
    // 전체 탭 목록
    const allTabs: TabItem[] = [
      { id: '1', label: '휴일설정', favorite: false },
      { id: '2', label: '통화 유형 통계', favorite: true },
      { id: '3', label: '상담원(내선) 통계', favorite: false },
      { id: '4', label: 'IVR 통화 통계', favorite: false },
      { id: '5', label: '아웃바운드 통계', favorite: false },
      { id: '6', label: '전송결과조회', favorite: false },
    ];

    const [isSplitMode, setIsSplitMode] = useState(false);

    // 단일 모드 상태
    const [singleTabs, setSingleTabs] = useState<TabItem[]>(allTabs);
    const [singleActiveTabId, setSingleActiveTabId] = useState('2');

    // 분할 모드 상태
    const [leftTabs, setLeftTabs] = useState<TabItem[]>([]);
    const [rightTabs, setRightTabs] = useState<TabItem[]>([]);
    const [leftActiveTabId, setLeftActiveTabId] = useState('');
    const [rightActiveTabId, setRightActiveTabId] = useState('');

    // 드래그 상태
    const [activeTab, setActiveTab] = useState<TabItem | null>(null);

    // 센서 설정: 8px 이상 움직여야 드래그 시작
    const sensors = useSensors(
      useSensor(PointerSensor, {
        activationConstraint: {
          distance: 8, // 8px 이상 움직여야 드래그 시작
        },
      })
    );

    // 드래그 시작 핸들러
    const handleDragStart = (event: any) => {
      const { active } = event;
      const draggedTab = [...singleTabs, ...leftTabs, ...rightTabs].find(
        t => t.id === active.id
      );
      setActiveTab(draggedTab || null);
    };

    // 드래그 엔드 핸들러
    const handleDragEnd = (event: DragEndEvent) => {
      setActiveTab(null); // 드래그 종료 시 초기화
      const { active, over } = event;

      if (!over) return;

      const activeId = active.id as string;
      const overId = over.id as string;

      console.log('Drag end:', { activeId, overId, isSplitMode });

      // tab-header로 드롭된 경우 - 해당 패널 끝에 추가
      if (overId.startsWith('tab-header-')) {
        const targetPanelId = overId.replace('tab-header-', '');
        const draggedTab = [...singleTabs, ...leftTabs, ...rightTabs].find(t => t.id === activeId);
        if (!draggedTab) return;

        if (isSplitMode) {
          if (targetPanelId === 'left') {
            // 왼쪽 패널로 이동
            const newRightTabs = rightTabs.filter(t => t.id !== activeId);
            setLeftTabs([...leftTabs, draggedTab]);
            setRightTabs(newRightTabs);
            setLeftActiveTabId(activeId);
          } else if (targetPanelId === 'right') {
            // 오른쪽 패널로 이동
            const newLeftTabs = leftTabs.filter(t => t.id !== activeId);
            setLeftTabs(newLeftTabs);
            setRightTabs([...rightTabs, draggedTab]);
            setRightActiveTabId(activeId);
          }
        }
        return;
      }

      // droppable로 시작하는 경우 탭 재정렬
      if (overId.startsWith('droppable-')) {
        const targetId = overId.replace('droppable-', '');

        if (isSplitMode) {
          // 분할 모드에서의 탭 이동
          const isInLeft = leftTabs.some(t => t.id === activeId);
          const isInRight = rightTabs.some(t => t.id === activeId);
          const targetInLeft = leftTabs.some(t => t.id === targetId);
          const targetInRight = rightTabs.some(t => t.id === targetId);

          const draggedTab = [...leftTabs, ...rightTabs].find(t => t.id === activeId);
          if (!draggedTab) return;

          // 왼쪽 → 오른쪽
          if (isInLeft && targetInRight) {
            const newLeftTabs = leftTabs.filter(t => t.id !== activeId);
            const targetIndex = rightTabs.findIndex(t => t.id === targetId);
            const newRightTabs = [...rightTabs];
            newRightTabs.splice(targetIndex, 0, draggedTab);
            setLeftTabs(newLeftTabs);
            setRightTabs(newRightTabs);
            setRightActiveTabId(activeId);
          }
          // 오른쪽 → 왼쪽
          else if (isInRight && targetInLeft) {
            const newRightTabs = rightTabs.filter(t => t.id !== activeId);
            const targetIndex = leftTabs.findIndex(t => t.id === targetId);
            const newLeftTabs = [...leftTabs];
            newLeftTabs.splice(targetIndex, 0, draggedTab);
            setLeftTabs(newLeftTabs);
            setRightTabs(newRightTabs);
            setLeftActiveTabId(activeId);
          }
          // 같은 패널 내 순서 변경 - 왼쪽
          else if (isInLeft && targetInLeft) {
            const fromIndex = leftTabs.findIndex(t => t.id === activeId);
            const toIndex = leftTabs.findIndex(t => t.id === targetId);
            const newLeftTabs = [...leftTabs];
            const [moved] = newLeftTabs.splice(fromIndex, 1);
            newLeftTabs.splice(toIndex, 0, moved);
            setLeftTabs(newLeftTabs);
          }
          // 같은 패널 내 순서 변경 - 오른쪽
          else if (isInRight && targetInRight) {
            const fromIndex = rightTabs.findIndex(t => t.id === activeId);
            const toIndex = rightTabs.findIndex(t => t.id === targetId);
            const newRightTabs = [...rightTabs];
            const [moved] = newRightTabs.splice(fromIndex, 1);
            newRightTabs.splice(toIndex, 0, moved);
            setRightTabs(newRightTabs);
          }
        } else {
          // 단일 모드에서의 탭 순서 변경
          const fromIndex = singleTabs.findIndex(t => t.id === activeId);
          const toIndex = singleTabs.findIndex(t => t.id === targetId);
          const newTabs = [...singleTabs];
          const [moved] = newTabs.splice(fromIndex, 1);
          newTabs.splice(toIndex, 0, moved);
          setSingleTabs(newTabs);
        }
      }
    };

    // 분할 토글
    const handleSplitToggle = () => {
      if (!isSplitMode) {
        // 분할 활성화: 왼쪽 n-1개, 오른쪽 1개
        const allTabsData = [...singleTabs];
        setLeftTabs(allTabsData.slice(0, -1));
        setRightTabs([allTabsData[allTabsData.length - 1]]);
        setLeftActiveTabId(singleActiveTabId);
        setRightActiveTabId(allTabsData[allTabsData.length - 1].id);
        setIsSplitMode(true);
      } else {
        // 분할 해제: 모든 탭을 단일 모드로
        const mergedTabs = [...leftTabs, ...rightTabs];
        setSingleTabs(mergedTabs);
        setSingleActiveTabId(leftActiveTabId || rightActiveTabId);
        setIsSplitMode(false);
      }
    };

    // 탭 닫기
    const handleTabClose = (tabId: string, panel?: 'left' | 'right') => {
      if (isSplitMode) {
        if (panel === 'left') {
          const newTabs = leftTabs.filter(tab => tab.id !== tabId);
          setLeftTabs(newTabs);
          if (leftActiveTabId === tabId && newTabs.length > 0) {
            setLeftActiveTabId(newTabs[newTabs.length - 1].id);
          }
        } else if (panel === 'right') {
          const newTabs = rightTabs.filter(tab => tab.id !== tabId);
          setRightTabs(newTabs);
          if (rightActiveTabId === tabId && newTabs.length > 0) {
            setRightActiveTabId(newTabs[newTabs.length - 1].id);
          }
        }
      } else {
        const newTabs = singleTabs.filter(tab => tab.id !== tabId);
        setSingleTabs(newTabs);
        if (singleActiveTabId === tabId && newTabs.length > 0) {
          setSingleActiveTabId(newTabs[newTabs.length - 1].id);
        }
      }
    };

    // 즐겨찾기 토글
    const handleFavoriteToggle = (tabId: string) => {
      if (isSplitMode) {
        // 왼쪽 패널 탭
        setLeftTabs(leftTabs.map(tab =>
          tab.id === tabId ? { ...tab, favorite: !tab.favorite } : tab
        ));
        // 오른쪽 패널 탭
        setRightTabs(rightTabs.map(tab =>
          tab.id === tabId ? { ...tab, favorite: !tab.favorite } : tab
        ));
      } else {
        // 단일 모드 탭
        setSingleTabs(singleTabs.map(tab =>
          tab.id === tabId ? { ...tab, favorite: !tab.favorite } : tab
        ));
      }
    };

    // 다른 탭 닫기
    const handleCloseOthers = (panel?: 'left' | 'right') => {
      if (isSplitMode) {
        if (panel === 'left') {
          const activeTab = leftTabs.find(tab => tab.id === leftActiveTabId);
          if (activeTab) {
            setLeftTabs([activeTab]);
          }
        } else if (panel === 'right') {
          const activeTab = rightTabs.find(tab => tab.id === rightActiveTabId);
          if (activeTab) {
            setRightTabs([activeTab]);
          }
        }
      } else {
        const activeTab = singleTabs.find(tab => tab.id === singleActiveTabId);
        if (activeTab) {
          setSingleTabs([activeTab]);
        }
      }
    };

    // 모든 탭 닫기
    const handleCloseAll = (panel?: 'left' | 'right') => {
      if (isSplitMode) {
        if (panel === 'left') {
          const remainingTabs = leftTabs.filter(tab => tab.closable === false);
          setLeftTabs(remainingTabs);
          if (remainingTabs.length > 0) {
            setLeftActiveTabId(remainingTabs[0].id);
          } else {
            setLeftActiveTabId('');
          }
        } else if (panel === 'right') {
          const remainingTabs = rightTabs.filter(tab => tab.closable === false);
          setRightTabs(remainingTabs);
          if (remainingTabs.length > 0) {
            setRightActiveTabId(remainingTabs[0].id);
          } else {
            setRightActiveTabId('');
          }
        }
      } else {
        const remainingTabs = singleTabs.filter(tab => tab.closable === false);
        setSingleTabs(remainingTabs);
        if (remainingTabs.length > 0) {
          setSingleActiveTabId(remainingTabs[0].id);
        }
      }
    };

    return (
      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        
          {isSplitMode ? (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <SplitPanel
                leftPanel={
                  <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <Tab
                      tabs={leftTabs}
                      activeTabId={leftActiveTabId}
                      onTabClick={setLeftActiveTabId}
                      onTabClose={(id) => handleTabClose(id, 'left')}
                      onFavoriteToggle={handleFavoriteToggle}
                      onCloseOthers={() => handleCloseOthers('left')}
                      onCloseAll={() => handleCloseAll('left')}
                      panelId="left"
                    />
                    <div style={{ flex: 1, padding: '20px', overflow: 'auto', backgroundColor: '#f5f5f5' }}>
                      <h1>{leftTabs.find((t: TabItem) => t.id === leftActiveTabId)?.label}</h1>
                      <p>왼쪽 패널 콘텐츠</p>
                      <p>탭 개수: {leftTabs.length}</p>
                    </div>
                  </div>
                }
                rightPanel={
                  <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <Tab
                      tabs={rightTabs}
                      activeTabId={rightActiveTabId}
                      onTabClick={setRightActiveTabId}
                      onTabClose={(id) => handleTabClose(id, 'right')}
                      onFavoriteToggle={handleFavoriteToggle}
                      onCloseOthers={() => handleCloseOthers('right')}
                      onCloseAll={() => handleCloseAll('right')}
                      onSplitToggle={handleSplitToggle}
                      isSplitMode={true}
                      panelId="right"
                    />
                    <div style={{ flex: 1, padding: '20px', overflow: 'auto', backgroundColor: '#fafafa' }}>
                      <h1>{rightTabs.find((t: TabItem) => t.id === rightActiveTabId)?.label}</h1>
                      <p>오른쪽 패널 콘텐츠</p>
                      <p>탭 개수: {rightTabs.length}</p>
                    </div>
                  </div>
                }
              />
            </div>
          ) : (
            <>
              <Tab
                tabs={singleTabs}
                activeTabId={singleActiveTabId}
                onTabClick={setSingleActiveTabId}
                onTabClose={(id) => handleTabClose(id)}
                onFavoriteToggle={handleFavoriteToggle}
                onCloseOthers={() => handleCloseOthers()}
                onCloseAll={() => handleCloseAll()}
                onSplitToggle={handleSplitToggle}
                isSplitMode={false}
              />
              <div style={{ flex: 1, padding: '20px', backgroundColor: '#f5f5f5', overflow: 'auto', borderTop: '1px solid #EBEBEB'}}>
                <h1>{singleTabs.find(t => t.id === singleActiveTabId)?.label}</h1>
                <p>단일 모드 콘텐츠입니다.</p>
                <p>상단의 분할 버튼을 클릭하면 화면이 좌우로 분할됩니다.</p>
                <p>탭 개수: {singleTabs.length}</p>
              </div>
            </>
          )}
        </div>

        {/* 드래그 오버레이 */}
        <DragOverlay>
          {activeTab ? (
            <TabDragOverlay
              tab={activeTab}
              isActive={
                activeTab.id === singleActiveTabId ||
                activeTab.id === leftActiveTabId ||
                activeTab.id === rightActiveTabId
              }
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    );
  },
};
