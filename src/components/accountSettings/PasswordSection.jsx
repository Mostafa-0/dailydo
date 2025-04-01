import Button from "@components/ui/Button";
import ProfileSection from "./ProfileSection";

function PasswordSection() {
  return (
    <ProfileSection title="Password">
      <Button variant="secondary" to="password" className="max-w-44">
        Change Password
      </Button>
    </ProfileSection>
  );
}

export default PasswordSection;
