import "./TodoItem.css";

const TodoItem = () => {
  return (
    <div className="TodoItem">
      <input type="checkbox" />
      <div className="content">Todo...</div>
      <div className="date">Date</div>
      <botton className="delete">삭제</botton>
    </div>
  );
};

export default TodoItem;
