import { useReducer, useRef, useState } from "react";
import "./Study.css";

// 1. 초기 데이터 (Mock Data) 정의
// - 앱이 처음 실행될 때 보여줄 기본 연락처 목록입니다.
const mockContacts = [
  {
    id: 0,
    name: "박길동",
    contact: "010-1234-5678",
    relation: "멘토", // 관계 (예: 가족, 친구, 회사 등)
  },
  {
    id: 1,
    name: "오길동",
    contact: "010-9876-5432",
    relation: "본인",
  },
  {
    id: 2,
    name: "홍길동",
    contact: "010-1111-2222",
    relation: "친구",
  },
];

// 2. 리듀서 (Reducer) 함수 정의
// - 상태(state) 변화를 담당하는 함수입니다.
// - state: 현재 상태 (연락처 목록 배열)
// - action: 상태를 어떻게 바꿀지 정보를 담은 객체 (type, data, targetId 등)
function reducer(state, action) {
  switch (action.type) {
    case "CREATE":
      // 새로운 연락처(action.data)를 배열의 맨 앞에 추가합니다.
      return [action.data, ...state];

    case "DELETE":
      // 삭제하려는 아이디(action.targetId)가 아닌 것만 남깁니다 (필터링).
      return state.filter((item) => item.id !== action.targetId);

    // 복습 포인트: '수정' 기능은 데이터의 불변성을 지키면서 특정 아이템만 바꿔야 합니다.
    // map을 사용하여 모든 아이템을 순회하되, 수정할 아이템만 새로운 객체로 교체합니다.
    // 이 예제에서는 간단하게 구현하기 위해 삭제 후 다시 생성하거나 별도 UPDATE를 구현할 수 있지만,
    // 여기서는 삭제 기능만 먼저 구현하고 UPDATE는 심화 과제로 남겨두거나, 아래와 같이 구현할 수 있습니다.
    /*
    case "UPDATE":
      return state.map((item) => 
        item.id === action.targetId 
          ? { ...item, ...action.data } // 기존 데이터(...item)에 새로운 데이터(...action.data)를 덮어씌움
          : item
      );
    */

    default:
      return state;
  }
}

// --------------------------------------------------------------------------
// 3. 자식 컴포넌트: 연락처 입력 폼 (ContactEditor)
// - 새로운 연락처 정보를 입력받아 부모(ContactListApp)에게 전달(onCreate)하는 역할입니다.
// --------------------------------------------------------------------------
const ContactEditor = ({ onCreate }) => {
  // 사용자의 입력을 관리하기 위해 useState를 사용합니다.
  // 여러 개의 입력을 하나의 객체로 관리하면 편리합니다.
  const [input, setInput] = useState({
    name: "",
    contact: "",
    relation: "친구", // 기본 선택값
  });

  // 입력값이 바뀔 때마다 실행되는 함수
  const onChangeInput = (e) => {
    // e.target.name: 변경된 input 태그의 name 속성 (name, contact, relation)
    // e.target.value: 변경된 값
    setInput({
      ...input, // 기존 값들은 유지하고 (불변성 유지)
      [e.target.name]: e.target.value, // 변경된 필드만 업데이트
    });
  };

  // '추가' 버튼 클릭 시 실행되는 함수
  const onSubmit = () => {
    // 빈 값 검사 (간단한 유효성 검사)
    if (input.name === "" || input.contact === "") {
      alert("이름과 연락처를 모두 입력해주세요.");
      return;
    }

    // 부모로부터 받은 onCreate 함수를 호출하여 데이터를 전달합니다.
    onCreate(input.name, input.contact, input.relation);

    // 입력창 초기화
    setInput({
      name: "",
      contact: "",
      relation: "친구",
    });
  };

  return (
    <div className="ContactEditor">
      <h3>새 연락처 추가</h3>
      <div className="editor_item">
        <input
          name="name"
          value={input.name}
          onChange={onChangeInput}
          placeholder="이름"
        />
      </div>
      <div className="editor_item">
        <input
          name="contact"
          value={input.contact}
          onChange={onChangeInput}
          placeholder="연락처 (010-0000-0000)"
        />
      </div>
      <div className="editor_item">
        <select name="relation" value={input.relation} onChange={onChangeInput}>
          <option value="가족">가족</option>
          <option value="친구">친구</option>
          <option value="회사">회사</option>
          <option value="기타">기타</option>
        </select>
      </div>
      <button onClick={onSubmit}>추가하기</button>
    </div>
  );
};

// --------------------------------------------------------------------------
// 4. 자식 컴포넌트: 연락처 아이템 (ContactItem)
// - 리스트의 각 항목을 렌더링하고, 삭제 버튼 클릭 시 부모(ContactList)에게 알리는 역할입니다.
// --------------------------------------------------------------------------
const ContactItem = ({ id, name, contact, relation, onDelete }) => {
  return (
    <div className="ContactItem">
      <div className="info">
        <span className="name">{name}</span>
        <span className="relation">({relation})</span>
        <div className="contact">{contact}</div>
      </div>
      {/* 화살표 함수로 감싸지 않으면 렌더링 될 때 바로 실행되므로 주의! */}
      <button onClick={() => onDelete(id)}>삭제</button>
    </div>
  );
};

// --------------------------------------------------------------------------
// 5. 자식 컴포넌트: 연락처 리스트 (ContactList)
// - 전체 연락처 목록을 받아서 map 함수를 이용해 ContactItem 들을 보여줍니다.
// --------------------------------------------------------------------------
const ContactList = ({ contacts, onDelete }) => {
  return (
    <div className="ContactList">
      <h3>연락처 목록 ({contacts.length}명)</h3>
      <div className="list_wrapper">
        {contacts.map((item) => (
          // 리스트를 렌더링할 때는 반드시 고유한 key prop을 전달해야 합니다.
          <ContactItem key={item.id} {...item} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
};

// --------------------------------------------------------------------------
// 6. 메인 컴포넌트 (ContactListApp)
// - 전체 앱의 레이아웃과 상태 관리를 담당합니다.
// --------------------------------------------------------------------------
const ContactListApp = () => {
  // useReducer(리듀서함수, 초기값) -> [현재상태, 디스패치함수] 반환
  const [contacts, dispatch] = useReducer(reducer, mockContacts);

  // useRef를 사용하여 고유한 ID를 관리합니다.
  // 렌더링과 상관없는 값(ID 등)을 저장할 때 유용합니다.
  const idRef = useRef(3); // mockContacts가 0,1,2를 쓰고 있으므로 3부터 시작

  // 연락처 추가 함수
  const onCreate = (name, contact, relation) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++, // 현재 값을 ID로 쓰고 1 증가시킴
        name,
        contact,
        relation,
      },
    });
  };

  // 연락처 삭제 함수
  const onDelete = (targetId) => {
    dispatch({
      type: "DELETE",
      targetId,
    });
  };

  return (
    <div className="ContactListApp">
      <h2>📒 내 연락처</h2>
      {/* 
        상태를 변화시키는 함수(onCreate, onDelete)는 자식에게 props로 내려줍니다.
        자식 컴포넌트에서 이벤트가 발생하면 이 함수들을 호출하여 부모의 상태를 바꿉니다 (State Lifting).
      */}
      <ContactEditor onCreate={onCreate} />
      <ContactList contacts={contacts} onDelete={onDelete} />
    </div>
  );
};

export default ContactListApp;
