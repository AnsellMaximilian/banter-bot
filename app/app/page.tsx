"use client";

import { useUser } from "@/contexts/user/UserContext";
import React from "react";

export default function AppPage() {
  const { currentUser } = useUser();

  console.log(currentUser);
  return <div>page</div>;
}
