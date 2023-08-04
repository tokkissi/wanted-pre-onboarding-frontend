import NavBar from "./NavBar";

export default function Header() {
  return (
    <header className="sticky top-0 bg-white z-10">
      <h1 className="text-lg text-center font-bold py-3">
        토끼씨의 프리온보딩 사전과제
      </h1>
      <NavBar />
    </header>
  );
}
