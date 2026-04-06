import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import DrillDownTrigger from './DrillDownTrigger';
import DrillDownSelect from './DrillDownSelect';
import type { DrillDownItem, SelectedTag, SearchResultItem } from './types';

export interface DrillDownProps {
    /** 계층형 데이터 */
    data: DrillDownItem[];
    /** 제어 컴포넌트: 현재 선택된 값 */
    value?: SelectedTag[];
    /** 비제어 컴포넌트: 초기 선택 값 */
    defaultValue?: SelectedTag[];
    /** 선택된 값 변경 콜백 */
    onChange?: (selectedTags: SelectedTag[]) => void;
    /** 컬럼 헤더 레이블 */
    levelLabels?: string[];
    /** 각 컬럼의 최소 너비 (px). 기본값: 220 */
    columnMinWidth?: number;
    /** 선택 모드. 기본값: 'multi' */
    mode?: 'single' | 'multi';
    /** 검색 함수 (제공 시 검색창 표시) */
    onSearch?: (keyword: string) => Promise<SearchResultItem[]>;
    /** placeholder 텍스트 */
    placeholder?: string;
    /** Select 스타일 변형 */
    variant?: 'outlined' | 'borderless';
    /** 비활성화 여부 */
    disabled?: boolean;
    /** 추가 CSS 클래스명 */
    className?: string;
}

/**
 * DrillDown - 계층형 드릴다운 선택 컴포넌트
 *
 * 다중/단일 선택, 검색, 툴팁 등을 제공하는 통합 드릴다운 선택 컴포넌트입니다.
 *
 * @example
 * ```tsx
 * <DrillDown
 *   data={hierarchicalData}
 *   levelLabels={['지역', '센터', '팀']}
 *   mode="single"
 *   onChange={(tags) => console.log(tags)}
 * />
 * ```
 */
export default function DrillDown({
    data,
    value,
    defaultValue,
    onChange,
    levelLabels = [],
    columnMinWidth = 220,
    mode = 'multi',
    onSearch,
    placeholder = '항목 선택',
    variant = 'outlined',
    disabled = false,
    className = '',
}: DrillDownProps) {
    const [selectedPath, setSelectedPath] = useState<DrillDownItem[]>([]);
    const [tempSelectedTags, setTempSelectedTags] = useState<SelectedTag[]>(defaultValue || []);
    const [selectedTagsInternal, setSelectedTagsInternal] = useState<SelectedTag[]>(defaultValue || []);
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });

    const triggerRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // 제어 컴포넌트: value prop이 있으면 value 사용
    const selectedTags = value !== undefined ? value : selectedTagsInternal;

    const handleLevelClick = (levelIndex: number, item: DrillDownItem) => {
        setSelectedPath((prev) => {
            const next = prev.slice(0, levelIndex);
            next[levelIndex] = item;
            return next;
        });
    };

    const handleSetSelectedTags = (tags: SelectedTag[]) => {
        // 비제어 컴포넌트일 때만 내부 상태 업데이트
        if (value === undefined) {
            setSelectedTagsInternal(tags);
        }
        // onChange는 항상 호출
        if (onChange) {
            onChange(tags);
        }
    };

    const handleClear = () => {
        setTempSelectedTags([]);
        // 비제어 컴포넌트일 때만 내부 상태 업데이트
        if (value === undefined) {
            setSelectedTagsInternal([]);
        }
        // onChange는 항상 호출
        if (onChange) {
            onChange([]);
        }
    };

    // 드롭다운 위치 계산
    const updatePosition = () => {
        if (triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            setPosition({
                top: rect.bottom + window.scrollY + 4,
                left: rect.left + window.scrollX,
            });
        }
    };

    // 드롭다운이 열릴 때 위치 계산
    useEffect(() => {
        if (isOpen) {
            updatePosition();
            window.addEventListener('scroll', updatePosition);
            window.addEventListener('resize', updatePosition);
            return () => {
                window.removeEventListener('scroll', updatePosition);
                window.removeEventListener('resize', updatePosition);
            };
        }
    }, [isOpen]);

    // 외부 클릭 감지
    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (
                triggerRef.current && !triggerRef.current.contains(event.target as Node) &&
                dropdownRef.current && !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
         <div ref={triggerRef} className={`drilldown-trigger ${className || ''}`}>
            <DrillDownTrigger
                selectedTags={selectedTags}
                levelLabels={levelLabels}
                isOpen={isOpen}
                onClick={() => !disabled && setIsOpen((v) => !v)}
                onClear={handleClear}
                placeholder={placeholder}
                variant={variant}
                disabled={disabled}
                mode={mode}
            />

            {isOpen && !disabled && createPortal(
                <div
                    ref={dropdownRef}
                    style={{
                        position: 'absolute',
                        top: position.top,
                        left: position.left,
                        zIndex: 9999,
                    }}
                >
                    <DrillDownSelect
                        rootList={data}
                        selectedPath={selectedPath}
                        onLevelClick={handleLevelClick}
                        tempSelectedTags={tempSelectedTags}
                        setTempSelectedTags={setTempSelectedTags}
                        setSelectedTags={handleSetSelectedTags}
                        setIsTagDropdownOpen={setIsOpen}
                        levelLabels={levelLabels}
                        columnMinWidth={columnMinWidth}
                        mode={mode}
                        onSearch={onSearch}
                    />
                </div>,
                document.body
            )}
        </div>
    );
}

// 하위 컴포넌트와 타입 export (필요시 개별 사용 가능)
export { DrillDownSelect, DrillDownTrigger };
export type { DrillDownItem, SelectedTag, SearchResultItem };
