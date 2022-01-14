import { mount } from "enzyme";
import Home from "../components/Home";
import { BrowserRouter } from "react-router-dom";

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
  {
    id: 5,
    name: "Lär dig teckenspråk.",
    description: "Kvällskurs för att lära sig teckenspråk.",
    date: new Date("2022-03-01T19:00:00"),
    image:
      "https://www.funka.com/contentassets/f4285c4b7f5343b0a1be011f996b85a8/teckensprak-utbildning-hander_1280.jpg?width=1120&quality=80&scale=both",
    comments: [],
  },
];
describe("Test för sökning av meetups.", () => {
  test('Search for "Lär" should render 2 meetups.', () => {
    const wrapper = mount(
      <BrowserRouter>
        <Home meetups={meetup}></Home>
      </BrowserRouter>
    );
    const searchText = "Lär";
    const searchField = wrapper.find('[data-test="searchMeetup"]');

    searchField.simulate("change", { target: { value: searchText } });
    expect(wrapper.find('[data-test="resultMeetup"]').length).toBe(2);
  });
  test('Search for "lÄr" should render 2 meetups. (Case Insensitive Search).', () => {
    const wrapper = mount(
      <BrowserRouter>
        <Home meetups={meetup}></Home>
      </BrowserRouter>
    );
    const searchText = "lÄr";
    const searchField = wrapper.find('[data-test="searchMeetup"]');

    searchField.simulate("change", { target: { value: searchText } });
    expect(wrapper.find('[data-test="resultMeetup"]').length).toBe(2);
  });
  test('Search for "asdf" should render 0 meetups.', () => {
    const wrapper = mount(
      <BrowserRouter>
        <Home meetups={meetup}></Home>
      </BrowserRouter>
    );
    const searchText = "asdf";
    const searchField = wrapper.find('[data-test="searchMeetup"]');

    searchField.simulate("change", { target: { value: searchText } });
    expect(wrapper.find('[data-test="resultMeetup"]').length).toBe(0);
  });
});
