import { SignInButton } from "@clerk/nextjs";
import { Button } from "@nextui-org/button";

const CustomSignInButton = () => {
  return (
    <SignInButton mode="modal">
      <Button color="primary">
        Sign In / Sign Up to write your interview experience
      </Button>
    </SignInButton>
  );
};

export default CustomSignInButton;
