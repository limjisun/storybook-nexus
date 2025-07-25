import './NumberCard.css';

export default {
  title: 'Company/관리자-숫자 카드 모듈',
  parameters: {
    docs: {
      description: {
        component: '통계 숫자를 카드 형태로 보여주는 모듈입니다. 아이콘 유무와 카드 개수를 조절할 수 있습니다.'
      }
    }
  },
  argTypes: {
    cardCount: {
      control: { type: 'range', min: 1, max: 5, step: 1 },
      description: '카드 개수',
      defaultValue: 5
    },
    showIcon: {
      control: 'boolean',
      description: '아이콘 표시',
      defaultValue: false
    },
    containerHeight: {
      control: 'text',
      description: '컨테이너 높이',
      defaultValue: '120px'
    }
  }
};

// 기본 카드 데이터
const defaultCards = [
  {
    title: '실인입호',
    value: '0',
    className: 'enter',
    iconClass: 'ic-receive'
  },
  {
    title: '대기호',
    value: '0',
    className: 'wait',
    iconClass: 'ic-wait'
  },
  {
    title: '응답호',
    value: '0',
    className: 'answered',
    iconClass: 'ic-answer'
  },
  {
    title: '포기호',
    value: '0',
    className: 'abandon',
    iconClass: 'ic-giveup'
  },
  {
    title: '발신호',
    value: '0',
    className: 'outbound',
    iconClass: 'ic-send'
  }
];

// 템플릿
const Template = ({ cardCount, showIcon, containerHeight }) => {
  // 전체 컨테이너
  const numberWrap = document.createElement('div');
  numberWrap.className = 'number_wrap';
  numberWrap.style.height = containerHeight;
  
  const numCall = document.createElement('ul');
  numCall.className = 'num_call';
  
  // 선택된 개수만큼 카드 생성
  for (let i = 0; i < cardCount; i++) {
    const cardData = defaultCards[i] || {
      title: `항목 ${i + 1}`,
      value: '0',
      className: 'default',
      iconClass: 'ic-receive'
    };
    
    const li = document.createElement('li');
    
    // 제목
    const numberTxt = document.createElement('div');
    numberTxt.className = 'number_txt';
    numberTxt.textContent = cardData.title;
    
    // 숫자
    const numberResult = document.createElement('div');
    numberResult.className = `number_result ${cardData.className}`;
    numberResult.textContent = cardData.value;
    
    li.appendChild(numberTxt);
    li.appendChild(numberResult);
    
    // 아이콘 (선택적)
    if (showIcon) {
      const icon = document.createElement('span');
      icon.className = `icon ${cardData.iconClass}`;
      li.appendChild(icon);
    }
    
    numCall.appendChild(li);
  }
  
  numberWrap.appendChild(numCall);
  return numberWrap;
};

// 스토리들
export const 기본_5개카드 = Template.bind({});
기본_5개카드.args = {
  cardCount: 5,
  showIcon: false,
  containerHeight: '100%'
};

export const 아이콘포함_5개카드 = Template.bind({});
아이콘포함_5개카드.args = {
  cardCount: 5,
  showIcon: true,
  containerHeight: '100%'
};

export const 카드1개 = Template.bind({});
카드1개.args = {
  cardCount: 1,
  showIcon: false,
  containerHeight: '100%'
};

export const 카드3개 = Template.bind({});
카드3개.args = {
  cardCount: 3,
  showIcon: false,
  containerHeight: '100%'
};

// HTML 코드 보기
export const HTML코드보기 = () => {
  const container = document.createElement('div');
  
  const htmlCode = `<div class="number_wrap">
  <ul class="num_call">
    <li>
      <div class="number_txt">실인입호</div>
      <div class="number_result enter">0</div>
      <span class="icon ic-receive"></span>
    </li>
    <li>
      <div class="number_txt">대기호</div>
      <div class="number_result wait">0</div>
      <span class="icon ic-wait"></span>
    </li>
    <li>
      <div class="number_txt">응답호</div>
      <div class="number_result answered">0</div>
      <span class="icon ic-answer"></span>
    </li>
    <li>
      <div class="number_txt">포기호</div>
      <div class="number_result abandon">0</div>
      <span class="icon ic-giveup"></span>
    </li>
    <li>
      <div class="number_txt">발신호</div>
      <div class="number_result outbound">0</div>
      <span class="icon ic-send"></span>
    </li>
  </ul>
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
