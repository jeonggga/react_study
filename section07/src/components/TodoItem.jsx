import "./TodoItem.css";

// TodoItem 컴포넌트: 할 일 항목 하나를 보여주는 컴포넌트입니다.
// 부모 컴포넌트(List)로부터 할 일 데이터(id, isDone, content, date)와
// 상태 업데이트 함수(onUpdate, onDelete)를 Props로 전달받습니다.
const TodoItem = ({ id, isDone, content, date, onUpdate, onDelete }) => {
  // 체크박스 클릭 시 실행되는 함수입니다.
  // 부모로부터 받은 onUpdate 함수를 호출하여 현재 아이템의 id를 전달합니다.
  const onChangeCheckbox = () => {
    onUpdate(id);
  };

  // 삭제 버튼 클릭 시 실행되는 함수입니다.
  // 부모로부터 받은 onDelete 함수를 호출하여 현재 아이템의 id를 전달합니다.
  const onClickDeleteButton = () => {
    onDelete(id);
  };

  return (
    <div className="TodoItem">
      {/* 완료 여부를 표시하는 체크박스 */}
      {/* readOnly: 사용자가 직접 수정하지 못하게 하고, onChange 이벤트로만 상태를 변경합니다 */}
      <input
        onChange={onChangeCheckbox}
        readOnly
        checked={isDone}
        type="checkbox"
      />
      {/* Todo 내용 렌더링 */}
      <div className="content">{content}</div>
      {/* 날짜 형식 포맷팅 (예: 2024. 1. 1.) */}
      <div className="date">{new Date(date).toLocaleDateString()}</div>
      {/* 삭제 버튼: 클릭 시 항목이 삭제됩니다 */}
      <button onClick={onClickDeleteButton}>삭제</button>
    </div>
  );
};

export default TodoItem;
