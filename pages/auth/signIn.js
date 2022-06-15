import { useEffect } from "react";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import SignIn from "../../components/auth/SignIn";

function signIn() {
  const router = useRouter();

  useEffect(() => {
    async function onAppLoad() {
      const user = await Auth.currentAuthenticatedUser();
      console.log(user);
      if (user) {
        router.push("/");
      }
    }
    onAppLoad();
  }, []);

  return (
    <div>
      <SignIn />
    </div>
  );
}

export default signIn;
