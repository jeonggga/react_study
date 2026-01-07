import { useReducer } from "react";

// reducer: 변환기
// -> 상태를 실제로 변화시키는 변환기 역할
function reducer(state, action) {
  //   if (action.type === "INCREASE") {
  //     return state + action.data;
  //   } else if (action.type === "DECREASE") {
  //     return state - action.data;
  //   }

  // 액션 타입이 많아질 것 같은 경우에는 if문이 아니라 switch문으로 하는 것이 일반적임
  switch (action.type) {
    case "INCREASE":
      return state + action.data;
    case "DECREASE":
      return state - action.data;
    default:
      return state;
  }
}

const Exam = () => {
  // dispatch 발송하다, 급송하다
  // -> 상태 변화가 있어야 한다는 사실을 알리는, 발송하는 함수
  // useReducer: 상태 관리를 위해 사용하는 훅입니다. (useState의 대체제)
  // reducer: 상태를 실제로 변화시키는 함수 (위에서 정의함)
  // 0: 상태의 초기값
  const [state, dispatch] = useReducer(reducer, 0);

  const onClickPlus = () => {
    // 인수: 상태가 어떻게 변화되길 원하는지
    // -> 액션 객체 (type: 작업 종류, data: 필요한 데이터)
    // dispatch를 호출하면 reducer 함수가 실행되고, 액션 객체가 전달됩니다.
    dispatch({
      type: "INCREASE",
      data: 1,
    });
  };

  const onClickMinus = () => {
    // 'DECREASE'라 타입을 가진 액션을 발행하여 상태를 1 감소시킵니다.
    dispatch({
      type: "DECREASE",
      data: 1,
    });
  };

  return (
    <div>
      {/* 현재 상태(state) 값을 화면에 출력합니다 */}
      <h1>{state}</h1>
      {/* 버튼 클릭 시 각각의 이벤트 핸들러가 실행됩니다 */}
      <button onClick={onClickPlus}>+</button>
      <button onClick={onClickMinus}>-</button>
    </div>
  );
};

export default Exam;
