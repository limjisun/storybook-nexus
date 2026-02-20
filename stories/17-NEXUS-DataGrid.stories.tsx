import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DataGrid } from '../src/components/DataGrid';
import type { DataGridColumn, SummaryItem } from '../src/components/DataGrid';

const meta = {
  title: 'DevExtreme/DataGrid',
  component: DataGrid,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
NEXUS DataGrid는 DevExtreme DataGrid를 기반으로 한 강력한 데이터 테이블 컴포넌트입니다.

## 주요 기능
- 📊 정렬, 페이징
- 🏷️ Title (상단 타이틀, Toolbar 위치 자동 조정)
- 🔍 Filter Row (컬럼별 필터 입력)
- 🎯 Header Filter (드롭다운 필터)
- 📤 Excel 내보내기
- ✏️ 인라인 편집
- 🔧 컬럼 선택기
- ♾️ 무한 스크롤 / 가상 스크롤
- 🧮 Summary (합계/평균/개수 등 통계)
- 📁 Grouping (데이터 그룹화)
- 📱 반응형 디자인
- 🎨 NEXUS 디자인 시스템 스타일

## 사용 예시

### 기본 사용법
\`\`\`tsx
<DataGrid
  id="basic-grid"
  columns={columns}
  dataSource={data}
/>
\`\`\`

### Title 추가
\`\`\`tsx
<DataGrid
  title="게시판 상담사별 통계"
  columns={columns}
  dataSource={data}
  enableExport={true}      // Toolbar 버튼 있으면 title에 'ab' 클래스 자동 추가
  enableColumnChooser={true}
/>
\`\`\`

**Title 위치 자동 조정:**
- Toolbar 버튼 있을 때: \`className="title-grid ab"\` (position: absolute)
- Toolbar 버튼 없을 때: \`className="title-grid"\` (일반 위치)

### API 연동
\`\`\`tsx
<DataGrid
  id="api-grid"
  url="/api/customers"
  columns={columns}
  params={{ status: 'active' }}
/>
\`\`\`

### 커스텀 데이터 로딩
\`\`\`tsx
<DataGrid
  id="custom-grid"
  columns={columns}
  onLoadData={async (params) => {
    const response = await fetch('/api/data', {
      method: 'POST',
      body: JSON.stringify(params)
    });
    return response.json();
  }}
/>
\`\`\`

### 무한 스크롤 모드
\`\`\`tsx
<DataGrid
  id="infinite-grid"
  columns={columns}
  dataSource={data}
  scrollingMode="infinite"
  enablePaging={false}
/>
\`\`\`

### 가상 스크롤 모드 (대용량 데이터)
\`\`\`tsx
<DataGrid
  id="virtual-grid"
  columns={columns}
  dataSource={largeDataSet}
  scrollingMode="virtual"
  enablePaging={false}
/>
\`\`\`

### Summary (합계/통계) 표시
\`\`\`tsx
<DataGrid
  id="summary-grid"
  columns={columns}
  dataSource={data}
  enableSummary={true}
  summaryItems={[
    { column: 'price', summaryType: 'sum', displayFormat: '총액: {0}원' },
    { column: 'quantity', summaryType: 'avg', displayFormat: '평균: {0}개' },
    { column: 'id', summaryType: 'count', displayFormat: '총 {0}건' }
  ]}
/>
\`\`\`

### Grouping (그룹화)
\`\`\`tsx
<DataGrid
  id="grouping-grid"
  columns={[
    { dataField: 'category', groupIndex: 0 },  // 이 컬럼으로 그룹화
    { dataField: 'name' },
    { dataField: 'price' }
  ]}
  dataSource={data}
  enableGrouping={true}
  enableGroupPanel={true}  // 드래그로 그룹 설정 가능
  autoExpandAll={true}     // 그룹 자동 펼치기
/>
\`\`\`

### Grouping + Summary (그룹별 합계)
\`\`\`tsx
<DataGrid
  columns={columns}
  dataSource={data}
  enableGrouping={true}
  enableSummary={true}
  summaryItems={[
    { column: 'price', summaryType: 'sum', displayFormat: '전체 총합: {0}원' }
  ]}
  groupSummaryItems={[
    { column: 'price', summaryType: 'sum', displayFormat: '그룹 합계: {0}원', alignByColumn: true }
  ]}
/>
\`\`\`

### Filter Row (컬럼별 필터)
\`\`\`tsx
<DataGrid
  columns={columns}
  dataSource={data}
  enableFilterRow={true}  // 각 컬럼 아래 필터 입력란 표시
/>
\`\`\`

### Header Filter (드롭다운 필터)
\`\`\`tsx
<DataGrid
  columns={columns}
  dataSource={data}
  enableHeaderFilter={true}  // 컬럼 헤더에 필터 아이콘 표시
/>
\`\`\`

### 두 가지 필터 함께 사용
\`\`\`tsx
<DataGrid
  columns={columns}
  dataSource={data}
  enableFilterRow={true}
  enableHeaderFilter={true}  // 두 필터 방식 모두 사용
/>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    id: {
      control: 'text',
      description: 'Grid의 고유 ID',
    },
    keyExpr: {
      control: 'text',
      description: '데이터의 키 필드명',
    },
    columns: {
      control: 'object',
      description: '컬럼 정의 배열',
    },
    dataSource: {
      control: 'object',
      description: '정적 데이터 소스',
    },
    url: {
      control: 'text',
      description: 'API URL',
    },
    params: {
      control: 'object',
      description: 'API 요청 파라미터',
    },
    enableExport: {
      control: 'boolean',
      description: 'Excel 내보내기 활성화',
    },
    enableColumnChooser: {
      control: 'boolean',
      description: '컬럼 선택기 활성화',
    },
    enablePaging: {
      control: 'boolean',
      description: '페이징 활성화',
    },
    enableSelection: {
      control: 'boolean',
      description: '행 선택 활성화',
    },
    enableEditing: {
      control: 'boolean',
      description: '편집 모드 활성화',
    },
    scrollingMode: {
      control: 'select',
      options: ['standard', 'virtual', 'infinite'],
      description: '스크롤 모드 (standard: 페이징, virtual: 가상스크롤, infinite: 무한스크롤)',
    },
    enableSummary: {
      control: 'boolean',
      description: 'Summary (합계/통계) 기능 활성화',
    },
    summaryItems: {
      control: 'object',
      description: '전체 합계 항목 설정',
    },
    groupSummaryItems: {
      control: 'object',
      description: '그룹별 합계 항목 설정',
    },
    enableGrouping: {
      control: 'boolean',
      description: 'Grouping (그룹화) 기능 활성화',
    },
    enableGroupPanel: {
      control: 'boolean',
      description: 'Group Panel 표시 (드래그로 그룹 설정 가능)',
    },
    autoExpandAll: {
      control: 'boolean',
      description: '그룹 자동 펼치기',
    },
    enableFilterRow: {
      control: 'boolean',
      description: 'Filter Row (컬럼별 필터 입력란) 활성화',
    },
    enableHeaderFilter: {
      control: 'boolean',
      description: 'Header Filter (컬럼 헤더 드롭다운 필터) 활성화',
    },
    title: {
      control: 'text',
      description: 'DataGrid 상단 타이틀 (Toolbar 버튼 유무에 따라 위치 자동 조정)',
    },
    pageSize: {
      control: 'number',
      description: '페이지당 행 수',
    },
    exportFileName: {
      control: 'text',
      description: '내보내기 파일명',
    },
  },
} satisfies Meta<typeof DataGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample Data
const customerData = [
  { id: 1, name: '김철수', email: 'kim@example.com', phone: '010-1234-5678', status: '활성', joinDate: '2024-01-15', orderCount: 12 },
  { id: 2, name: '이영희', email: 'lee@example.com', phone: '010-2345-6789', status: '활성', joinDate: '2024-02-20', orderCount: 8 },
  { id: 3, name: '박민수', email: 'park@example.com', phone: '010-3456-7890', status: '비활성', joinDate: '2024-03-10', orderCount: 3 },
  { id: 4, name: '정수진', email: 'jung@example.com', phone: '010-4567-8901', status: '활성', joinDate: '2024-04-05', orderCount: 15 },
  { id: 5, name: '최동현', email: 'choi@example.com', phone: '010-5678-9012', status: '활성', joinDate: '2024-05-12', orderCount: 6 },
  { id: 6, name: '강민지', email: 'kang@example.com', phone: '010-6789-0123', status: '활성', joinDate: '2024-06-18', orderCount: 9 },
  { id: 7, name: '윤서현', email: 'yoon@example.com', phone: '010-7890-1234', status: '비활성', joinDate: '2024-07-22', orderCount: 2 },
  { id: 8, name: '임재훈', email: 'lim@example.com', phone: '010-8901-2345', status: '활성', joinDate: '2024-08-30', orderCount: 11 },
  { id: 9, name: '한지원', email: 'han@example.com', phone: '010-9012-3456', status: '활성', joinDate: '2024-09-14', orderCount: 7 },
  { id: 10, name: '오성민', email: 'oh@example.com', phone: '010-0123-4567', status: '활성', joinDate: '2024-10-08', orderCount: 14 },
  { id: 11, name: '서지훈', email: 'seo@example.com', phone: '010-1111-2222', status: '비활성', joinDate: '2024-11-01', orderCount: 1 },
  { id: 12, name: '권은지', email: 'kwon@example.com', phone: '010-2222-3333', status: '활성', joinDate: '2024-11-15', orderCount: 5 },
];

const basicColumns: DataGridColumn[] = [
  { dataField: 'id', caption: 'ID', width: 80, alignment: 'center' },
  { dataField: 'name', caption: '이름', width: 120 },
  { dataField: 'email', caption: '이메일', width: 200 },
  { dataField: 'phone', caption: '전화번호', width: 150 },
  { dataField: 'status', caption: '상태', width: 100, alignment: 'center' },
  { dataField: 'joinDate', caption: '가입일', width: 120, dataType: 'date' },
  { dataField: 'orderCount', caption: '주문수', width: 100, alignment: 'right', dataType: 'number' },
];

/**
 * 기본 DataGrid 예제입니다.
 * 컬럼 선택, 표 저장, 열 드래그 앤 드롭 기능이 활성화되어 있습니다.
 * - 컬럼 선택: 보고 싶은 컬럼을 선택/해제할 수 있습니다
 * - 표 저장: 현재 설정(컬럼 순서, 너비, 표시 여부)을 저장합니다
 * - 열 이동: 컬럼 헤더를 드래그하여 순서를 변경할 수 있습니다
 */
export const Default: Story = {
  args: {
    id: 'default-grid',
    keyExpr: 'id',
    columns: basicColumns,
    dataSource: customerData,
    title: '고객 목록',
    enableSelection: true,
    scrollingMode: 'infinite',
    pageSize: 5,
    enablePaging: false,
    enableExport: false,
    enableColumnChooser: true,
    enableSaveLayout: true,
    enableColumnReordering: true,
    columnChooserButtonText: '컬럼 선택',
    saveLayoutButtonText: '표 저장',
  },
};

/**
 * 엑셀 다운로드와 합계 기능이 있는 DataGrid입니다.
 * - 엑셀 다운로드: 현재 데이터를 엑셀 파일로 내보냅니다
 * - 합계(Summary): 하단에 Count, Sum, Avg 통계를 표시합니다
 */
export const WithExportAndSummary: Story = {
  args: {
    id: 'export-summary-grid',
    keyExpr: 'id',
    columns: basicColumns,
    dataSource: customerData,
    title: '대표번호 실적 (총합)',
    enableExport: true,
    enableColumnChooser: true,
    enableSaveLayout: true,
    enableColumnReordering: true,
    enableSummary: true,
    summaryItems: [
      {
        column: 'id',
        summaryType: 'count',
        displayFormat: 'Count: {0}',
      },
      {
        column: 'orderCount',
        summaryType: 'sum',
        displayFormat: 'Sum: {0}',
      },
      {
        column: 'orderCount',
        summaryType: 'avg',
        displayFormat: 'Avg: {0}',
        valueFormat: 'fixedPoint',
      },
    ],
    exportButtonText: '엑셀 다운로드',
    columnChooserButtonText: '컬럼 선택',
    saveLayoutButtonText: '표 저장',
    exportFileName: '대표번호실적',
    pageSize: 10,
  },
};

// Sample Data for Complex Header
const complexHeaderData = [
  {
    id: 1,
    tenant: '테넌트1',
    division: '분의유형1',
    status: 5,
    directPhone: 3,
    transferReason: 2,
    transferTime: 1,
    receiptTime: '00:15:30',
    receiptAvg: '00:03:06',
    consultTime: '01:23:45',
    consultAvg: '00:16:45',
    afterTime: '00:45:20',
    afterAvg: '00:09:04',
    totalTime: '02:24:35',
    totalAvg: '00:28:55',
    avgCount: 8,
    avgProcessTime: '00:18:05'
  },
  {
    id: 2,
    tenant: '테넌트2',
    division: '분의유형2',
    status: 8,
    directPhone: 5,
    transferReason: 3,
    transferTime: 2,
    receiptTime: '00:25:15',
    receiptAvg: '00:03:09',
    consultTime: '02:15:30',
    consultAvg: '00:16:56',
    afterTime: '01:05:45',
    afterAvg: '00:08:13',
    totalTime: '03:46:30',
    totalAvg: '00:28:18',
    avgCount: 12,
    avgProcessTime: '00:18:52'
  },
];

/**
 * 복잡한 다중 레벨 헤더 구조를 가진 DataGrid입니다.
 * 헤더가 여러 레벨로 중첩되어 그룹화되어 있으며, 하단에 합계를 표시합니다.
 */
export const WithComplexHeader: Story = {
  args: {
    id: 'complex-header-grid',
    keyExpr: 'id',
    columns: [
      {
        dataField: 'tenant',
        caption: '테넌트',
        alignment: 'center',
        width: 100
      },
      {
        dataField: 'division',
        caption: '분의유형',
        alignment: 'center',
        width: 100
      },
      {
        caption: '분의유형별 현황',
        alignment: 'center',
        columns: [
          {
            dataField: 'status',
            caption: '상담등록',
            alignment: 'center',
            width: 100,
            dataType: 'number'
          },
          {
            dataField: 'directPhone',
            caption: '직전화',
            alignment: 'center',
            width: 100,
            dataType: 'number'
          },
          {
            dataField: 'transferReason',
            caption: '처리지전',
            alignment: 'center',
            width: 100,
            dataType: 'number'
          },
          {
            dataField: 'transferTime',
            caption: '처리율',
            alignment: 'center',
            width: 100,
            dataType: 'number'
          },
        ]
      },
      {
        caption: '계시글 기준 현황',
        alignment: 'center',
        columns: [
          {
            caption: '상담 대기시간',
            alignment: 'center',
            columns: [
              {
                dataField: 'receiptTime',
                caption: '총 시간',
                alignment: 'center',
                width: 100
              },
              {
                dataField: 'receiptAvg',
                caption: '1건 평균',
                alignment: 'center',
                width: 100
              },
            ]
          },
          {
            caption: '상담 소요시간',
            alignment: 'center',
            columns: [
              {
                dataField: 'consultTime',
                caption: '총 시간',
                alignment: 'center',
                width: 100
              },
              {
                dataField: 'consultAvg',
                caption: '1건 평균',
                alignment: 'center',
                width: 100
              },
            ]
          },
          {
            caption: '결과 저장시간',
            alignment: 'center',
            columns: [
              {
                dataField: 'afterTime',
                caption: '총 시간',
                alignment: 'center',
                width: 100
              },
              {
                dataField: 'afterAvg',
                caption: '1건 평균',
                alignment: 'center',
                width: 100
              },
            ]
          },
        ]
      },
      {
        caption: '상담사 기준 현황',
        alignment: 'center',
        columns: [
          {
            dataField: 'totalTime',
            caption: '총 처리시간',
            alignment: 'center',
            width: 120
          },
          {
            dataField: 'totalAvg',
            caption: '처리시간',
            alignment: 'center',
            width: 100
          },
          {
            dataField: 'avgCount',
            caption: '평균 담변건',
            alignment: 'center',
            width: 120,
            dataType: 'number'
          },
          {
            dataField: 'avgProcessTime',
            caption: '평균 처리시간',
            alignment: 'center',
            width: 120
          },
        ]
      },
    ],
    dataSource: complexHeaderData,
    title: '계시판 문의유형통계',
    enableExport: true,
    enableColumnChooser: true,
    enableSummary: true,
    summaryItems: [
      {
        column: 'status',
        summaryType: 'sum',
        displayFormat: 'Sum: {0}',
      },
      {
        column: 'directPhone',
        summaryType: 'sum',
        displayFormat: 'Sum: {0}',
      },
      {
        column: 'transferReason',
        summaryType: 'sum',
        displayFormat: 'Sum: {0}',
      },
      {
        column: 'transferTime',
        summaryType: 'sum',
        displayFormat: 'Sum: {0}',
      },
      {
        column: 'avgCount',
        summaryType: 'avg',
        displayFormat: 'Avg: {0}',
        valueFormat: 'fixedPoint',
      },
    ],
    exportButtonText: '엑셀 다운로드',
    columnChooserButtonText: '컬럼 선택',
    pageSize: 10,
  },
};

// Sample Data for Template Management (상담 템플릿)
const templateData = [
  { id: 1, center: '[1] NEXUS', tenant: '[11] qat', description: '템플릿 테스트1', useFlag: '미사용', updateDate: '2025-12-23', updater: '11s***h' },
  { id: 2, center: '[1] NEXUS', tenant: '[11] qat', description: '테스트test', useFlag: '미사용', updateDate: '2026-01-09', updater: '11justi***3' },
  { id: 3, center: '[1] NEXUS', tenant: '[11] qat', description: '테스트123', useFlag: '미사용', updateDate: '2025-12-23', updater: '11sa***2' },
  { id: 4, center: '[1] NEXUS', tenant: '[11] qat', description: '132123213123', useFlag: '미사용', updateDate: '2025-12-23', updater: '11sa***2' },
  { id: 5, center: '[1] NEXUS', tenant: '[11] qat', description: '21132`132123213213', useFlag: '미사용', updateDate: '2025-12-23', updater: '11sa***2' },
  { id: 6, center: '[1] NEXUS', tenant: '[11] qat', description: '테스트입니다ㅣㅣㅣㅣ', useFlag: '미사용', updateDate: '2025-12-23', updater: '11sa***2' },
  { id: 7, center: '[1] NEXUS', tenant: '[11] qat', description: '템플릿 테스트11', useFlag: '미사용', updateDate: '2025-12-23', updater: '11s***h' },
  { id: 8, center: '[1] NEXUS', tenant: '[11] qat', description: '3333', useFlag: '미사용', updateDate: '2025-12-23', updater: '11justi***3' },
  { id: 9, center: '[1] NEXUS', tenant: '[11] qat', description: '55', useFlag: '미사용', updateDate: '2025-12-29', updater: '11justi***3' },
  { id: 10, center: '[1] NEXUS', tenant: '[12] test', description: '테스트345', useFlag: '미사용', updateDate: '2025-12-23', updater: '11s***h' },
];

