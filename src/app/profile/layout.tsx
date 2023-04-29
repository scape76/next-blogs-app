import { FC } from "react";

import { Icons } from "@/components/icons";
import AsideItem from "@/components/aside-item";

interface layoutProps {
  children: React.ReactNode;
}

const asideProps = [
  {
    Icon: Icons.post,
    title: "Your posts",
    path: "/profile",
  },
  {
    Icon: Icons.settings,
    title: "Settings",
    path: "/profile/settings",
  },
];

const layout: FC<layoutProps> = ({ children }) => {
  return (
    <div className="w-full container grid md:grid-cols-[200px_1fr] max-w-5xl gap-x-4 ">
      <aside className="flex flex-col gap-y-2">
        {asideProps.map((el) => (
          <AsideItem title={el.title} Icon={el.Icon} key={el.title} />
        ))}
      </aside>
      {children}
    </div>
  );
};

export default layout;
