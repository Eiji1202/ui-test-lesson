import { render, screen } from "@testing-library/react";
import Button from "./Button";

describe("Button", () => {
  it("buttonタグがレンダリングされる", () => {
    render(<Button label='ボタン' onClick={() => alert("クリック")} />);

    // buttonタグを取得
    const element = screen.getByRole("button");
    // elementがレンダリングされてるか
    expect(element).toBeInTheDocument();
    // 引数に渡した文字列がDOM内に存在するか
    expect(element).toHaveTextContent("ボタン");
  });
});
