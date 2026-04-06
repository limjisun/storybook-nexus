import React, { useMemo, useState, useRef } from 'react';
import './DrillDown.css';
import Button from '../Button';
import Checkbox from '../Checkbox';
import RadioBox from '../RadioBox';
import type { DrillDownItem, SelectedTag, SearchResultItem } from './types';

interface DrillDownSelectProps {
    rootList: DrillDownItem[];
    selectedPath: DrillDownItem[];
    onLevelClick: (levelIndex: number, item: DrillDownItem) => void;
    tempSelectedTags: SelectedTag[];
    setTempSelectedTags: React.Dispatch<React.SetStateAction<SelectedTag[]>>;
    setSelectedTags: (value: SelectedTag[]) => void;
    setIsTagDropdownOpen: (value: boolean) => void;
    /** 컬럼 헤더 레이블. 길이에 따라 컬럼 수가 결정됩니다. */
    levelLabels?: string[];
    /** 각 컬럼의 최소 너비 (px). 기본값: 140 */
    columnMinWidth?: number;
    isLoading?: boolean;
    loadingColumnIndex?: number;
    onSearch?: (keyword: string) => Promise<SearchResultItem[]>;
    /** 선택 모드. 기본값: 'multi' */
    mode?: 'single' | 'multi';
    /** 드롭다운 전체 너비 (화면 크기에 따라 동적으로 계산됨) */
    dropdownWidth?: number;
}

function collectSelfAndDescendants(
    item: DrillDownItem,
    parentPath: string[]
): SelectedTag[] {
    const path = [...parentPath, item.text];
    const result: SelectedTag[] = [{ id: item.id, text: item.text, path }];
    if (!item.items?.length) return result;
    for (const child of item.items) {
        result.push(...collectSelfAndDescendants(child, path));
    }
    return result;
}

function isSelfOrDescendant(tagPath: string[], nodePath: string[]): boolean {
    if (tagPath.length < nodePath.length) return false;
    return nodePath.every((p, i) => tagPath[i] === p);
}

function pathKey(p: string[]) {
    return p.join('\0');
}

function getNodeAtPath(list: DrillDownItem[], pathIds: string[]): DrillDownItem | null {
    if (pathIds.length === 0) return null;
    const node = list.find((n) => n.id === pathIds[0]);
    if (!node) return null;
    if (pathIds.length === 1) return node;
    return getNodeAtPath(node.items ?? [], pathIds.slice(1));
}

/** 트리에서 모든 노드(자신 포함 하위 전체)를 수집 */
function collectAllLeaves(items: DrillDownItem[], parentPath: string[]): SelectedTag[] {
    const result: SelectedTag[] = [];
    for (const item of items) {
        result.push(...collectSelfAndDescendants(item, parentPath));
    }
    return result;
}

/**
 * 아이템의 체크 상태를 반환합니다.
 * - 'all'     : 자신이 선택됨 → checked
 * - 'partial' : 일부 하위만 선택됨 → indeterminate
 * - 'none'    : 자신 및 하위 모두 미선택 → unchecked
 */
function getItemCheckState(
    item: DrillDownItem,
    parentPath: string[],
    selectedKeys: Set<string>
): 'all' | 'partial' | 'none' {
    const currentPath = [...parentPath, item.text];
    const isCurrentSelected = selectedKeys.has(pathKey(currentPath));

    // 현재 항목이 선택되어 있으면 'all'
    if (isCurrentSelected) return 'all';

    // 현재 항목은 선택 안 됐지만, 하위 항목 중 선택된 게 있는지 확인
    const allDescendants = collectSelfAndDescendants(item, parentPath);
    const checkedCount = allDescendants.filter((t) => selectedKeys.has(pathKey(t.path))).length;

    if (checkedCount === 0) return 'none';
    return 'partial';
}

