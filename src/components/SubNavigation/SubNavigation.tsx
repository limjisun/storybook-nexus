import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './SubNavigation.css';

export interface SubNavigationItem {
  path: string;
  label: string;
  badge?: number;
}

export interface SubNavigationSection {
  id: string;
  label: string;
  items: SubNavigationItem[];
  defaultOpen?: boolean;
}

export interface SubNavigationProps {
  /** 상단 타이틀 */
  title?: string;
  /** 메뉴 섹션 목록 */
  sections?: SubNavigationSection[];
  /** 검색 기능 활성화 */
  searchable?: boolean;
  /** 아이템 클릭 핸들러 */
  onItemClick?: (path: string) => void;
  /** 현재 활성화된 경로 (스토리북용) */
  activePath?: string;
}

/**
 * SubNavigation 컴포넌트
 *
 * 2depth 네비게이션 메뉴
 * 접을 수 있는 섹션과 배지 지원
 *
 * @example
 * ```tsx
 * <SubNavigation
 *   title="CCaaS"
 *   sections={sections}
 *   searchable
 * />
 * ```
 */
export const SubNavigation: React.FC<SubNavigationProps> = ({
  title,
  sections = [],
  searchable = false,
  onItemClick,
  activePath
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    sections.forEach(section => {
      initial[section.id] = section.defaultOpen ?? false;
    });
    return initial;
  });

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const filteredSections = sections.map(section => {
    if (!searchQuery) return section;

    const filteredItems = section.items.filter(item =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return {
      ...section,
      items: filteredItems
    };
  }).filter(section => section.items.length > 0);

  return (
    <>
      <nav className={`sub-nav ${isCollapsed ? 'sub-nav--collapsed' : ''}`}>
        {title && (
          <div className="sub-nav__header">
            <h2 className="sub-nav__title">{title}</h2>
            <button
              className="sub-nav__collapse-btn"
              onClick={() => setIsCollapsed(true)}
              title="접기"
            >
            </button>
          </div>
        )}

      {searchable && (
        <div className="sub-nav__search">
          <input
            type="text"
            className="sub-nav__search-input"
            placeholder="검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      )}

      <div className="sub-nav__content">
        {filteredSections.map((section) => (
          <div key={section.id} className="sub-nav__section">
            <button
              className="sub-nav__section-header"
              onClick={() => toggleSection(section.id)}
            >
              <span className="sub-nav__section-label">{section.label}</span>
              <span className={`sub-nav__section-toggle ${openSections[section.id] ? 'sub-nav__section-toggle--open' : ''}`}>
              </span>
            </button>

            {openSections[section.id] && (
              <ul className="sub-nav__list">
                {section.items.map((item) => (
                  <li key={item.path} className="sub-nav__item">
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `sub-nav__link ${
                          (isActive || activePath === item.path) ? 'sub-nav__link--active' : ''
                        }`
                      }
                      onClick={() => onItemClick?.(item.path)}
                    >
                      <span className="sub-nav__link-text">{item.label}</span>
                      {item.badge !== undefined && item.badge > 0 && (
                        <span className="sub-nav__badge">{item.badge}</span>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </nav>
     {isCollapsed && (
          <button
            className="sub-nav__expand-btn"
            onClick={() => setIsCollapsed(false)}
            title="펼치기"
          >
          </button>
        )}
  
    </>
  );
};
