import './SearchCondition.css';

export default {
  title: 'Company/관리자-조회조건 모듈',
  parameters: {
    docs: {
      description: {
        component: '회사 표준 조회조건 모듈입니다. 제목과 조회/초기화 버튼을 포함합니다.'
      }
    }
  },
  argTypes: {
    title: {
      control: 'text',
      description: '조회조건 제목',
      defaultValue: '조회조건'
    },
    hasUnderline: {
      control: 'boolean',
      description: '하단 보더라인 표시',
      defaultValue: false
    },
    showRefreshButton: {
      control: 'boolean',
      description: '새로고침 버튼 표시',
      defaultValue: true
    },
    searchButtonText: {
      control: 'text',
      description: '조회 버튼 텍스트',
      defaultValue: '조회'
    },
    resetButtonText: {
      control: 'text',
      description: '초기화 버튼 텍스트',
      defaultValue: '초기화'
    },
    showResetButton: {
    control: 'boolean',
    description: '초기화 버튼 표시',
    defaultValue: true
    },
    showSearchButton: {
      control: 'boolean',
      description: '조회 버튼 표시', 
      defaultValue: true
    },
  }
};

// 조회조건 모듈 템플릿
const Template = ({ 
  title, 
  hasUnderline, 
  showRefreshButton, 
  searchButtonText, 
  resetButtonText, 
  searchDisabled, 
  resetDisabled,
  showResetButton,    
  showSearchButton,   
}) => {
  const topcondition = document.createElement('div');
  topcondition.className = hasUnderline ? 'topcondition underlinde' : 'topcondition';
  
  // 제목
  const h2 = document.createElement('h2');
  h2.textContent = title;
  
  // 오른쪽 영역
  const topRight = document.createElement('div');
  topRight.className = 'top-right';
  
  // 새로고침 버튼 (선택적)
  if (showRefreshButton) {
    const btnRefresh = document.createElement('div');
    btnRefresh.className = 'btn-refresh';
    btnRefresh.innerHTML = '';
    topRight.appendChild(btnRefresh);
  }
  
  // 확인 버튼 영역
  const confirmBtn = document.createElement('div');
  confirmBtn.className = 'confirm-btn';
  
  // 초기화 버튼 (조건부로 생성)
  if (showResetButton) {
    const resetButton = document.createElement('button');
    resetButton.className = 'btn btn-reset';
    resetButton.textContent = resetButtonText;
    resetButton.disabled = resetDisabled;
    confirmBtn.appendChild(resetButton);
  }
  
  // 조회 버튼 (조건부로 생성)
  if (showSearchButton) {
    const searchButton = document.createElement('button');
    searchButton.className = 'btn btn-sch';
    searchButton.textContent = searchButtonText;
    searchButton.disabled = searchDisabled;
    confirmBtn.appendChild(searchButton);
  }
  // 조립
  topRight.appendChild(confirmBtn);
  
  topcondition.appendChild(h2);
  topcondition.appendChild(topRight);
  
  return topcondition;
};

// 기본 스토리들
export const 기본모듈 = Template.bind({});
기본모듈.args = {
  title: '조회조건',
  searchButtonText: '조회',
  resetButtonText: '초기화',
  showRefreshButton: false,
  showSearchButton: true , 
  showResetButton: true    
};

export const 언더라인있음 = Template.bind({});
언더라인있음.args = {
  title: '조회조건',
  searchButtonText: '조회',
  resetButtonText: '초기화',
  hasUnderline: true,
  showRefreshButton: false,
  showSearchButton: true , 
  showResetButton: true   
};

export const 새로고침버튼있음 = Template.bind({});
새로고침버튼있음.args = {
  title: '조회조건',
   searchButtonText: '조회',
  resetButtonText: '초기화',
  showRefreshButton: true,
  showSearchButton: true , 
  showResetButton: true   
};



// HTML 코드를 텍스트로 보여주는 스토리
export const HTML코드보기 = () => {
  const container = document.createElement('div');
  
  const htmlCode = `<div class="topcondition">
  <h2>조회조건</h2>
  <div class="top-right">
    <div class="btn-refresh">
      <!-- DevExtreme 새로고침 버튼 -->
    </div>
    <div class="confirm-btn">
      <button class="btn btn-reset">초기화</button>
      <button class="btn btn-sch">조회</button>
    </div>
  </div>
</div>`;

  const pre = document.createElement('pre');
  pre.style.cssText = `
    background: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 15px;
    font-family: 'Courier New', monospace;
    font-size: 14px;
    overflow-x: auto;
    white-space: pre-wrap;
    margin: 0;
  `;
  
  const code = document.createElement('code');
  code.textContent = htmlCode;
  
  pre.appendChild(code);
  container.appendChild(pre);
  
  return container;
};