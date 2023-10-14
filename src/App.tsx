import {
  Button,
  Divider,
  HStack,
  Heading,
  Image,
  Input,
  ListItem,
  OrderedList,
  SkeletonText,
  Spinner,
  Stack,
  Text,
  UnorderedList,
  VStack,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { mdiSignCaution } from "@mdi/js";
import Icon from "@mdi/react";
import { CountShow } from "./Components";
import {
  useAuth,
  RedirectToSignIn,
  RedirectToSignUp,
  RedirectToUserProfile,
  SignedOut,
  SignedIn,
} from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Home() {
  const countQuery = useQuery(api.main.getCounts);
  const countMutation = useMutation(api.main.updateCount);
  const { isLoading } = useConvexAuth();
  const isMd = useMediaQuery("(max-width: 1040px)")[0];
  const toast = useToast();
  const [name, setName] = useState('');
  const [httpEndpointResponse, setHttpEndpointResponse] = useState('');

  type CountTarget = "global" | "user";
  type CountAction = "increment" | "decrement";
  async function mutateCount(targetCount: CountTarget, action: CountAction) {
    function fail() {
      toast({
        title: "Failed to update count.",
        description: "Please try again later.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }

    const res = await countMutation({ targetCount, action });
    if (!res || res.code !== 200) {
      console.error(res);
      fail();
    }
  }

  async function endpointTest() {
    const endpointUrl = 'https://warmhearted-cow-8.convex.site/foo';

    const res = await fetch(endpointUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });

    const json = await res.json();
    setHttpEndpointResponse(json.message);
  }

  return (
    <VStack minH="100vh" pb="8">
      <Heading>⚛ React Convex Template</Heading>

      <Image
        src={`https://cataas.com/cat/says/hewwo%20convex%20:3?size=${
          isMd ? "10" : "20"
        }&color=red`}
        rounded="lg"
      />

      <Heading size="lg">Query / Mutation Tester</Heading>

      <Stack direction={isMd ? "column" : "row"} spacing={8}>
        <CountShow
          isGlobal
          isLoaded={countQuery?.globalCount !== undefined}
          count={countQuery?.globalCount}
          onInc={() => mutateCount("global", "increment")}
          onDec={() => mutateCount("global", "decrement")}
        />

        {isLoading ? (
          <SkeletonText />
        ) : (
          <>
            <SignedOut>
              <Text>Please sign in to see your own count.</Text>
            </SignedOut>
            <SignedIn>
              <CountShow
                count={countQuery?.userCount}
                isLoaded={countQuery !== undefined}
                onInc={() => mutateCount("user", "increment")}
                onDec={() => mutateCount("user", "decrement")}
              />
            </SignedIn>
          </>
        )}
      </Stack>

      <Divider />

      <Heading size="lg">HTTP Endpoint Tester</Heading>
      <Text fontStyle="italic">Hint: Use the network tab under developer tools when you click test to see what happens here.</Text>

      <HStack>
        <Input onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <Button onClick={endpointTest} colorScheme="green">Test</Button>
      </HStack>

      <Text>{httpEndpointResponse}</Text>

      <Divider />

      <Heading size="md">About</Heading>
      <Text>
        This is a template for building React apps with Convex authentication.
      </Text>

      <Heading size="sm">This template comes preconfigured with:</Heading>
      <UnorderedList>
        <ListItem>TSX React</ListItem>
        <ListItem>Clerk</ListItem>
        <ListItem>Convex</ListItem>
        <ListItem>Vite</ListItem>
        <ListItem>Tailwind CSS</ListItem>
        <ListItem>Chakra UI</ListItem>
        <ListItem>React Router</ListItem>
        <ListItem>Material Design Icons</ListItem>
        <ListItem>Cypress E2E Testing</ListItem>
        <ListItem>
          A GitHub CI/CD pipeline that runs Cypress tests on each commit
        </ListItem>
      </UnorderedList>

      <Divider />

      <Heading size="md">Getting Started</Heading>
      <Text>
        This assumes you already have accounts set up with{" "}
        <a href="https://convex.dev" className="text-blue-500">
          Convex
        </a>{" "}
        and{" "}
        <a href="https://clerk.com" className="text-blue-500">
          Clerk
        </a>
        . Set those up if you haven't already.
      </Text>
      <OrderedList maxW="lg">
        <ListItem>
          Go to{" "}
          <a
            href="https://github.com/occultslolem/ReactClerkConvexTemplate"
            className="text-blue-500"
          >
            the GitHub Repository
          </a>{" "}
          and either clone it or use the template button to create a new
          repository.
        </ListItem>
        <ListItem>
          Run <code>npm install</code> to install dependencies.
        </ListItem>
        <ListItem>
          Go to the{" "}
          <a href="https://dashboard.clerk.com" className="text-blue-500">
            Clerk Dashboard
          </a>{" "}
          and create a new project. Copy the publishable key to{" "}
          <code>.env.local</code>
          &nbsp;at the root of the respository.
        </ListItem>
        <ListItem>
          In the Clerk dashboard, create a new JWT template for Clerk. Copy the
          issuer field to your clipboard.
        </ListItem>
        <ListItem>
          Run <code>npx convex init</code> to either start a new Convex project
          or attach the project to an existing one.
        </ListItem>
        <ListItem>
          Go to the{" "}
          <a href="https://dashboard.convex.dev" className="text-blue-500">
            Convex Dashboard
          </a>{" "}
          and go to your project. Go to Settings {"->"} Environment Variables
          and paste the Issuer for the JWT template to a new variable
          called <code>AUTH_DOMAIN</code>.
        </ListItem>
        <ListItem>
          Run <code>npm run dev</code> to start the React development server and{" "}
          <code>npx convex dev</code> to start the Convex development server.
        </ListItem>
      </OrderedList>
      <Icon path={mdiSignCaution} size={1} color="red" />
      <Heading size="sm" className="flex" maxW="50%" color="red.500">
        Warning: all dotenv files are present in this repository for ease of
        setup. Do not commit them to your own repository! Make sure to
        remove these from your repo and gitignore them.
      </Heading>
      <Icon path={mdiSignCaution} size={1} color="red" />
    </VStack>
  );
}

export function AuthPage({ fn }: { fn: "sign-in" | "sign-up" | "settings" }) {
  const { isLoaded, isSignedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && isSignedIn && fn !== "settings") {
      navigate("/");
    }
  }, [isLoaded, isSignedIn]);

  return (
    <VStack minH="100vh" justifyContent="center">
      <HStack>
        <Spinner size="xl" />
        <Heading size="lg" className="animate-pulse" ml="4">
          Loading...
        </Heading>
      </HStack>
      {fn === "sign-in" ? (
        <RedirectToSignIn />
      ) : fn === "sign-up" ? (
        <RedirectToSignUp />
      ) : fn === "settings" ? (
        <RedirectToUserProfile />
      ) : (
        <RedirectToSignIn />
      )}
    </VStack>
  );
}

export function Terms() {
  return (
    <VStack minH="100vh">
      <Heading>Terms of Service</Heading>
      <Text maxW="xl">I don't really care how you choose to use this service. It's just a counter. Don't do anything illegal.</Text>
      <Text maxW="xl">I'm not responsible for your use of this service. Everything is provided as is.</Text>
      <Text maxW="xl">If you have any concerns, please reach out to <a href="mailto:me@ethan-hanlon.xyz" className="text-blue-500">me@ethan-hanlon.xyz</a>.</Text>
    </VStack>
  );
}

export function Privacy() {
  return (
    <VStack minH="100vh" >
      <Heading>Privacy Policy</Heading>
      {/* DRY :( */}
      <Text maxW="xl">If you use the counter, that action may be logged along with your IP address. If you create an account, I'll collect your email and/or Discord. Otherwise, I don't collect any data from you.</Text>
      <Text maxW="xl">If you create an account using Clerk, you agree to their terms of service and privacy policy. Likewise if you choose to connect Discord.</Text>
      <Text maxW="xl">Note that I have Clerk running in Dev mode. Your account is subject to deletion as I or Clerk deign it. Don't grow attached :)</Text>
      <Text maxW="xl">If you have any concerns, please reach out to <a href="mailto:me@ethan-hanlon.xyz" className="text-blue-500">me@ethan-hanlon.xyz</a>.</Text>
    </VStack>
  )
}

export function NotFound() {
  const navigate = useNavigate();

  return (
    <VStack minH="100vh">
      <Heading>404 Not Found</Heading>
      <Text>The page you were looking for was not found.</Text>

      <Button onClick={() => navigate("/")} colorScheme="blue">
        Back to Home
      </Button>
    </VStack>
  );
}
