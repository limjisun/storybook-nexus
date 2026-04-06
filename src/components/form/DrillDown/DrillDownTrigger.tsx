import { useRef, useState, useLayoutEffect } from 'react';
import '../Select.css';
import './DrillDown.css';
import { Tooltip } from '../../Tooltip/Tooltip';
import type { SelectedTag } from './types';

export interface DrillDownTriggerProps {
    /** 현재 최종 선택된 태그 목록 */
    selectedTags: SelectedTag[];
    /** 태그 전체 제거 핸들러 */
    onClear: () => void;
    /** 박스 클릭 시 드롭다운 열기/닫기 */
    onClick: () => void;
    /** 드롭다운 열림 여부 */
    isOpen?: boolean;
    /** 컬럼 헤더 레이블 (툴팁 테이블 헤더에 사용) */
    levelLabels?: string[];
    /** placeholder 텍스트 */
    placeholder?: string;
    /** Select 스타일 변형 */
    variant?: 'outlined' | 'borderless';
    /** 비활성화 여부 */
    disabled?: boolean;
    /** 추가 CSS 클래스명 */
    className?: string;
    /** 선택 모드 */
    mode?: 'single' | 'multi';
}

/**
 * DrillDownSelect의 트리거 박스 컴포넌트.
 * Select 컴포넌트의 스타일을 그대로 사용합니다.
 * 선택된 항목을 path로 표시하거나, 넘치면 "N개 선택"으로 축약합니다.
 */
export default function DrillDownTrigger({
    selectedTags,
    onClear,
    onClick,
    isOpen = false,
    levelLabels = [],
    placeholder = '항목 선택',
    variant = 'outlined',
    disabled = false,
    className = '',
    mode = 'multi',
}: DrillDownTriggerProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const measureRef = useRef<HTMLSpanElement>(null);
    const hiddenMeasureRef = useRef<HTMLSpanElement>(null);
    const [isOverflowing, setIsOverflowing] = useState(false);

    // single mode일 때는 가장 긴 경로 하나만, multi mode일 때는 leaf 노드들만
    const leafTags = mode === 'single'
        ? selectedTags.slice(-1) // 마지막 선택된 항목만
        : selectedTags.filter((tag) => {
            const key = tag.path.join('\0');
            return !selectedTags.some((other) => {
                if (other === tag) return false;
                return other.path.join('\0').startsWith(key + '\0');
            });
        });

    // path 텍스트 생성
    const pathText = leafTags.map((tag) => tag.path.join(' > ')).join(', ');

    useLayoutEffect(() => {
        if (!containerRef.current || !hiddenMeasureRef.current || selectedTags.length === 0) {
            setIsOverflowing(false);
            return;
        }

        const checkOverflow = () => {
            const container = containerRef.current;
            const hiddenMeasure = hiddenMeasureRef.current;
            if (!container || !hiddenMeasure) return;

            // 숨겨진 요소의 실제 콘텐츠 너비와 container의 가용 너비 비교
            // × 버튼(약 20px) + 화살표 여백(약 30px) 제외
            const availableWidth = container.clientWidth - 50;
            const contentWidth = hiddenMeasure.offsetWidth;

            setIsOverflowing(contentWidth > availableWidth);
        };

        checkOverflow();

        const resizeObserver = new ResizeObserver(checkOverflow);
        resizeObserver.observe(containerRef.current);

        return () => resizeObserver.disconnect();
    }, [selectedTags, pathText]);

    const tableContent = selectedTags.length > 0 ? (
        <table className='drilldown-trigger__table'>
            <thead>
                <tr>
                    {levelLabels.map((label, i) => <th key={i}>{label}</th>)}
                </tr>
            </thead>
            <tbody>
                {leafTags.map((tag) => (
                    <tr key={tag.id + tag.path.join('/')}>
                        {tag.path.map((segment, i) => <td key={i}>{segment}</td>)}
                    </tr>
                ))}
            </tbody>
        </table>
    ) : null;

    return (
        <div
            ref={containerRef}
            className={`select select--${variant} ${isOpen ? 'select--open' : ''} ${disabled ? 'select--disabled' : ''} ${className}`}
        >
            {/* 숨겨진 측정용 요소 */}
            <span
                ref={hiddenMeasureRef}
                className="drilldown-trigger__hidden-measure"
                style={{
                    position: 'absolute',
                    visibility: 'hidden',
                    whiteSpace: 'nowrap',
                    pointerEvents: 'none',
                }}
            >
                {pathText}
            </span>

            {selectedTags.length > 0 ? (
                <Tooltip
                    content={tableContent}
                    placement="bottom"
                    trigger="hover"
                    className="drilldown-trigger__tooltip"
                    disabled={isOpen}
                >
                    <div className="select__trigger" onClick={!disabled ? onClick : undefined}>
                        <span className="select__value">
                            <div className="drilldown-trigger__content">
                                {isOverflowing ? (
                                    <span className="drilldown-trigger__count">{`${leafTags.length}개 선택`}</span>
                                ) : (
                                    <span ref={measureRef} className="drilldown-trigger__path">
                                        {pathText}
                                    </span>
                                )}
                                <button
                                    type="button"
                                    className="drilldown-trigger__clear"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onClear();
                                    }}
                                >
                                    ×
                                </button>
                            </div>
                        </span>
                        <span className="select__arrow" />
                    </div>
                </Tooltip>
            ) : (
                <div className="select__trigger" onClick={!disabled ? onClick : undefined}>
                    <span className="select__value">
                        <span className="drilldown-trigger__placeholder">{placeholder}</span>
                    </span>
                    <span className="select__arrow" />
                </div>
            )}
        </div>
    );
}
