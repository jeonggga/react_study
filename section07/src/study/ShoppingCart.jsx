import { useReducer, useRef } from "react";
import CartInput from "./CartInput";
import CartList from "./CartList";
import "./Study.css";

// 장바구니 초기 데이터(mock data)를 정의합니다.
const mockCart = [
  {
    id: 0, // 각 아이템의 고유 ID
    name: "기본 상품 1", // 상품명
    price: 1000, // 가격
    quantity: 1, // 수량
    date: new Date().getTime(), // 생성 시간
  },
  {
    id: 1,
    name: "기본 상품 2",
    price: 2000,
    quantity: 2,
    date: new Date().getTime(),
  },
];

// 상태 변화를 처리하는 리듀서(reducer) 함수입니다.
// state: 현재 상태, action: 어떤 작업을 할지 담은 객체
function reducer(state, action) {
  // action.type에 따라 다른 로직을 수행합니다.
  switch (action.type) {
    case "CREATE": // "CREATE" 액션일 때: 새로운 아이템을 추가합니다.
      // 배열의 맨 앞에 새로운 데이터(action.data)를 추가하고, 기존 state를 뒤에 붙여서 반환합니다.
      return [action.data, ...state];

    case "UPDATE_QTY": // "UPDATE_QTY" 액션일 때: 수량을 변경합니다.
      // map 함수를 사용하여 배열의 모든 아이템을 순회하면서 특정 아이템을 찾습니다.
      return state.map((item) => {
        // 현재 순회 중인 아이템의 id가 변경하려는 타겟 id(action.targetId)와 같은지 확인합니다.
        if (item.id === action.targetId) {
          // 같다면, 기존 아이템 내용을 복사(...item)하고 수량(quantity)만 변경한 새 객체를 반환합니다.
          return {
            ...item,
            // 기존 수량에 변화량(delta)을 더해서 새로운 수량을 계산합니다.
            quantity: item.quantity + action.delta,
          };
        }
        // id가 다르다면, 변경 없이 원래 아이템 그대로 반환합니다.
        return item;
      });

    case "DELETE": // "DELETE" 액션일 때: 아이템을 삭제합니다.
      // filter 함수를 사용하여 삭제하려는 id(action.targetId)와 다른 아이템들만 남깁니다.
      // 즉, targetId와 같은 아이템은 배열에서 제외됩니다.
      return state.filter((item) => item.id !== action.targetId);

    default: // 정의되지 않은 액션이 들어오면
      // 현재 상태를 그대로 반환합니다 (변경 없음).
      return state;
  }
}

// ShoppingCart 컴포넌트의 메인 함수입니다.
const ShoppingCart = () => {
  // useReducer를 사용하여 상태(items)와 상태 변경 함수(dispatch)를 만듭니다.
  // 초기값으로 mockCart를 사용합니다.
  const [items, dispatch] = useReducer(reducer, mockCart);

  // 새로운 아이템의 ID를 생성하기 위한 useRef입니다. 초기값은 2부터 시작합니다 (mockData가 0, 1을 사용했으므로).
  const idRef = useRef(2);

  // 새로운 아이템을 생성하는 함수입니다. 상품명(name)과 가격(price)을 인자로 받습니다.
  const onCreate = (name, price) => {
    // dispatch를 호출하여 "CREATE" 액션을 보냅니다.
    dispatch({
      type: "CREATE", // 액션 타입: 생성
      data: {
        id: idRef.current++, // 현재 idRef 값을 id로 사용하고, 값을 1 증가시킵니다.
        name: name, // 상품명
        price: price, // 가격
        quantity: 1, // 초기 수량은 1
        date: new Date().getTime(), // 현재 시간
      },
    });
  };

  // 수량을 변경하는 함수입니다. 대상 아이템 ID(targetId)와 변화량(delta)을 받습니다.
  const onUpdateQty = (targetId, delta) => {
    // dispatch를 호출하여 "UPDATE_QTY" 액션을 보냅니다.
    dispatch({
      type: "UPDATE_QTY", // 액션 타입: 수량 변경
      targetId, // 변경할 아이템의 ID
      delta, // 수량 변화값 (+1 또는 -1)
    });
  };

  // 아이템을 삭제하는 함수입니다. 대상 아이템 ID(targetId)를 받습니다.
  const onDelete = (targetId) => {
    // dispatch를 호출하여 "DELETE" 액션을 보냅니다.
    dispatch({
      type: "DELETE", // 액션 타입: 삭제
      targetId, // 삭제할 아이템의 ID
    });
  };

  return (
    <div className="ShoppingCart">
      <h2>장바구니</h2>
      {/* 상품 입력 컴포넌트: 아이템 생성 함수(onCreate)를 전달합니다. */}
      <CartInput onCreate={onCreate} />

      {/* 상품 목록 컴포넌트: 아이템 목록(items)과 수량 변경/삭제 함수를 전달합니다. */}
      <CartList items={items} onUpdateQty={onUpdateQty} onDelete={onDelete} />
    </div>
  );
};

export default ShoppingCart;
