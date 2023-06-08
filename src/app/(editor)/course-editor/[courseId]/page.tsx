import * as React from "react";
import { Course } from "@prisma/client";
import { validateUserHasAccessToCourse } from "@/app/api/courses/[courseId]/route";
import { notFound } from "next/navigation";

import CourseEditor from "@/components/course-editor";

interface pageProps {
  params: {
    courseId: Course["id"];
  };
}

const page = async ({ params }: pageProps) => {
  const course = await validateUserHasAccessToCourse(params.courseId);

  if (!course) {
    return notFound();
  }

  return <CourseEditor course={course} />;
};

export default page;
