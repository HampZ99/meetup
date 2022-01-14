import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Home from "../components/Home";

const meetup = [
  {
    id: 1,
    name: "Lär dig använda en osthyvel.",
    description: "En kort kurs om hur man använder en osthyvel på rätt sätt.",
    date: new Date("2022-02-10T17:00:00"),
    image:
      "https://www.ikea.com/se/sv/images/products/hjaelpreda-osthyvel-svart__0817263_pe773937_s5.jpg?f=s",
    comments: [],
  },
];

describe("test for homepage", () => {
  test("Render Home Component", () => {
    render(
      <BrowserRouter>
        <Home meetups={meetup}></Home>
      </BrowserRouter>
    );
  });
});
