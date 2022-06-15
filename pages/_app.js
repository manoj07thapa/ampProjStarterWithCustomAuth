import "../styles/globals.css";
import "../amplifyConfig";
import { Fragment, useState, useEffect } from "react";
import { Auth, Hub } from "aws-amplify";

import Navbar from "../components/headers/Navbar";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(false);
  const [event, setEvent] = useState("");

  // useEffect(() => {
  //   Hub.listen("auth", (data) => {
  //     const event = data.payload.event;

  //     if (event === "signIn") {
  //       setUser(true);
  //     }
  //     if (event === "signOut") {
  //       setUser(false);
  //     }
  //   });
  // }, []);
  return (
    <Fragment>
      <Navbar />
      <Component {...pageProps} />;
    </Fragment>
  );
}

export default MyApp;
