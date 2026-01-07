import "./Editor.css";
import { useState, useRef } from "react";

const Editor = ({ onCreate }) => {
  // useState: 컴포넌트의 상태(데이터)를 관리하는 훅입니다.
  // content는 현재 입력된 텍스트 값을 저장하고, setContent는 그 값을 변경하는 함수입니다.
  // 초기값은 "" (빈 문자열)입니다.
  const [content, setContent] = useState("");

  // useRef: DOM 요소에 직접 접근하기 위해 사용하는 훅입니다.
  // 여기서는 입력 창(input)에 포커스를 주기 위해 사용합니다.
  const contentRef = useRef();

  // 입력 창의 내용이 변경될 때마다 실행되는 함수입니다.
  // 사용자가 입력한 값을 content 상태(state)에 업데이트합니다.
  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  // 키보드 입력 이벤트를 감지하는 함수입니다.
  // 엔터키(keyCode 13)가 눌리면 onSubmit 함수를 실행하여 todo를 추가합니다.
  const onKeydown = (e) => {
    if (e.keyCode === 13) {
      onSubmit();
    }
  };

  // '추가' 버튼을 클릭하거나 엔터키를 눌렀을 때 실행되는 함수입니다.
  const onSubmit = () => {
    // 입력된 내용이 비어있다면 추가하지 않고 입력 창에 포커스를 줍니다.
    if (content === "") {
      contentRef.current.focus();
      return;
    }
    // 부모 컴포넌트(App)로부터 받은 onCreate 함수를 호출하여 새로운 Todo 데이터를 전달합니다.
    onCreate(content);
    // 입력이 완료된 후 입력 창을 다시 비워줍니다.
    setContent("");
  };

  return (
    <div className="Editor">
      {/* 텍스트 입력 창 */}
      {/* value={content}: 입력 창의 값을 state와 연결합니다 (양방향 바인딩) */}
      {/* onChange={onChangeContent}: 입력 값이 바뀔 때마다 state를 업데이트합니다 */}
      <input
        ref={contentRef}
        value={content}
        onKeyDown={onKeydown}
        onChange={onChangeContent}
        placeholder="새로운 Todo..."
      />
      {/* '추가' 버튼: 클릭 시 onSubmit 함수가 실행됩니다 */}
      <button onClick={onSubmit}>추가</button>
    </div>
  );
};

export default Editor;
