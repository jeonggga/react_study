/* eslint-disable */     // Lint(WARNING 메시지 출력) 끄기 기능

import './App.css';
import { useState } from 'react';



function App() {


  // 현재 화면 상태를 저장하는 state (WELCOME / READ)
const [mode, setMode] = useState('WELCOME');

// 선택된 글의 id를 저장하는 state
const [id, setId] = useState(null);

const [nextId, setNextId] = useState(4);

// 화면에 표시할 글 목록 데이터
const [topics, setTopics] = useState([
  { id: 1, title: 'html', body: 'html is...' },
  { id: 2, title: 'css', body: 'css is...' },
  { id: 3, title: 'javascript', body: 'javascript is...' }
]);

// 조건에 따라 렌더링할 Article 컴포넌트를 담을 변수
let content = null;
let contextControl = null;

// 초기 화면: 환영 페이지
if (mode === 'WELCOME') {
  content = <Article title="Welcome" body="Hello, WEB" />;

// 글을 읽는 화면
} else if (mode === 'READ') {
  // 선택된 글의 제목과 내용을 저장할 변수
  let title, body = null;

  // topics 배열에서 선택된 id와 일치하는 글 찾기
  for (let i = 0; i < topics.length; i++) {
    if (topics[i].id === id) {
      title = topics[i].title; // 선택된 글의 제목
      body = topics[i].body;   // 선택된 글의 내용
    }
  }

  // 선택된 글 내용을 Article 컴포넌트로 렌더링
  content = <Article title={title} body={body} />;
  contextControl = 
  <>
    <li><a href={'/update/'+id} onClick={(event)=>{
      event.preventDefault();
      setMode('UPDATE');
    }}>Update</a></li>
    <li><input type="button" value="Delete" onClick={()=>{
      const newTopics = [];
      for (let i = 0; i < topics.length; i++) {
        if (topics[i].id !== id) {
          newTopics.push(topics[i]);
        }
      }
      setTopics(newTopics);
      setMode('WELCOME');
    }}/></li>
  </>
} else if (mode === 'CREATE') {
  content = <Create onCreate={(_title, _body)=>{
    const newTopic = {id:nextId, title:_title, body:_body};
    const newTopics = [...topics];
    newTopics.push(newTopic);
    setTopics(newTopics);
    setMode('READ');
    setId(nextId);
    setNextId(nextId+1);
  }}></Create>
} else if (mode === 'UPDATE') {
  let title, body = null;
  for (let i = 0; i < topics.length; i++) {
    if (topics[i].id === id) {
      title = topics[i].title; // 선택된 글의 제목
      body = topics[i].body;   // 선택된 글의 내용
    }
  }
  content = <Update title={ title } body={ body } onUpdate={(title, body)=>{
    const newTopics = [...topics];
    const updateTopic = {id:id, title:title, body:body};
    for (let i = 0; i < newTopics.length; i++) {
      if (newTopics[i].id === id) {
        newTopics[i] = updateTopic;
        break;
      }
    }
    setTopics(newTopics);
    setMode('READ');
  }}></Update>
}


  let [title, click] = useState(['남자 코트 추천', '강남 우동 맛집', '파이썬 독학']);
  let [like, add] = useState(0);



  return (  //return 바로 안에는 한 태그(하나의 부모 태그)로만 감싸서 시작해야 함
    <div className="App">
      <div className="black-nav">
        <h4 style={{color : 'yellow', fontSize : '18px'}}>React Blog</h4>
      </div>

      <button
        onClick={() => {
          // 버튼을 클릭했을 때 실행되는 함수

          let copy = [...title];
          // title이라는 state 배열을 직접 수정하면 안 되기 때문에
          // spread 연산자(...)를 사용해서 새로운 배열로 복사

          copy[0] = '여자 코트 추천';
          // 복사한 배열의 첫 번째 요소(인덱스 0)를
          // '여자 코트 추천'이라는 새로운 값으로 변경

          click(copy);
          // 변경된 배열(copy)을 state 변경 함수에 전달
          // → 리액트가 상태 변경을 감지하고 화면을 다시 렌더링함
        }}
      >
        글수정
      </button>

      <div className="list">
        <h4>{ title[0] } <span onClick={()=>{ add(like+1); }}>❤️</span> { like } </h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4>{ title[1] }</h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4>{ title[2] }</h4>
        <p>2월 17일 발행</p>
      </div>
      <Modal></Modal>


      {/* Header 컴포넌트에 title이라는 props로 "REACT" 전달 */}
      <Header title="REACT" onChangeMode={()=>{
        setMode('WELCOME');
        }}></Header>
      {/* onChangeMode 👉 함수 자체를 props로 전달 */}

      <Nav
        topics={ topics }                 // Nav 컴포넌트에 topics라는 props로 topics 배열 전달
        onChangeMode={(_id) => {          // Nav에서 호출할 함수 전달
          setMode('READ');
          setId(_id);
        }}
      ></Nav>

      { content }

      <a href="/create" onClick={(event)=>{
        event.preventDefault();
        setMode('CREATE');
      }}>Create</a>

      { contextControl }

    </div>
  );
}




