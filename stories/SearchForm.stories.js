import './SearchForm.css';

export default {
  title: 'Company/관리자-검색 조건 폼',
  parameters: {
    docs: {
      description: {
        component: '기본 검색 폼입니다. 타이틀과 검색 필드 개수를 조절할 수 있습니다.'
      }
    }
  },
  argTypes: {
    title: {
      control: 'text',
      description: '제목 텍스트',
      defaultValue: 'Resource Boundary (라우트/큐)'
    },
    fieldCount: {
      control: { type: 'range', min: 1, max: 6, step: 1 },
      description: '검색 필드 개수',
      defaultValue: 5
    },
     hasSecondTitle: {
    control: 'boolean',
    description: '두 번째 title-data 쌍 추가',
    defaultValue: false
  },
   secondTitle: {
    control: 'text',
    description: '두 번째 제목 텍스트',
    defaultValue: '테넌트'
  },
  secondFieldCount: {
    control: { type: 'range', min: 1, max: 3, step: 1 },
    description: '두 번째 영역 필드 개수',
    defaultValue: 1
  }
  }
};

// 검색 필드 생성 함수
const createSearchField = (index) => {
  const li = document.createElement('li');
  li.id = `search_field_${index}`;
  
  // DevExtreme 컴포넌트 자리 표시용 텍스트
  li.textContent = `[검색필드 ${index}]`;
  li.style.cssText = `
    background: #f0f8ff;
    border: 1px dashed #ccc;
    text-align: center;
    font-size: 12px;
    color: #666;
    border-radius: 2px;
    height: 26px;
    line-height: 10px;
  `;
  
  return li;
};

// 템플릿
const Template = ({ title, fieldCount,hasSecondTitle, secondTitle, secondFieldCount }) => {
  // data-area 추가
  const dataArea = document.createElement('div');
  dataArea.className = 'data-area';

  // 전체 컨테이너
  const schSet = document.createElement('div');
  schSet.className = 'sch-set';
  
  // 라인
  const line = document.createElement('div');
  line.className = 'line';
  
  // 타이틀
  const titleDiv = document.createElement('div');
  titleDiv.className = 'title';
  titleDiv.textContent = title;
  
  // 데이터 영역
  const data = document.createElement('div');
  data.className = 'data';
  
  const ul = document.createElement('ul');
  
  // 필드 개수만큼 li 생성
  for (let i = 1; i <= fieldCount; i++) {
    ul.appendChild(createSearchField(i));
  }
  
  // 조립
  data.appendChild(ul);
  line.appendChild(titleDiv);
  line.appendChild(data);
  schSet.appendChild(line);
  dataArea.appendChild(schSet);

  // 두 번째 title-data 쌍 (선택적)
  if (hasSecondTitle) {
    // 두 번째 타이틀 (mgl17 클래스 추가)
    const secondTitleDiv = document.createElement('div');
    secondTitleDiv.className = 'title mgl17';
    secondTitleDiv.textContent = secondTitle;

   secondTitleDiv.title = '두번째 타이틀에 mgl17 클래스가 적용됩니다';
    
    // 두 번째 데이터 영역
    const secondData = document.createElement('div');
    secondData.className = 'data';
    
    const secondUl = document.createElement('ul');
    
    // 두 번째 필드들 생성
    for (let i = 1; i <= secondFieldCount; i++) {
      const li = document.createElement('li');
      li.id = `second_field_${i}`;
      li.textContent = `[두번째필드 ${i}]`;
      li.style.cssText = `
        background: #fff8dc;
        border: 1px dashed #ccc;
        text-align: center;
        font-size: 12px;
        color: #666;
        border-radius: 2px;
        height: 26px;
        line-height: 10px;
      `;
      secondUl.appendChild(li);
    }
    
    secondData.appendChild(secondUl);
    line.appendChild(secondTitleDiv);
    line.appendChild(secondData);
  }
  
  return dataArea;

  
};

// 스토리들
export const 기본폼 = Template.bind({});
기본폼.args = {
  title: '라우트/큐',
  fieldCount: 5
};

export const 두개영역 = Template.bind({});
두개영역.args = {
  title: '센터',
  fieldCount: 1,
  hasSecondTitle: true,
  secondTitle: '테넌트',
  secondFieldCount: 1
};

// HTML 코드 보기
export const HTML코드보기 = () => {
  const container = document.createElement('div');
  
  const htmlCode = `<div class="sch-set">
  <div class="line">
    <div class="title">Resource Boundary (라우트/큐)</div>
    <div class="data">
      <ul>
        <li id="search_field_1"><!-- DevExtreme 필드1 --></li>
        <li id="search_field_2"><!-- DevExtreme 필드2 --></li>
        <li id="search_field_3"><!-- DevExtreme 필드3 --></li>
        <li id="search_field_4"><!-- DevExtreme 필드4 --></li>
        <li id="search_field_5"><!-- DevExtreme 필드5 --></li>
      </ul>
    </div>
    <div class="title mgl17">Resource Boundary (라우트/큐)</div>
    <div class="data">
      <ul>
        <li id="search_field_1"><!-- DevExtreme 필드1 --></li>
        <li id="search_field_2"><!-- DevExtreme 필드2 --></li>
        <li id="search_field_3"><!-- DevExtreme 필드3 --></li>
        <li id="search_field_4"><!-- DevExtreme 필드4 --></li>
        <li id="search_field_5"><!-- DevExtreme 필드5 --></li>
      </ul>
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