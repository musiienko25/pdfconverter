import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Input from "./Input";

describe("Input", () => {
  it("renders without crashing", () => {
    render(<Input value="" onChange={() => {}} />);
  });

  it("renders with the provided value", () => {
    const { getByPlaceholderText } = render(
      <Input value="Test value" onChange={() => {}} />
    );
    const input = getByPlaceholderText("Type something...");
    expect(input.value).toBe("Test value");
  });

  it("calls onChange handler when input value changes", () => {
    const onChangeMock = jest.fn();
    const { getByPlaceholderText } = render(
      <Input value="" onChange={onChangeMock} />
    );
    const input = getByPlaceholderText("Type something...");
    fireEvent.change(input, { target: { value: "New value" } });
    expect(onChangeMock).toHaveBeenCalled();
  });
});