// Sample Data for Agent Management
const agentData = [
  { id: 1, tenant: '[1] NEXUS_DEV', menu: '[3] 글벨', usage: '', useYn: '사용', createdDate: '2024-04-23', creator: 'MA***R' },
  { id: 2, tenant: '[1] NEXUS_DEV', menu: '[5] 실시간 문자 발송', usage: 'ums', useYn: '사용', createdDate: '2024-10-23', creator: 'MA***R' },
  { id: 3, tenant: '[1] NEXUS_DEV', menu: '[6] 실시간 이메일 발송', usage: '', useYn: '사용', createdDate: '2023-11-23', creator: 'ros***a' },
  { id: 4, tenant: '[1] NEXUS_DEV', menu: '[9] 공지사항', usage: '', useYn: '사용', createdDate: '2024-07-08', creator: 'MA***R' },
  { id: 5, tenant: '[1] NEXUS_DEV', menu: '[10] 실시간알림목', usage: '', useYn: '사용', createdDate: '2023-11-23', creator: 'ros***a' },
  { id: 6, tenant: '[1] NEXUS_DEV', menu: '[11] 채팅상담사용', usage: '', useYn: '사용', createdDate: '2024-04-12', creator: '***a' },
  { id: 7, tenant: '[1] NEXUS_DEV', menu: '[13] 비상담업무', usage: '', useYn: '사용', createdDate: '2023-11-21', creator: 'MA***R' },
  { id: 8, tenant: '[1] NEXUS_DEV', menu: '[14] 주문반호사용', usage: '', useYn: '사용', createdDate: '2023-12-03', creator: 'MA***R' },
  { id: 9, tenant: '[1] NEXUS_DEV', menu: '[17] singleStepTransfer', usage: '51001', useYn: '사용', createdDate: '2024-02-15', creator: 'ros***a' },
  { id: 10, tenant: '[1] NEXUS_DEV', menu: '[19] 캠페인리스트관리칼럼당', usage: '', useYn: '사용', createdDate: '2023-12-01', creator: 'ros***a' },
  { id: 11, tenant: '[1] NEXUS_DEV', menu: '[23] 통화중 상담리스트 이동', usage: '', useYn: '사용', createdDate: '2023-12-01', creator: 'ros***a' },
  { id: 12, tenant: '[1] NEXUS_DEV', menu: '[24] 글벨리스트 별도저장', usage: '', useYn: '사용', createdDate: '2023-12-01', creator: 'ros***a' },
  { id: 13, tenant: '[1] NEXUS_DEV', menu: '[25] 글벨리스트 개별상담사 실시간알림당', usage: '', useYn: '사용', createdDate: '2023-12-01', creator: 'ros***a' },
  { id: 14, tenant: '[1] NEXUS_DEV', menu: '[31] 고객정보조회로그', usage: '', useYn: '사용', createdDate: '2023-12-13', creator: 'MA***R' },
  { id: 15, tenant: '[1] NEXUS_DEV', menu: '[32] 글벨 처리 기능', usage: 'all', useYn: '사용', createdDate: '2024-04-23', creator: 'MA***R' },
];

