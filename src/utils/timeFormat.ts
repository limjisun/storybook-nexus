/**
 * 시간을 상대 시간 또는 절대 시간으로 포맷팅합니다.
 *
 * @param date - Date 객체 또는 날짜 문자열
 * @returns 포맷팅된 시간 문자열
 *
 * @example
 * // 1분 전
 * formatTimeDisplay(new Date(Date.now() - 60000)) // "1분전"
 *
 * // 하루 이상 경과
 * formatTimeDisplay(new Date('2025-01-22 11:40')) // "2025-01-22 11:40"
 */
export function formatTimeDisplay(date: Date | string): string {
  const targetDate = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - targetDate.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  // 하루 이상 경과: 절대 시간 표시
  if (diffDays >= 1) {
    const year = targetDate.getFullYear();
    const month = String(targetDate.getMonth() + 1).padStart(2, '0');
    const day = String(targetDate.getDate()).padStart(2, '0');
    const hours = String(targetDate.getHours()).padStart(2, '0');
    const minutes = String(targetDate.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }

  // 하루 이내: 상대 시간 표시
  if (diffMinutes < 1) {
    return '방금';
  } else if (diffMinutes < 60) {
    return `${diffMinutes}분전`;
  } else {
    return `${diffHours}시간전`;
  }
}
