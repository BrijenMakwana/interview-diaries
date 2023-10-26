import { SignInButton } from "@clerk/nextjs";
import { Button } from "@nextui-org/button";

const CustomSignInButton = () => {
  return (
    <SignInButton mode="modal">
      <Button color="primary">Login</Button>
    </SignInButton>
  );
};

export default CustomSignInButton;
