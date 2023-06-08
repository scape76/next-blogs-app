import * as React from "react";
import { getCurrentUser } from "@/lib/session";
import { notFound } from "next/navigation";

import DashboardHeader from "@/components/dashboard-header";
import DashboardShell from "@/components/shell";
import CreateCourseButton from "@/components/create-course-button";
import { db } from "@/lib/db";
import Link from "next/link";

interface pageProps {}

const page = async ({}: pageProps) => {
  const user = await getCurrentUser();

  if (!user) return notFound();

  const courses = await db.course.findMany({ where: { authorId: user.id } });

  return (
    <DashboardShell>
      <DashboardHeader
        titleTPath="profile.courses.header.title"
        subtitleTPath="profile.courses.header.subtitle"
      >
        <CreateCourseButton />
      </DashboardHeader>
      {
        courses.map((c) => (
          <div className="p-4 flex justify-between" key={c.id}>
            <span>{c.title}</span>
            <Link href={`/course-editor/${c.id}`}>Edit</Link>
          </div>
        ))
      }
    </DashboardShell>
  );
};

export default page;
