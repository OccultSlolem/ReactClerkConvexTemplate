import { ChakraProvider } from "@chakra-ui/react";
import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { AuthPage, Home, NotFound } from "./App";
import { Layout } from "./Layout";

export default function App() {
  const clerkPubKey = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;
  const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);

  if (!clerkPubKey) {
    throw new Error('Missing publishable key!');
  }

  return (
    <BrowserRouter>
      <ChakraProvider>
        <ClerkProvider publishableKey={clerkPubKey} navigate={(to) => { const n = useNavigate(); n(to);}}>
          <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/sign-in" element={<AuthPage fn="sign-in" />} />
                <Route path="/sign-up" element={<AuthPage fn="sign-up" />} />
                <Route path="/account-settings" element={<AuthPage fn="settings" />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </ConvexProviderWithClerk>
        </ClerkProvider>
      </ChakraProvider>
    </BrowserRouter>
  )
}