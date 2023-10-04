import React from "react";
import { useSelector } from "react-redux";
import { UserProfile } from "../../components/UserProfile";
import { isUserLoading$, user$ } from "../../store";

export const UserProfileContainer = () => {
  const currentUser = useSelector(user$);
  const isUserLoading = useSelector(isUserLoading$);

  return (
    <UserProfile isUserLoading={isUserLoading} user={currentUser} />
  );
};
