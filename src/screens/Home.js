import React from "react";

import Profile from "../components/Profile/ProfileCard";
import contactData from "../backend/data.json";

const Home = () => <Profile {...contactData} />;

export default Home;
