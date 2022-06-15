import { useEffect } from "react";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import UserConfirmation from "../../components/auth/UserConfirmation";

function confirmUser() {
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
      <UserConfirmation />
    </div>
  );
}

export default confirmUser;
