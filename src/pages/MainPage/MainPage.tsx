import React from "react";
import { Header } from "../../components/UI/Header/Header";
import { MainStyle } from "./MainPage.style";
import { LeftSide } from "../../components/LeftSide";
import { RightSide } from "../../components/RightSide";
import { MainContent } from "../../components/MainContent";

export const MainPage = () => {
  return (
    <MainStyle>
      <Header />
      <div className="MainPage">
        <LeftSide />
        <MainContent />
        <RightSide />
      </div>
    </MainStyle>
  );
};
