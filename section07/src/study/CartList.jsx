import CartItem from "./CartItem";
import "./Study.css";

// CartList 컴포넌트: 장바구니에 담긴 아이템 목록을 보여줍니다.
// props로 items(상품 목록 배열), onUpdateQty(수량 변경 함수), onDelete(삭제 함수)를 받습니다.
const CartList = ({ items, onUpdateQty, onDelete }) => {
  // 총 수량을 저장할 변수를 0으로 초기화합니다.
  let totalQty = 0;
  // 총 금액을 저장할 변수를 0으로 초기화합니다.
  let totalPrice = 0;

  // items 배열에 들어있는 모든 아이템을 하나씩 꺼내면서 반복합니다 (forEach).
  items.forEach((item) => {
    // 현재 아이템의 수량(quantity)을 총 수량(totalQty)에 더합니다.
    totalQty += item.quantity;
    // 현재 아이템의 가격(price)과 수량(quantity)을 곱해서 총 금액(totalPrice)에 더합니다.
    totalPrice += item.price * item.quantity;
  });

  return (
    <div className="CartList">
      {/* 상단 요약 영역: 총 수량과 총 금액을 보여줍니다. */}
      <div className="summary">
        <div>총 수량: {totalQty}개</div>
        {/* toLocaleString() 함수는 숫자를 보기 좋게 콤마(,)를 찍어서 문자열로 바꿔줍니다 (예: 1000 -> 1,000) */}
        <div>총 금액: {totalPrice.toLocaleString()}원</div>
      </div>

      {/* 아이템 목록 영역 */}
      <div className="list_wrapper">
        {/* map 함수를 사용하여 items 배열의 각 아이템을 CartItem 컴포넌트로 변환합니다. */}
        {items.map((item) => (
          <CartItem
            key={item.id} // 리스트를 렌더링할 때는 고유한 key가 반드시 필요합니다.
            {...item} // item 객체의 모든 속성(id, name, price, quantity 등)을 props로 전달합니다 (Spread 연산자).
            onUpdateQty={onUpdateQty} // 수량 변경 함수 전달
            onDelete={onDelete} // 삭제 함수 전달
          />
        ))}
      </div>
    </div>
  );
};

export default CartList;
