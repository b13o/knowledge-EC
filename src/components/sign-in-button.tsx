// import { signIn } from "../../auth";
import { Button } from "./ui/button";

interface SignInButtonProps {
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
  children?: React.ReactNode;
}

export default function SignInButton(props: SignInButtonProps) {
  return (
    // <form
    //   action={async () => {
    //     "use server";
    //     await signIn("github");
    //   }}
    // >
    <Button size={props.size} className={props.className}>
      {props.children || "Login"}
    </Button>
    // </form>
  );
}
