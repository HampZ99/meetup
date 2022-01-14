import { render } from "@testing-library/react";
import MyMeetups from "../components/meetup/MyMeetups";
import { BrowserRouter } from "react-router-dom";

const mockRemoveFromMyMeetups = jest.fn();

const meetup = [
  {
    id: 1,
    name: "Lär dig använda en osthyvel.",
    description: "En kort kurs om hur man använder en osthyvel på rätt sätt.",
    date: new Date("2022-02-10T17:00:00"),
    image:
      "https://www.ikea.com/se/sv/images/products/hjaelpreda-osthyvel-svart__0817263_pe773937_s5.jpg?f=s",
  },
];

describe("tests for my meetups page.", () => {
  test("Should render MyMeetups Component", () => {
    render(
      <BrowserRouter>
        <MyMeetups
          meetups={meetup}
          removeFromMeetups={mockRemoveFromMyMeetups}
        ></MyMeetups>
      </BrowserRouter>
    );
  });
});
