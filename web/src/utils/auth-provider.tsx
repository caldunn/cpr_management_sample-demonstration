import React, {useState, useContext, createContext } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

interface AuthHook {
  user?: string
  errors: number
  isLoading: boolean
  cookies: {il: any}
  signOut: () => void
  signIn: () => void

}
const authContext = createContext(useProvideAuth);
//@ts-ignore
export function ProvideAuth( { children } ) {

  const auth = useProvideAuth();
  // @ts-ignore
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = (): AuthHook => {
  // @ts-ignore
  return useContext(authContext)
}

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['il'])

  function signOut() {
    axios.post('/logout')
    removeCookie('il')

  }
  function signIn() {
    setCookie('il', 'y')

  }

  return { signIn, signOut, user, errors, isLoading, cookies }
}