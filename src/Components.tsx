import { HStack, Button, VStack, SkeletonText, Heading } from "@chakra-ui/react";

interface CountShowParams {
  count?: number;
  isLoaded: boolean
  isGlobal?: boolean;
  onInc: () => void;
  onDec: () => void;
}
export function CountShow({ count, isLoaded, isGlobal, onInc, onDec }: CountShowParams ) {
  return (
    <VStack textAlign="center">
      {
        isGlobal ? (
          <Heading size="md">Global Count</Heading>
        ) : (
          <Heading size="md">Your Count</Heading>
        )
      }

      <SkeletonText isLoaded={isLoaded}>
        <Heading size="lg" fontWeight="bold" textAlign="center" id={isGlobal ? 'global-count' : 'user-count'}>{count || 0}</Heading>

        <HStack>
          <Button onClick={onDec} colorScheme="red" id={isGlobal ? 'global-dec' : 'user-dec'}>Decrement</Button>
          <Button onClick={onInc} colorScheme="green" id={isGlobal ? 'global-inc' : 'user-inc'}>Increment</Button>
        </HStack>
      </SkeletonText>
    </VStack>
  )
}
