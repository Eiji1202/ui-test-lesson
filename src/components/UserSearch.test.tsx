import axios from "axios";
import { UserSearch } from "./UserSearch";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();

jest.mock("axios");
const mockAxios = jest.mocked(axios);

describe("UserSearch", () => {
  beforeEach(() => {
    // 各テスト前にリセット
    mockAxios.get.mockReset();
  });

  it("入力フォームに入力した内容でAPIリクエストが送信される", async () => {
    const userInfo = {
      id: 1,
      name: "Eiji",
    };
    const res = { data: userInfo };
    mockAxios.get.mockResolvedValue(res);

    render(<UserSearch />);

    // textbox要素を取得
    const input = screen.getByRole("textbox");
    // textboxにuserInfo.nameを入力する
    await user.type(input, userInfo.name);
    // button要素を取得
    const button = screen.getByRole("button");
    // buttonをクリック
    await user.click(button);

    // 意図するAPIリクエストが送信されたか検証
    expect(mockAxios.get).toHaveBeenCalledWith(`/api/users?query=${userInfo.name}`);
  });

  it("APIから取得したユーザー情報が画面に表示される", async () => {
    const userInfo = {
      id: 1,
      name: "Eiji",
    };
    const res = { data: userInfo };
    mockAxios.get.mockResolvedValue(res);

    render(<UserSearch />);

    // textbox要素を取得
    const input = screen.getByRole("textbox");
    // textboxにuserInfo.nameを入力する
    await user.type(input, userInfo.name);
    // button要素を取得
    const button = screen.getByRole("button");
    // buttonをクリック
    await user.click(button);
    // userInfo.nameが画面表示されるまで待つ
    await waitFor(() => expect(screen.getByText(userInfo.name)).toBeInTheDocument());
  });
});
