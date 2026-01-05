import { useRef, useState } from "react";
import "./Study.css";

// CartInput 컴포넌트를 선언합니다. onCreate라는 함수를 부모(ShoppingCart)로부터 props로 받습니다.
const CartInput = ({ onCreate }) => {
  // 사용자가 입력한 상품명(name)을 저장할 state입니다. 초기값은 빈 문자열("")입니다.
  const [name, setName] = useState("");
  // 사용자가 입력한 가격(price)을 저장할 state입니다. 초기값은 빈 문자열("")입니다.
  const [price, setPrice] = useState("");

  // 상품명 입력창에 포커스를 주기 위해 useRef를 사용합니다.
  const nameRef = useRef();
  // 가격 입력창에 포커스를 주기 위해 useRef를 사용합니다.
  const priceRef = useRef();

  // "추가" 버튼을 클릭하거나 엔터키를 쳤을 때 실행될 함수입니다.
  const onSubmit = () => {
    // 1. 상품명(name)이 비어있는지 검사합니다.
    if (name === "") {
      // 비어있다면 상품명 입력창에 포커스를 줍니다.
      nameRef.current.focus();
      // 함수를 종료합니다 (더 이상 진행하지 않음).
      return;
    }

    // 2. 가격(price)이 비어있거나(!price), 0보다 작거나 같은지(price <= 0) 검사합니다.
    if (!price || price <= 0) {
      // 문제가 있다면 가격 입력창에 포커스를 줍니다.
      priceRef.current.focus();
      // 함수를 종료합니다.
      return;
    }

    // 3. 부모 컴포넌트로부터 받은 onCreate 함수를 호출하여 데이터를 전달합니다.
    // 가격(price)은 문자열일 수 있으므로 Number()를 사용하여 숫자로 변환합니다.
    onCreate(name, Number(price));

    // 4. 입력이 완료되었으므로 입력창을 초기화합니다.
    setName(""); // 상품명 state를 빈 문자열로 초기화
    setPrice(""); // 가격 state를 빈 문자열로 초기화

    // 다음 입력을 위해 상품명 입력창에 다시 포커스를 줍니다.
    nameRef.current.focus();
  };

  // 키보드 입력을 감지하는 함수입니다.
  const onKeyDown = (e) => {
    // 사용자가 누른 키(e.key)가 "Enter"키인지 확인합니다.
    if (e.key === "Enter") {
      // 엔터키라면 onSubmit 함수를 실행하여 아이템을 추가합니다.
      onSubmit();
    }
  };

  return (
    <div className="CartInput">
      {/* 상품명을 입력받는 input 태그입니다. */}
      <input
        ref={nameRef} // 포커스 제어를 위해 nameRef를 연결합니다.
        value={name} // input의 값은 name state와 동기화됩니다 (양방향 바인딩).
        onChange={(e) => setName(e.target.value)} // 사용자가 입력할 때마다 setName을 통해 state를 업데이트합니다.
        onKeyDown={onKeyDown} // 키를 누를 때마다 onKeyDown 함수가 실행됩니다 (엔터키 확인용).
        placeholder="상품명" // 입력창이 비어있을 때 보여줄 힌트 텍스트입니다.
      />

      {/* 가격을 입력받는 input 태그입니다. */}
      <input
        ref={priceRef} // 포커스 제어를 위해 priceRef를 연결합니다.
        value={price} // input의 값은 price state와 동기화됩니다.
        onChange={(e) => setPrice(e.target.value)} // 입력 시 price state를 업데이트합니다.
        type="number" // 숫자만 입력할 수 있도록 타입을 number로 설정합니다.
        placeholder="가격" // 입력창 힌트 텍스트입니다.
        onKeyDown={onKeyDown} // 엔터키 입력을 처리합니다.
      />

      {/* 추가 버튼입니다. 클릭 시 onSubmit 함수가 실행됩니다. */}
      <button onClick={onSubmit}>추가</button>
    </div>
  );
};

export default CartInput;
