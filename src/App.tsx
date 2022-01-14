import React from "react";
import { Meetup } from "./models/meetups";
import {
  NavLink,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { useState } from "react";
import Home from "./components/Home";
import MeetupsDetails from "./components/meetup/MeetupDetails";
import MyMeetups from "./components/meetup/MyMeetups";

function App() {
  const [meetupItems, setMeetupItems] = useState<object[]>([]);
  const meetups: Meetup[] = [
    {
      id: 1,
      name: "Lär dig använda en osthyvel.",
      description: "En kort kurs om hur man använder en osthyvel på rätt sätt.",
      date: new Date("2022-02-10T17:00:00"),
      image:
        "https://www.ikea.com/se/sv/images/products/hjaelpreda-osthyvel-svart__0817263_pe773937_s5.jpg?f=s",
    },
    {
      id: 2,
      name: "Bok Klubb",
      description:
        "Läs böcker tillsammans med resten av medlemmarna och diskutera bokens innehåll.",
      date: new Date("2021-11-05T18:00:00"),
      image:
        "https://ensueco.com/wp-content/uploads/sites/4/2021/02/89dcc4992a2d555f96d0da8cbe513af6.jpeg",
    },
    {
      id: 3,
      name: "Laga mat med sprit.",
      description:
        "Lär dig laga mat med olika sorters sprit, så som vodka, tequila och whisky.",
      date: new Date("2022-01-19T20:00:00"),
      image:
        "https://st2.depositphotos.com/1063437/11841/i/600/depositphotos_118415246-stock-photo-bottles-of-assorted-hard-liquor.jpg",
    },
    {
      id: 4,
      name: "Blåbärsplockning.",
      description:
        "Plocka blåbär i skogen. Den som plockat mest vinner en gurka.",
      date: new Date("2022-04-05T08:00:00"),
      image: "https://c7.staticflickr.com/8/7521/28272926414_23cc94d888_h.jpg",
    },
    {
      id: 5,
      name: "Lär dig teckenspråk.",
      description: "Kvällskurs för att lära sig teckenspråk.",
      date: new Date("2022-03-01T19:00:00"),
      image:
        "https://www.funka.com/contentassets/f4285c4b7f5343b0a1be011f996b85a8/teckensprak-utbildning-hander_1280.jpg?width=1120&quality=80&scale=both",
    },
  ];
  const sortedMeetups = meetups
    .slice()
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .reverse();

  function addMeetupToMyMeetups(meetup: Object) {
    setMeetupItems((meetupItems) => [...meetupItems, meetup]);
  }
  function removeMeetupFromMyMeetups(array_index: number) {
    let tmp_array: Object[] = [];

    //Add items that doesnt match the array index
    meetupItems.map((item, index) => {
      if (index !== array_index) {
        tmp_array.push(item);
      }
      return tmp_array;
    });
    return setMeetupItems(tmp_array);
  }
  return (
    <div className="App">
      <Router>
        <header>
          <h1>Meetup Spot</h1>
          <br />
          <nav>
            <NavLink to="/">
              <h3>Home</h3>
            </NavLink>
            <NavLink to="/mymeetups">
              <h3>My Meetups - {meetupItems.length}</h3>
            </NavLink>
          </nav>
        </header>
        <div>
          <Routes>
            <Route path="/" element={<Home meetups={sortedMeetups} />}></Route>
            <Route
              path="/meetup/:id"
              element={
                <MeetupsDetails
                  meetups={meetups}
                  addToMeetups={addMeetupToMyMeetups}
                />
              }
            ></Route>
            <Route
              path="/mymeetups"
              element={
                <MyMeetups
                  meetups={meetupItems}
                  removeFromMeetups={removeMeetupFromMyMeetups}
                />
              }
            ></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
