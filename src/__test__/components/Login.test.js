// jest.config.js
// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
import React from "react";
//import { BrowserRouter as Router } from "react-router-dom";
import { mount } from "enzyme";
import Login from "../../components/containers/Login";

describe("<Login />", () => {
  const login = mount(<Login />);
  test("Render Login", () => {
    expect(login.length).toEqual(1);
  });

  test("Render element", () => {
    expect(login.find("footer").text()).toEqual(
      " Copyright - All rights reserved - Created by Ana Karina Dávila Dávila"
    );
  });
});

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
