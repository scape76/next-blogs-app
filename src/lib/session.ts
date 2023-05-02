import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { NextApiRequest, NextApiResponse } from "next";

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function getCurrentUser() {
  const session = await getSession();

  return session?.user;
}
