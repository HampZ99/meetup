import { render, screen } from "@testing-library/react";
import MeetupsDetails from "../components/meetup/MeetupDetails";
import { mount, shallow } from "enzyme";
import { BrowserRouter, Link, useParams } from "react-router-dom";

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

const mockAddToMyMeetups = jest.fn();
const mockAddComment = jest.fn();
const comment = "Hello, here comes a test comment";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    id: "1",
  }),
  useRouteMatch: () => ({ url: "/meetup/1" }),
}));

describe("tests for detail view of meetups", () => {
  test("shoulder render MeetupDetails component (Smoke Test).", () => {
    render(
      <BrowserRouter>
        <MeetupsDetails
          meetups={meetup}
          addToMeetups={mockAddToMyMeetups}
        ></MeetupsDetails>
      </BrowserRouter>
    );
  });
  test('Meetup should render the name "Lär dig använda en osthyvel."', () => {
    render(
      <BrowserRouter>
        <MeetupsDetails
          meetups={meetup}
          addToMeetups={mockAddToMyMeetups}
        ></MeetupsDetails>
      </BrowserRouter>
    );
    expect(screen.getByText(meetup[0].name)).toBeInTheDocument();
  });
  test("Meetup should render the description of the meetup.", () => {
    render(
      <BrowserRouter>
        <MeetupsDetails
          meetups={meetup}
          addToMeetups={mockAddToMyMeetups}
        ></MeetupsDetails>
      </BrowserRouter>
    );
    expect(screen.getByText(meetup[0].description)).toBeInTheDocument();
  });
  test("Meetup should render the date of the meetup.", () => {
    render(
      <BrowserRouter>
        <MeetupsDetails
          meetups={meetup}
          addToMeetups={mockAddToMyMeetups}
        ></MeetupsDetails>
      </BrowserRouter>
    );
    expect(screen.getByText(meetup[0].date.toString())).toBeInTheDocument();
  });
  test("Meetup name should be rendered in a h2 element.", () => {
    const wrapper = shallow(
      <MeetupsDetails
        meetups={meetup}
        addToMeetups={mockAddToMyMeetups}
      ></MeetupsDetails>
    );
    expect(wrapper.find('h2[data-test="meetup-name"]').length).toBe(1);
  });
  test("Meetup description should be rendered in a p element.", () => {
    const wrapper = shallow(
      <MeetupsDetails
        meetups={meetup}
        addToMeetups={mockAddToMyMeetups}
      ></MeetupsDetails>
    );
    expect(wrapper.find('p[data-test="meetup-description"]').length).toBe(1);
  });
  test("Meetup date should be rendered in a p element.", () => {
    const wrapper = shallow(
      <MeetupsDetails
        meetups={meetup}
        addToMeetups={mockAddToMyMeetups}
      ></MeetupsDetails>
    );
    expect(wrapper.find('p[data-test="meetup-date"]').length).toBe(1);
  });
  test("Component should render a button element with the text Intresserad", () => {
    const wrapper = mount(
      <BrowserRouter>
        <MeetupsDetails meetups={meetup} addToMeetups={jest.fn()} />
      </BrowserRouter>
    );
    expect(wrapper.find('[data-test="intresse-btn"]').type()).toBe("button");
    expect(wrapper.find('[data-test="intresse-btn"]').text()).toEqual(
      expect.stringMatching(/Intresserad/i)
    );
  });
  test("Check if the div for the meetups have 2 classes that toggles on and off depending on date.", () => {
    const wrapper = mount(
      <BrowserRouter>
        <MeetupsDetails
          meetups={meetup}
          addToMeetups={jest.fn()}
        ></MeetupsDetails>
      </BrowserRouter>
    );
    expect(
      wrapper
        .find('[data-test="datepassed-div"]')
        .hasClass("datePassed" && "content")
    );
  });
  test("Renders two text input fields.", () => {
    const wrapper = shallow(
      <MeetupsDetails meetups={meetup} addToMeetups={jest.fn()} />
    );
    expect(wrapper.find('[data-test="textfield"]').length).toBe(2);
  });
  test("Renders a button to add a comment", () => {
    const wrapper = shallow(
      <MeetupsDetails meetups={meetup} addToMeetups={jest.fn()} />
    );
    expect(wrapper.find('button[data-test="addCommentBtn"]').length).toBe(1);
  });
  test("Should add 1 comment, when Click on add button", () => {
    const wrapper = mount(
      <MeetupsDetails meetups={meetup} addToMeetups={jest.fn()} />
    );
    const btn = wrapper.find('button[data-test="addCommentBtn"]');

    btn.simulate("click");
    setTimeout(() => {
      expect(mockAddComment.mock.calls.length).toBe(1);
      expect(mockAddComment.mock.calls[0][0]).toEqual(comment);
    }, 1000);
  });
});
