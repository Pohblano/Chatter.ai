import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ChatMessage } from "../Messages";

test("loads and displays greeting", async () => {
  const checkAuthor = (_) => "ai";
  const entry = { content: "test content", author_type: "test author type" };
  render(<ChatMessage checkAuthor={checkAuthor} entry={entry} />);
  expect(screen.getByText("test author type")).toBeInTheDocument();
});
