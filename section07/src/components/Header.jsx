import "./Header.css";

const Header = () => {
  return (
    <div className="Header">
      <h3>오늘은 📅</h3>
      {/* new Date(): 현재 날짜와 시간 정보를 가진 객체를 생성합니다 */}
      {/* .toDateString(): 날짜 객체를 읽기 쉬운 문자열 형태로 변환합니다 (예: "Mon Jan 01 2024") */}
      <h1>{new Date().toDateString()}</h1>
    </div>
  );
};

export default Header;
