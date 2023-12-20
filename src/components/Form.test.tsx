import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Form from "./Form";

const user = userEvent.setup();

describe("From", () => {
  it("初期状態ではテキストは空欄", () => {
    render(<Form />);
    // placeholderのテキストが"Enter text"の要素を取得
    const input = screen.getByPlaceholderText("Enter text");
    // inputがレンダリングされているか
    expect(input).toBeInTheDocument();
    // textは""かどうか
    expect(input).toHaveTextContent("");
  });

  it("入力したテキストがサブミットされる", async () => {
    const alertSpy = jest.spyOn(window, "alert").mockReturnValue();
    render(<Form />);
    // placeholderのテキストが"Enter text"の要素を取得
    const input = screen.getByPlaceholderText("Enter text");
    /**
     * 第一引数に属性を、第二引数に渡したいテキストを入力することで、
     * input属性に渡したテキストが入力された状態になる
     */
    await user.type(input, "Test Text");
    // 渡されたテキストが存在するか
    expect(screen.getByDisplayValue("Test Text")).toBeInTheDocument();

    const button = screen.getByRole("button");
    // button要素をクリックする
    await user.click(button);
    // アラートに指定した文字列が表示されているか確認
    expect(alertSpy).toHaveBeenCalledWith("submitted: Test Text");
    // アラートをリセット
    alertSpy.mockRestore();
  });
});