const agentColumns: DataGridColumn[] = [
  { dataField: 'tenant', caption: '테넌트', width: 150, alignment: 'left' },
  { dataField: 'menu', caption: '메뉴명', width: 250, alignment: 'left' },
  { dataField: 'usage', caption: '용선', width: 100, alignment: 'center' },
  { dataField: 'useYn', caption: '사용 여부', width: 100, alignment: 'center' },
  { dataField: 'createdDate', caption: '수정일', width: 120, alignment: 'center', dataType: 'date' },
  { dataField: 'creator', caption: '수정자', width: 120, alignment: 'center' },
];

// 센터 옵션 (제이쿼리 소스와 동일)
const centerOptions = [
  { id: '[1] NEXUS', name: '[1] NEXUS' },
];

// 테넌트 옵션
const tenantOptions = [
  { id: '[11] qat', name: '[11] qat' },
  { id: '[12] test', name: '[12] test' },
];

// 사용 여부 옵션
const useFlagOptions = [
  { id: '사용', name: '사용' },
  { id: '미사용', name: '미사용' },
];

// Template 컬럼 정의 (제이쿼리 소스와 동일)
const templateColumns: any[] = [
  {
    dataField: 'center',
    caption: '센터',
    width: 150,
    alignment: 'left',
    lookup: {
      dataSource: centerOptions,
      valueExpr: 'id',
      displayExpr: 'name'
    }
  },
  {
    dataField: 'tenant',
    caption: '테넌트',
    width: 150,
    alignment: 'left',
    lookup: {
      dataSource: tenantOptions,
      valueExpr: 'id',
      displayExpr: 'name'
    }
  },
  {
    dataField: 'description',
    caption: '설명',
    width: 400,
    alignment: 'left',
    filterOperations: ['contains']
  },
  {
    dataField: 'useFlag',
    caption: '사용 여부',
    width: 100,
    alignment: 'center',
    lookup: {
      dataSource: useFlagOptions,
      valueExpr: 'id',
      displayExpr: 'name'
    }
  },
  {
    dataField: 'updateDate',
    caption: '수정일',
    width: 120,
    alignment: 'center',
    dataType: 'date',
    filterOperations: ['=']
  },
  {
    dataField: 'updater',
    caption: '수정자',
    width: 120,
    alignment: 'center',
    filterOperations: ['contains']
  },
];

