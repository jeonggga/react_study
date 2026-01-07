import "./List.css";
import TodoItem from "./TodoItem";
import { useState } from "react";

const List = ({ todos, onUpdate, onDelete }) => {
  // 사용자가 입력하는 검색어를 저장하기 위한 State입니다.
  const [search, setSearch] = useState("");

  // 검색어 입력 칸의 값이 바뀔 때마다 실행되어 search State를 업데이트합니다.
  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  // 검색어(search)에 따라 Todo 리스트를 필터링하는 함수입니다.
  const getFilteredData = () => {
    // 검색어가 비어있다면 모든 Todo를 그대로 반환합니다.
    if (search === "") {
      return todos;
    }
    // 검색어가 있다면, Todo의 내용(content)에 검색어가 포함된 항목만 걸러냅니다.
    // toLowerCase()를 사용하여 대소문자 구분 없이 검색할 수 있게 합니다.
    return todos.filter((todo) =>
      todo.content.toLowerCase().includes(search.toLowerCase())
    );
  };

  // 필터링된 결과(배열)를 변수에 저장합니다.
  const filteredTodos = getFilteredData();

  return (
    <div className="List">
      <h4>Todo List 🌱</h4>
      {/* 검색어 입력 필드 */}
      {/* value와 onChange를 연결하여 양방향 바인딩을 구현했습니다. */}
      <input
        value={search}
        onChange={onChangeSearch}
        placeholder="검색어를 입력하세요"
      />
      <div className="todos_wrapper">
        {/* map 함수를 사용하여 배열(filteredTodos)의 각 요소를 순회하며 렌더링합니다. */}
        {filteredTodos.map((todo) => {
          return (
            // 각 항목을 렌더링할 때는 고유한 key props가 반드시 필요합니다.
            // {...todo}는 todo 객체의 모든 속성(id, isDone, content, date 등)을 props로 전달합니다.
            <TodoItem
              key={todo.id}
              {...todo}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          );
        })}
      </div>
    </div>
  );
};

export default List;
