import Link from "next/link";
// import { auth } from "../../auth";
// import UserAvatar from "./user-avatar";
import SignInButton from "./sign-in-button";

async function Header() {
  // const session = await auth();
  return (
    <nav className="border-b sticky top-0 z-50 bg-background">
      <div className="flex h-16 items-center container mx-auto">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="text-xl font-bold">Knowledge EC</span>
        </Link>

        <div className="ml-auto flex items-center space-x-4">
          <SignInButton />
        </div>
      </div>
    </nav>
  );
}

export default Header;
