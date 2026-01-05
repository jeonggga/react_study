import "./Study.css";

// CartItem 컴포넌트: 개별 상품 아이템 하나를 보여줍니다.
// props로 id(아이디), name(상품명), price(가격), quantity(수량), onUpdateQty(수량 변경 함수), onDelete(삭제 함수)를 받습니다.
const CartItem = ({ id, name, price, quantity, onUpdateQty, onDelete }) => {
  return (
    <div className="CartItem">
      {/* 상품 정보 영역 (이름, 가격) */}
      <div className="info">
        <div className="name">{name}</div>
        {/* 가격을 천 단위로 콤마를 찍어서 표시합니다. */}
        <div className="price">{price.toLocaleString()}원</div>
      </div>

      {/* 동작 버튼 영역 (수량 조절, 삭제) */}
      <div className="actions">
        {/* 수량 감소(-) 버튼 */}
        <button
          className="qty-btn"
          onClick={() => onUpdateQty(id, -1)} // 클릭 시 수량을 -1만큼 변경(감소)시킵니다.
        >
          -
        </button>

        {/* 현재 수량 표시 */}
        <span className="quantity">{quantity}</span>

        {/* 수량 증가(+) 버튼 */}
        <button
          className="qty-btn"
          onClick={() => onUpdateQty(id, 1)} // 클릭 시 수량을 +1만큼 변경(증가)시킵니다.
        >
          +
        </button>

        {/* 삭제 버튼 */}
        <button
          className="delete-btn"
          onClick={() => onDelete(id)} // 클릭 시 해당 아이템을 삭제합니다.
        >
          삭제
        </button>
      </div>
    </div>
  );
};

export default CartItem;
