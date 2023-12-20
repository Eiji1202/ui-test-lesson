import { act, renderHook } from "@testing-library/react";
import useCounter from "./useCounter";

describe("useCounter", () => {
  it("increment", () => {
    // renderHook内に検証したい関数を渡す
    const { result } = renderHook(() => useCounter(1));
    expect(result.current.count).toBe(1);

    // stateの更新を行う
    act(() => result.current.increment());
    expect(result.current.count).toBe(2);
  });
});