// 편집/삭제 버튼이 있는 컬럼 (제이쿼리 소스처럼 - 맨 앞에 위치)
const agentColumnsWithButtons: any[] = [
  { dataField: 'tenant', caption: '테넌트', width: 150, alignment: 'left' },
  { dataField: 'menu', caption: '메뉴명', width: 250, alignment: 'left' },
  { dataField: 'usage', caption: '용선', width: 100, alignment: 'center' },
  { dataField: 'useYn', caption: '사용 여부', width: 100, alignment: 'center' },
  { dataField: 'createdDate', caption: '수정일', width: 120, alignment: 'center', dataType: 'date' },
  { dataField: 'creator', caption: '수정자', width: 120, alignment: 'center' },
];

/**
 * 상담 템플릿 관리 DataGrid (제이쿼리 소스와 동일한 구조)
 * - 체크박스: 여러 행을 선택할 수 있습니다
 * - 툴바 버튼: 선택삭제, 추가, 저장, 취소, 컬럼선택
 * - 편집/삭제 버튼: 각 행마다 편집, 삭제 버튼 (체크박스 옆)
 * - 필터: 설명, 수정자 컬럼만 필터링 가능
 * - 편집: 편집 버튼 클릭하여 팝업 폼으로 수정
 */
export const WithSelectionFilterEditing: Story = {
  args: {
    id: 'template-management-grid',
    keyExpr: 'id',
    columns: [
      // 맨 앞에 버튼 컬럼 추가 (제이쿼리 소스와 동일)
      {
        type: 'buttons',
        width: 75,
        buttons: [
          {
            name: 'edit',
            text: '수정',
          },
          {
            name: 'delete',
            text: '삭제',
          },
        ],
        showInColumnChooser: false,
      },
      // 나머지 컬럼들
      ...templateColumns.map((col) => {
        return {
          ...col,
          allowEditing: col.dataField !== 'id' && col.dataField !== 'updateDate',
          allowFiltering: true, // 모든 컬럼 필터 허용
        };
      }),
    ],
    dataSource: templateData,
    title: '상담 템플릿',
    enableSelection: true,
    selectionMode: 'multiple',
    enableEditing: true,
    editingMode: 'form',
    allowUpdating: true,
    allowAdding: true,
    allowDeleting: true,
    enableFilterRow: true,
    enableHeaderFilter: false,
    enableExport: false,
    enableColumnChooser: true,
    enablePaging: false,
    scrollingMode: 'infinite',
    pageSize: 20,
    toolbarButtons: [
      {
        text: '선택삭제',
        icon: 'trash',
        type: 'danger',
        location: 'after',
        onClick: () => {
          console.log('선택삭제 clicked');
          // 선택된 행들을 삭제하는 로직
        },
      },
      {
        text: '추가',
        icon: 'plus',
        type: 'success',
        location: 'after',
        onClick: () => {
          console.log('추가 clicked');
          // 새 행 추가 로직
        },
      },
      {
        text: '저장',
        icon: 'save',
        type: 'default',
        location: 'after',
        onClick: () => {
          console.log('저장 clicked');
          // 변경사항 저장 로직
        },
      },
      {
        text: '취소',
        icon: 'revert',
        type: 'normal',
        location: 'after',
        onClick: () => {
          console.log('취소 clicked');
          // 변경사항 취소 로직
        },
      },
    ],
    columnChooserButtonText: '컬럼선택',
    onSelectionChanged: (e: any) => {
      console.log('Selected rows:', e.selectedRowKeys);
    },
  },
};

