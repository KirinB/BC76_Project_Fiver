import React from "react";
import BannerHomePage from "./components/BannerHomePage";
import PopularServices from "./components/PopularServices";

const HomePage = () => {
  return (
    <div className="container py-10 space-y-10">
      <BannerHomePage />
      <PopularServices />
    </div>
  );
};

export default HomePage;
