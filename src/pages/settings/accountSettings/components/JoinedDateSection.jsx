import { useContext, useMemo } from "react";
import ProfileContext from "@context/ProfileContext";
import ProfileSection from "./ProfileSection";

function JoinedDateSection() {
  const { currentUser } = useContext(ProfileContext);

  const joinedDate = useMemo(
    () =>
      currentUser?.metadata?.creationTime
        ? new Date(currentUser.metadata.creationTime).toDateString()
        : "N/A",
    [currentUser]
  );

  return (
    <ProfileSection title="Joined">
      <p className="text-sm font-semibold">{joinedDate}</p>
    </ProfileSection>
  );
}

export default JoinedDateSection;