export default function DrillDownSelect({
    rootList,
    selectedPath,
    onLevelClick,
    tempSelectedTags,
    setTempSelectedTags,
    setSelectedTags,
    setIsTagDropdownOpen,
    levelLabels = [],
    columnMinWidth = 220,
    isLoading = false,
    loadingColumnIndex,
    onSearch,
    mode = 'multi',
    dropdownWidth,
}: DrillDownSelectProps) {

    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const keyword = e.target.value;
        setSearchKeyword(keyword);

        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        if (!keyword.trim()) {
            setSearchResults([]);
            return;
        }

        searchTimeoutRef.current = setTimeout(async () => {
            if (onSearch) {
                setIsSearching(true);
                try {
                    const results = await onSearch(keyword);
                    setSearchResults(results);
                } catch (error) {
                    console.error('검색 중 오류 발생:', error);
                    setSearchResults([]);
                } finally {
                    setIsSearching(false);
                }
            }
        }, 300);
    };

    const getItemsForColumn = (columnIndex: number): DrillDownItem[] => {
        if (columnIndex === 0) return rootList;
        if (selectedPath.length < columnIndex) return [];
        const pathIds = selectedPath.slice(0, columnIndex).map((n) => n.id);
        if (pathIds.length === 0) return [];
        const node = getNodeAtPath(rootList, pathIds);
        return node?.items ?? [];
    };

    const columnCount = levelLabels.length > 0 ? levelLabels.length : 3;

    const getColumnLabel = (columnIndex: number): string => {
        if (levelLabels[columnIndex] !== undefined) return levelLabels[columnIndex];
        return `${columnIndex + 1}단계`;
    };

    const getParentPathForColumn = (columnIndex: number): string[] => {
        if (columnIndex === 0) return [];
        return selectedPath.slice(0, columnIndex).map((n) => n.text);
    };

    const isColumnLoading = (columnIndex: number): boolean =>
        loadingColumnIndex !== undefined && loadingColumnIndex === columnIndex;

    const handleCheck = (columnIndex: number, item: DrillDownItem) => {
        const parentPath = getParentPathForColumn(columnIndex);
        const currentPath = [...parentPath, item.text];

        // 상위 경로 태그 생성 (현재 항목 제외, 조상만)
        const ancestorTags: SelectedTag[] = [];
        for (let i = 0; i < columnIndex; i++) {
            const depthPath = currentPath.slice(0, i + 1);
            const depthId = selectedPath[i].id;
            const depthText = currentPath[i];
            ancestorTags.push({ id: depthId, text: depthText, path: depthPath });
        }

        // 현재 항목만 추가 (하위 항목은 추가하지 않음)
        const currentTag: SelectedTag = { id: item.id, text: item.text, path: currentPath };

        setTempSelectedTags((prev) => {
            const existingKeys = new Set(prev.map((t) => pathKey(t.path)));

            // 상위 경로 + 현재 항목만 추가
            const allToAdd = [...ancestorTags, currentTag];
            const added = allToAdd.filter((t) => !existingKeys.has(pathKey(t.path)));

            return added.length ? [...prev, ...added] : prev;
        });
    };

    const handleUncheck = (columnIndex: number, item: DrillDownItem) => {
        const parentPath = getParentPathForColumn(columnIndex);
        const nodePath = [...parentPath, item.text];
        setTempSelectedTags((prev) =>
            prev.filter((t) => !isSelfOrDescendant(t.path, nodePath))
        );
    };

    const handleToggle = (columnIndex: number, item: DrillDownItem, e: React.MouseEvent) => {
        e.stopPropagation();
        const parentPath = getParentPathForColumn(columnIndex);
        const selectedKeys = new Set(tempSelectedTags.map((t) => pathKey(t.path)));
        const state = getItemCheckState(item, parentPath, selectedKeys);

        if (mode === 'single') {
            // single 모드: 루트부터 선택된 항목까지 전체 경로 체크
            const currentPath = [...parentPath, item.text];
            const currentPathKey = pathKey(currentPath);
            const isCurrentSelected = selectedKeys.has(currentPathKey);

            if (isCurrentSelected) {
                // 이미 선택된 항목 클릭 시 전체 경로 선택 해제
                setTempSelectedTags([]);
            } else {
                // 전체 경로 선택: 루트부터 현재 항목까지 모든 경로 추가
                const allPathTags: SelectedTag[] = [];
                const pathIds = selectedPath.slice(0, columnIndex).map((n) => n.id);
                pathIds.push(item.id);

                // 각 depth별로 태그 생성
                for (let i = 0; i <= columnIndex; i++) {
                    const depthPath = currentPath.slice(0, i + 1);
                    const depthId = i < columnIndex ? selectedPath[i].id : item.id;
                    const depthText = currentPath[i];
                    allPathTags.push({ id: depthId, text: depthText, path: depthPath });
                }

                setTempSelectedTags(allPathTags);
            }
        } else {
            // multi 모드: none → 전체 선택, partial/all → 전체 해제
            if (state === 'none') handleCheck(columnIndex, item);
            else handleUncheck(columnIndex, item);
        }
    };

    const handleSearchResultToggle = (item: SearchResultItem) => {
        const path = item.pathLabels;
        const pathIds = item.pathIds;
        const isAlreadySelected = tempSelectedTags.some((t) => pathKey(t.path) === pathKey(path));

        if (mode === 'single') {
            if (isAlreadySelected) {
                // 선택 해제: 해당 경로 및 상위 뎁스 태그 모두 제거
                setTempSelectedTags((prev) =>
                    prev.filter(
                        (t) =>
                            !(
                                t.path.length <= path.length &&
                                path.every((p, i) => t.path[i] === p)
                            )
                    )
                );
            } else {
                // 같은 depth 항목 제거 후, 경로 전체 뎁스 태그만 설정 (단일 선택이므로 이 경로만 유지)
                const pathPrefixTags: SelectedTag[] = path.map((label, i) => ({
                    id: pathIds[i],
                    text: label,
                    path: path.slice(0, i + 1),
                }));
                setTempSelectedTags(pathPrefixTags);
            }
        } else {
            if (isAlreadySelected) {
                setTempSelectedTags((prev) =>
                    prev.filter((t) => !isSelfOrDescendant(t.path, path))
                );
            } else {
                // 상위 경로 뎁스 태그 + 자신 및 하위 항목 추가 (해당 뎁스에 체크되도록)
                const ancestorTags: SelectedTag[] = path.slice(0, -1).map((label, i) => ({
                    id: pathIds[i],
                    text: label,
                    path: path.slice(0, i + 1),
                }));
                const parentPath = path.slice(0, -1);
                const toAdd = collectSelfAndDescendants(item, parentPath);
                const allToAdd = [...ancestorTags, ...toAdd];
                setTempSelectedTags((prev) => {
                    const existingKeys = new Set(prev.map((t) => pathKey(t.path)));
                    const added = allToAdd.filter((t) => !existingKeys.has(pathKey(t.path)));
                    return added.length ? [...prev, ...added] : prev;
                });
            }
        }
    };

    // ─── 컬럼 헤더 체크박스 상태 ────────────────────────────────
    const getColumnSelectAllState = (columnIndex: number): 'all' | 'partial' | 'none' => {
        const items = getItemsForColumn(columnIndex);
        if (items.length === 0) return 'none';
        const parentPath = getParentPathForColumn(columnIndex);
        const columnTags = collectAllLeaves(items, parentPath);
        if (columnTags.length === 0) return 'none';
        const selectedKeys = new Set(tempSelectedTags.map((t) => pathKey(t.path)));
        const checkedCount = columnTags.filter((t) => selectedKeys.has(pathKey(t.path))).length;
        if (checkedCount === 0) return 'none';
        if (checkedCount === columnTags.length) return 'all';
        return 'partial';
    };

    const handleColumnSelectAll = (columnIndex: number, e: React.MouseEvent) => {
        e.stopPropagation();
        const items = getItemsForColumn(columnIndex);
        const parentPath = getParentPathForColumn(columnIndex);
        const columnTags = collectAllLeaves(items, parentPath);
        const state = getColumnSelectAllState(columnIndex);

        if (state === 'all') {
            const columnKeys = new Set(columnTags.map((t) => pathKey(t.path)));
            setTempSelectedTags((prev) => prev.filter((t) => !columnKeys.has(pathKey(t.path))));
        } else {
            // 상위 경로 태그 생성 (컬럼 인덱스보다 위에 있는 모든 경로)
            const ancestorTags: SelectedTag[] = [];
            for (let i = 0; i < columnIndex; i++) {
                const depthPath = parentPath.slice(0, i + 1);
                const depthId = selectedPath[i].id;
                const depthText = parentPath[i];
                ancestorTags.push({ id: depthId, text: depthText, path: depthPath });
            }

            setTempSelectedTags((prev) => {
                const existingKeys = new Set(prev.map((t) => pathKey(t.path)));
                // 상위 경로 + 현재 컬럼의 모든 항목 추가
                const allToAdd = [...ancestorTags, ...columnTags];
                const added = allToAdd.filter((t) => !existingKeys.has(pathKey(t.path)));
                return added.length ? [...prev, ...added] : prev;
            });
        }
    };

    const list = useMemo(() => rootList ?? [], [rootList]);
    if (list.length === 0 && !searchKeyword) {
        return (
            <div className="drilldown__empty">
                <span>선택 가능한 항목이 없습니다.</span>
            </div>
        );
    }

    // dropdownWidth가 prop으로 전달되지 않으면 기본 계산식 사용
    const calculatedWidth = dropdownWidth ?? (columnCount * columnMinWidth + (columnCount - 1) * 17 + 30);

    return (
        <div className="drilldown__dropdown" style={{ width: calculatedWidth }}>

            {/* 검색 영역 - onSearch prop이 있을 때만 표시 */}
            {onSearch && (
                <div className="drilldown__search">
                    <input
                        type="text"
                        className="drilldown__search-input"
                        placeholder="검색어를 입력하세요"
                        value={searchKeyword}
                        onChange={handleSearchInput}
                    />
                </div>
            )}

            {/* 메인 컨텐츠 */}
            <div className="drilldown__body">
                {searchKeyword ? (
                    /* 검색 결과 뷰 */
                    <div className="drilldown__search-results">
                        {isSearching ? (
                            <div className="drilldown__status">검색 중...</div>
                        ) : searchResults.length === 0 ? (
                            <div className="drilldown__status">검색 결과가 없습니다.</div>
                        ) : (
                            <ul className="drilldown__result-list">
                                {searchResults.map((result) => {
                                    const pathString = result.pathLabels.join(' > ');
                                    const selected = tempSelectedTags.some(
                                        (t) => pathKey(t.path) === pathKey(result.pathLabels)
                                    );
                                    return (
                                        <li
                                            key={result.id + pathKey(result.pathIds)}
                                            className={`drilldown__result-item${selected ? ' drilldown__result-item--selected' : ''}`}
                                            onClick={() => handleSearchResultToggle(result)}
                                        >
                                            {mode === 'single' ? (
                                                <RadioBox
                                                    name={`drilldown-radio-col-${result.pathLabels.length - 1}`}
                                                    value={result.id}
                                                    checked={selected}
                                                />
                                            ) : (
                                                <Checkbox
                                                    id={`drilldown-search-${result.id}`}
                                                    checked={selected}
                                                    onChange={() => {}}
                                                />
                                            )}
                                            <div className="drilldown__result-info">
                                                <span className={`drilldown__result-text${selected ? ' drilldown__result-text--selected' : ''}`}>
                                                    {result.text}
                                                </span>
                                                <span className="drilldown__result-path">{pathString}</span>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>
                ) : (
                    /* 계층형 컬럼 뷰 */
                    Array.from({ length: columnCount }, (_, columnIndex) => {
                        const items = getItemsForColumn(columnIndex);
                        const parentPath = getParentPathForColumn(columnIndex);
                        const selectedInColumn = selectedPath[columnIndex] ?? null;
                        const columnLoading = isLoading && isColumnLoading(columnIndex);
                        const colSelectState = getColumnSelectAllState(columnIndex);
                        const selectedKeys = new Set(tempSelectedTags.map((t) => pathKey(t.path)));

                        return (
                            <div
                                key={columnIndex}
                                className="drilldown__column"
                                style={{ width: columnMinWidth }}
                            >
                                {/* 컬럼 헤더 */}
                                <div className="drilldown__column-header">
                                    {mode === 'multi' ? (
                                        <div
                                            className="drilldown__column-select-all"
                                            onClick={(e) => handleColumnSelectAll(columnIndex, e)}
                                        >
                                            <Checkbox
                                                id={`drilldown-col-${columnIndex}`}
                                                label={getColumnLabel(columnIndex)}
                                                checked={colSelectState === 'all'}
                                                indeterminate={colSelectState === 'partial'}
                                                onChange={() => {}}
                                            />
                                        </div>
                                    ) : (
                                        <div className="drilldown__column-label">
                                            <span>{getColumnLabel(columnIndex)}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="drilldown__column-body">
                                    {columnLoading ? (
                                        <div className="drilldown__status">로딩중...</div>
                                    ) : items.length === 0 ? (
                                        <div className="drilldown__status drilldown__status--empty">-</div>
                                    ) : (
                                        items.map((item) => {
                                            const checkState = getItemCheckState(item, parentPath, selectedKeys);
                                            const isActive = selectedInColumn?.id === item.id;
                                            const hasChildren = Array.isArray(item.items) && item.items.length > 0;

                                            // single 모드: 현재 항목만 체크 (자식 무시)
                                            const currentPath = [...parentPath, item.text];
                                            const isCurrentSelected = mode === 'single'
                                                ? selectedKeys.has(pathKey(currentPath))
                                                : checkState !== 'none';

                                            return (
                                                <div
                                                    key={`${columnIndex}-${item.id}`}
                                                    className={`drilldown__item${isActive ? ' drilldown__item--active' : ''}`}
                                                    onClick={() => onLevelClick(columnIndex, item)}
                                                >
                                                    <div className="drilldown__item-left">
                                                        {mode === 'single' ? (
                                                            <RadioBox
                                                                name={`drilldown-radio-col-${columnIndex}`}
                                                                value={item.id}
                                                                checked={isCurrentSelected}
                                                                onClick={(e) => handleToggle(columnIndex, item, e)}
                                                            />
                                                        ) : (
                                                            <Checkbox
                                                                id={`drilldown-item-${columnIndex}-${item.id}`}
                                                                checked={checkState === 'all'}
                                                                indeterminate={checkState === 'partial'}
                                                                onChange={() => {}}
                                                                onClick={(e: React.MouseEvent) => handleToggle(columnIndex, item, e)}
                                                            />
                                                        )}
                                                        <span className={`drilldown__item-text${isActive ? ' drilldown__item-text--active' : ''}`}>
                                                            {item.text}
                                                        </span>
                                                    </div>
                                                    {hasChildren && (
                                                        <span className="drilldown__item-arrow" />
                                                    )}
                                                </div>
                                            );
                                        })
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* 하단 버튼 */}
            <div className="drilldown__actions">
                <Button
                    text="닫기"
                    type="normal"
                    onClick={() => setIsTagDropdownOpen(false)}
                />
                <Button
                    text="선택"
                    type="default"
                    onClick={() => {
                        setSelectedTags(tempSelectedTags);
                        setIsTagDropdownOpen(false);
                    }}
                />
            </div>
        </div>
    );
}
