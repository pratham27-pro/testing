// test if the user's name is rendered in the dom
// check if the button is rendered for admin users
// check if the button is not rendered for non-admin users

import React from "react";
import { render, screen } from "@testing-library/react";
import Useraccount from "../../src/components/UserAccount";
import type { User } from "../../src/entities";

describe("UserAccount", () => {
  it("should render the user's name", () => {
    const user: User = { id: 1, name: "Pratham", isAdmin: false };
    render(<Useraccount user={user} />);
    expect(screen.getByText(user.name)).toBeInTheDocument();
  });

  it("should render the edit button for admin users", () => {
    const admin: User = { id: 2, name: "Admin", isAdmin: true };
    render(<Useraccount user={admin} />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/edit/i);
  });

  it("should render the edit button for admin users", () => {
    const regular: User = { id: 2, name: "Admin", isAdmin: true };
    render(<Useraccount user={regular} />);

    const button = screen.queryByRole("button");
    expect(button).not.toBeInTheDocument();
  });
});
