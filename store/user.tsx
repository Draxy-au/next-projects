import React, { createContext, useState } from "react";

export const UserContext: React.Context<{
  userName: string;
  userAge: number;
  userFavouriteColour: string;
  setUserName: (username: string) => {};
  setUserAge: (age: number) => {};
  setUserFavouriteColour: (favColour: string) => {};
}> = createContext({
  userName: "",
  userAge: 30,
  userFavouriteColour: "",
});

export function UserContextProvider({ children }: React.PropsWithChildren) {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [favouriteColour, setFavouriteColour] = useState("");

  const context = {
    userName: name,
    userAge: age,
    userFavouriteColour: favouriteColour,
    setUserName: setName,
    setUserAge: setAge,
    setUserFavouriteColour: setFavouriteColour,
  };

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
}

export default UserContextProvider;
