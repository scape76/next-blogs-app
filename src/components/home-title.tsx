import * as React from "react";

import TranslatedText from "./translation/translated-text";

interface HomeTitleProps {}

const HomeTitle: React.FC<HomeTitleProps> = ({}) => {
  return (
    <div>
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-[1.1] mt-4">
        <TranslatedText tPath="home.title"/>
      </h1>
      <p className="font-semibold text-xl text-muted-foreground mt-2">
      <TranslatedText tPath="home.subtitle"/>
      </p>
    </div>
  );
};

export default HomeTitle;
