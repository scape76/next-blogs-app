import * as React from "react";

import { Icons } from "@/components/icons";

interface UserAvatarProps {}

const UserAvatar: React.FC<UserAvatarProps> = () => {
  return <Icons.user className="p-1 rounded-full bg-accent" />;
};

export default UserAvatar;
