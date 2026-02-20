/** 계층 노드 - 드릴다운 메뉴의 각 항목을 정의합니다. */
export interface DrillDownItem {
    id: string;
    text: string;
    items?: DrillDownItem[];
}

/**
 * 선택된 태그 정보
 * path는 루트부터 해당 노드까지의 text 배열을 저장합니다.
 */
export interface SelectedTag {
    id: string;
    text: string;
    path: string[];
}

/**
 * 검색 결과 아이템
 */
export interface SearchResultItem extends DrillDownItem {
    pathIds: string[];
    pathLabels: string[];
}
