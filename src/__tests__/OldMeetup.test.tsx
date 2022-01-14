import { mount } from "enzyme";
import { BrowserRouter } from "react-router-dom";
import MeetupsDetails from "../components/meetup/MeetupDetails";

const meetup = [
  {
    id: 2,
    name: "Bok Klubb",
    description:
      "Läs böcker tillsammans med resten av medlemmarna och diskutera bokens innehåll.",
    date: new Date("2021-11-05T18:00:00"),
    image:
      "https://ensueco.com/wp-content/uploads/sites/4/2021/02/89dcc4992a2d555f96d0da8cbe513af6.jpeg",
  },
];

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts
  useParams: () => ({
    id: "2",
  }),
  useRouteMatch: () => ({ url: "/meetup/2" }),
}));

describe("test for /meetup/2.", () => {
  test('Intresse button should not be visible. "The Date For This Event Has Passed" should be rendered.', () => {
    const wrapper = mount(
      <BrowserRouter>
        <MeetupsDetails
          meetups={meetup}
          addToMeetups={jest.fn()}
        ></MeetupsDetails>
      </BrowserRouter>
    );
    expect(wrapper.find('[data-test="intresse-btn"]').length).toBe(0);
    expect(wrapper.find('[data-test="meetup-passed"]').length).toBe(1);
    expect(wrapper.find('[data-test="meetup-passed"]').text()).toEqual(
      expect.stringMatching(/The Date For This Event Has Passed./i)
    );
  });
});
