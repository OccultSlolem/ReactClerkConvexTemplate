import { useColorModeValue, Flex, Stack, Box, Heading, Container, Text, useDisclosure, Popover, PopoverTrigger, Button, useMediaQuery, PopoverContent, PopoverArrow, PopoverCloseButton, useToast, VStack } from "@chakra-ui/react";
import { SignedIn, SignedOut, useAuth, useUser } from "@clerk/clerk-react";
import { mdiAccount, mdiChevronDown, mdiChevronUp } from "@mdi/js";
import Icon from "@mdi/react";
import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

export function Layout() {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  )
}

function Nav() {
  const navigate = useNavigate();

  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Box>
          <Heading className="cursor-pointer header" onClick={() => navigate('/')}>⚛ React Convex Clerk Template</Heading>
        </Box>
        <AccountDropdown />
      </Flex>
    </Box>
  )
}

function AccountDropdown() {
  const { user } = useUser();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { isSignedIn, isLoaded, signOut } = useAuth();
  const isSm = useMediaQuery("(max-width: 640px)")[0];
  const navigate = useNavigate();
  const toast = useToast();

  function signOutAndRedirect() {
    signOut();
    navigate('/');
    toast({
      title: 'Signed out.',
      description: 'You have been signed out.',
      status: 'success',
      duration: 4000,
      isClosable: true
    })
  }

  function doActionAndClose(action: 'sign-in' | 'sign-up' | 'settings') {
    onClose();

    switch(action) {
      case 'sign-in':
        navigate('/sign-in');
        break;
      case 'sign-up':
        navigate('/sign-up');
        break;
      case 'settings':
        navigate('/account-settings');
        break;
    }
  }

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      navigate('/');
      return;
    }
  }, [isLoaded, isSignedIn]);

  return (
    <Popover
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      placement="bottom-end"
    >
      <PopoverTrigger>
        <Button isLoading={!isLoaded}>
          {
            isSm ? (
              <Icon path={mdiAccount} size={1} />
            ) : (
              <>
                <Icon path={mdiAccount} size={1} />
                &nbsp;
                <Text>{user?.primaryEmailAddress?.emailAddress || 'Account'}</Text>
                &nbsp;
                {
                  isOpen ? (
                    <Icon path={mdiChevronUp} size={1} />
                  ) : (
                    <Icon path={mdiChevronDown} size={1} />
                  )
                }
              </>
            )
          }
        </Button>
      </PopoverTrigger>

      <PopoverContent p={5}>
        <PopoverArrow />
        <PopoverCloseButton />
        <VStack spacing={4}>
          <SignedOut>
            <Button onClick={() => doActionAndClose('sign-in')} colorScheme="blue">Sign in</Button>
            <Button onClick={() => doActionAndClose('sign-up')} colorScheme="green">Sign up</Button>
          </SignedOut>
          <SignedIn>
            <Text fontStyle="bold">
              Hello, {user?.fullName || 'User'}!
            </Text>
            <Button onClick={() => doActionAndClose('settings')} colorScheme="blue">Account</Button>
            <Button onClick={signOutAndRedirect} colorScheme="red">Sign out</Button>
          </SignedIn>
        </VStack>
      </PopoverContent>
    </Popover>
  )
}

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
      w="100vw"
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Text>
          ⚛ React Convex Clerk Template
        </Text>
        <span>
          © {`${currentYear}`}&nbsp;
          <a href="https://ethan-hanlon.xyz" className="text-blue-500">
            Ethan Hanlon
          </a>
          &nbsp;|
          <a href="https://github.com/occultslolem/ReactClerkConvexTemplate/blob/main/LICENSE.md" className="text-blue-500 ml-2">
            Minimal Rights Reserved
          </a>
        </span>
        <span>
          <Link to="/terms" className="text-blue-500 mr-2">
            Terms
          </Link>
          &nbsp;|&nbsp;
          <Link to="/privacy" className="text-blue-500 ml-2">
            Privacy
          </Link>
        </span>
      </Container>
    </Box>
  )
}