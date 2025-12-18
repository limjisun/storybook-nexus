import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

export interface MenuItem {
  path: string;
  icon: string;
  label: string;
}

export interface SidebarProps {
  /** 메뉴 아이템 목록 */
  menuItems?: MenuItem[];
  /** 활성화된 경로 (스토리북용) */
  activePath?: string;
}

const DEFAULT_MENU_ITEMS: MenuItem[] = [
  { path: '/counsel', icon: 'ticket', label: '상담앱' },
  { path: '/quality', icon: 'list', label: '상담품질' },
  { path: '/aiagent', icon: 'aiagent', label: 'AI agent' },
  { path: '/monitor', icon: 'monitor', label: '모니터링' },
  { path: '/analytics', icon: 'analytics', label: '통계/분석' },
  { path: '/settings', icon: 'settings', label: '설정' },
  { path: '/scenario', icon: 'scenario', label: '시나리오' },
  { path: '/schedule', icon: 'schedule', label: '스케줄' },
  { path: '/control', icon: 'control', label: '관제' },
  { path: '/favorites', icon: 'favorites', label: '즐겨찾기' },
];

/**
 * Sidebar 컴포넌트
 *
 * 좌측 네비게이션 사이드바
 * 아이콘 메뉴와 툴팁으로 구성
 *
 * @example
 * ```tsx
 * <Sidebar menuItems={menuItems} />
 * ```
 */
export const Sidebar: React.FC<SidebarProps> = ({
  menuItems = DEFAULT_MENU_ITEMS,
  activePath
}) => {
  return (
    <nav className="sidebar">
      <ul className="sidebar__menu">
        {menuItems.map((item) => (
          <li key={item.path} className="sidebar__menu-item">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `sidebar__menu-link sidebar__menu-link--${item.icon} ${
                  (isActive || activePath === item.path) ? 'sidebar__menu-link--active' : ''
                }`
              }
            >
            </NavLink>
            <span className="sidebar__tooltip">{item.label}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
};
