import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AsyncComponent from "./AsyncComponent";

const user = userEvent.setup();

describe("AsyncComponent", () => {
  it("ボタンをクリックすると非同期処理が実行される", async () => {
    render(<AsyncComponent />);
    // "Initial text"を持つ要素がレンダリングされているか
    expect(screen.getByText("Initial text")).toBeInTheDocument();

    // button要素を取得
    const button = screen.getByRole("button");
    // buttonをクリックする
    await user.click(button);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
    // waitFor関数内に実行したい処理を入力
    await waitFor(
      () => {
        expect(screen.getByText("Updated text")).toBeInTheDocument();
      },
      {
        interval: 50,
        timeout: 3000,
      }
    );
  });
});
