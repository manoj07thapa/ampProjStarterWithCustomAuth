import Head from "next/head";
import Image from "next/image";
import { Auth } from "aws-amplify";
import { useState, useEffect } from "react";

export default function Home() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function onAppLoad() {
      const user = await Auth.currentAuthenticatedUser();
      if (user) {
        setUser(user);
      }
    }
    onAppLoad();
  }, []);
  return (
    <div>
      <h1 className="text-2xl text-gray-800 font-bold">
        {user ? (
          <p>{`Hello ${user.attributes.name}`}</p>
        ) : (
          <p>Hello molecule</p>
        )}
      </h1>
      <div>
        {user && (
          <button
            type="submit"
            className="mt-4 bg-red-800 px-5 py-3 text-white rounded-sm shadow-md"
            onClick={() => Auth.signOut()}
          >
            Signout
          </button>
        )}
      </div>
    </div>
  );
}
