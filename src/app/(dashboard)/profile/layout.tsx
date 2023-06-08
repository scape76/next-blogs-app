import { FC } from "react";

import { Icons } from "@/components/icons";
import AsideItem from "@/components/aside-item";

interface layoutProps {
  children: React.ReactNode;
}

const asideProps = [
  {
    Icon: Icons.post,
    tPath: "profile.aside-items.posts",
    path: "/profile",
  },
  {
    Icon: Icons.group,
    tPath: "profile.aside-items.collaboration",
    path: "/profile/collaboration",
  },
  {
    Icon: Icons.course,
    tPath: "profile.aside-items.courses",
    path: "/profile/courses",
  },
  {
    Icon: Icons.settings,
    tPath: "profile.aside-items.settings",
    path: "/profile/settings",
  },
];

export const metadata = {
  title: "Your profile",
};

const layout: FC<layoutProps> = ({ children }) => {
  return (
    <div className="w-full container grid md:grid-cols-[200px_1fr] md:mt-4 max-w-5xl gap-x-4 mt-2">
      <aside className="flex flex-col gap-y-2">
        {asideProps.map((el) => (
          <AsideItem
            path={el.path}
            tPath={el.tPath}
            Icon={el.Icon}
            key={el.tPath}
          />
        ))}
      </aside>
      {children}
    </div>
  );
};

export default layout;