// 컴포넌트 문법 (function 만들고 return()안에 html담고 <함수명></함수명> 쓰기 (또는 <함수명/>))
function Modal() {
  return (  //return 바로 안에는 한 태그(하나의 부모 태그)로만 감싸서 시작해야 함
    <div className="modal">
        <h4>제목</h4>
        <p>날짜</p>
        <p>상세내용</p>
    </div>
  )
}

// <div></div>
// <div></div>
// 이렇게 return()안에 html 병렬기입하려면 의미없는 <div></div> 대신
// <></> 사용 가능
// 예시
/*
return (
  <>
    <div className="modal">
      <h4>제목</h4>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
    <div></div>
  </>
)
*/



// props는 컴포넌트에 값 전달하는 통로
function Header(props) {
  return (
    <header>
      <h1>
        <a
          href="/"
          onClick={(event) => {
            // a 태그의 기본 동작(페이지 새로고침) 막기
            event.preventDefault();

            // 부모에서 props로 내려준 함수 실행
            props.onChangeMode();
          }}
        >
          {/* 부모에서 전달받은 title 출력 */}
          { props.title }
        </a>
      </h1>
    </header>
  );
}



function Article(props) {
  return (
    <article>
      <h2>{ props.title }</h2>
      { props.body }
    </article>
  )
}




// <Nav topics={topics} />   👉 데이터 전달
// function Nav(props)   👉 전달받기
// props.topics   👉 전달받은 데이터 사용

function Nav(props) {
  // li 태그들을 담아둘 빈 배열 생성
  const lis = [];

  // props로 전달받은 topics 배열의 길이만큼 반복
  for (let i = 0; i < props.topics.length; i++) {
    // topics 배열에서 i번째 객체를 t에 저장
    let t = props.topics[i];

    // li 요소를 생성해서 lis 배열에 추가
    // key는 리액트에서 반복 렌더링 시 필수 (고유값)
    lis.push(
      <li key={ t.id }>
        {/* 클릭 시 /read/아이디 주소로 이동 */}
        <a
          id={ t.id }                     // 각 a 태그에 고유한 id 값 설정 (글의 id)
          href={ '/read/' + t.id }        // 주소창에 보일 경로 (실제 이동은 막을 예정)
          onClick={(event) => {         // 클릭 이벤트 발생 시 실행되는 함수
            event.preventDefault();     // a 태그의 기본 동작(페이지 이동/새로고침) 막기

            // 클릭된 a 태그의 id 값을 가져와서
            // 부모 컴포넌트에서 전달받은 함수로 전달
            props.onChangeMode(Number(event.target.id));
          }}
        >
          {/* 화면에 표시될 제목 */}
          { t.title }
        </a>
      </li>
    );
  }

  // 화면에 보여줄 JSX 반환
  return (
    <nav>
      <ol>
        {/* 위에서 만든 li 목록을 출력 */}
        {lis}
      </ol>
    </nav>
  );
}


function Create(props) {
  return (
    <article>
      <h2>Create</h2>
      <form onSubmit={(event)=>{
        event.preventDefault();
        const title = event.target.title.value;
        const body = event.target.body.value;
        props.onCreate(title, body);
      }}>
        <p><input type="text" name="title" placeholder="title"/></p>
        <p><textarea name="body" placeholder="body"></textarea></p>
        <p><input type="submit" value="Create"></input></p>
      </form>
    </article>
  )
}


function Update(props) {
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  return (
    <article>
      <h2>Update</h2>
      <form onSubmit={(event)=>{
        event.preventDefault();
        const title = event.target.title.value;
        const body = event.target.body.value;
        props.onUpdate(title, body);
      }}>
        <p><input type="text" name="title" placeholder="title" value={ title } onChange={(event)=>{
          setTitle(event.target.value);
        }}/></p>
        <p><textarea name="body" placeholder="body" value={ body } onChange={(event)=>{
          setBody(event.target.value);
        }}></textarea></p>
        <p><input type="submit" value="Update"></input></p>
      </form>
    </article>
  )
}


export default App;

