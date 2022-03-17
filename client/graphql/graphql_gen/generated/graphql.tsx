import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Event = {
  __typename?: 'Event';
  category?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['DateTime']>;
  id: Scalars['Int'];
  name: Scalars['String'];
  tickets: Ticket;
};

export type Mutation = {
  __typename?: 'Mutation';
  buyTicket: Ticket;
  createTicket: Ticket;
  register: User;
  sendTicket?: Maybe<TicketAndLog>;
};


export type MutationBuyTicketArgs = {
  ticketId: Scalars['Float'];
  userId: Scalars['Float'];
};


export type MutationCreateTicketArgs = {
  ticket: Scalars['String'];
};


export type MutationRegisterArgs = {
  username: Scalars['String'];
};


export type MutationSendTicketArgs = {
  ticketId: Scalars['Float'];
  to: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  getTicket: Ticket;
  getTickets?: Maybe<Array<Ticket>>;
  getUser: User;
  getUsers: Array<User>;
  getUtickets: User;
};


export type QueryGetTicketArgs = {
  id: Scalars['Float'];
};


export type QueryGetUserArgs = {
  username: Scalars['String'];
};


export type QueryGetUticketsArgs = {
  userId: Scalars['Float'];
};

export type Ticket = {
  __typename?: 'Ticket';
  currentOwner?: Maybe<Scalars['Float']>;
  id: Scalars['Int'];
  name: Scalars['String'];
  previousOwner?: Maybe<Scalars['Float']>;
};

export type TicketAndLog = {
  __typename?: 'TicketAndLog';
  ticket: Ticket;
  transferLog: TransferLog;
};

export type TransferLog = {
  __typename?: 'TransferLog';
  currentOwner: Scalars['Int'];
  id: Scalars['Int'];
  previousOwner: Scalars['Int'];
  timeStamp: Scalars['DateTime'];
};

export type User = {
  __typename?: 'User';
  events: Array<Event>;
  id: Scalars['Int'];
  tickets: Array<Ticket>;
  username: Scalars['String'];
};

export type BuyTicketMutationVariables = Exact<{
  userId: Scalars['Float'];
  ticketId: Scalars['Float'];
}>;


export type BuyTicketMutation = { __typename?: 'Mutation', buyTicket: { __typename?: 'Ticket', id: number, name: string, currentOwner?: number | null, previousOwner?: number | null } };

export type CreateTicketMutationVariables = Exact<{
  ticket: Scalars['String'];
}>;


export type CreateTicketMutation = { __typename?: 'Mutation', createTicket: { __typename?: 'Ticket', id: number, name: string, currentOwner?: number | null, previousOwner?: number | null } };

export type GetTicketsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTicketsQuery = { __typename?: 'Query', getTickets?: Array<{ __typename?: 'Ticket', id: number, name: string, currentOwner?: number | null, previousOwner?: number | null }> | null };

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'User', id: number, username: string } };

export type SendTicketMutationVariables = Exact<{
  to: Scalars['Float'];
  ticketId: Scalars['Float'];
}>;


export type SendTicketMutation = { __typename?: 'Mutation', sendTicket?: { __typename?: 'TicketAndLog', ticket: { __typename?: 'Ticket', id: number, name: string, currentOwner?: number | null, previousOwner?: number | null }, transferLog: { __typename?: 'TransferLog', id: number, currentOwner: number, previousOwner: number, timeStamp: any } } | null };


export const BuyTicketDocument = gql`
    mutation BuyTicket($userId: Float!, $ticketId: Float!) {
  buyTicket(userId: $userId, ticketId: $ticketId) {
    id
    name
    currentOwner
    previousOwner
  }
}
    `;
export type BuyTicketMutationFn = Apollo.MutationFunction<BuyTicketMutation, BuyTicketMutationVariables>;

/**
 * __useBuyTicketMutation__
 *
 * To run a mutation, you first call `useBuyTicketMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBuyTicketMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [buyTicketMutation, { data, loading, error }] = useBuyTicketMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      ticketId: // value for 'ticketId'
 *   },
 * });
 */
export function useBuyTicketMutation(baseOptions?: Apollo.MutationHookOptions<BuyTicketMutation, BuyTicketMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BuyTicketMutation, BuyTicketMutationVariables>(BuyTicketDocument, options);
      }
export type BuyTicketMutationHookResult = ReturnType<typeof useBuyTicketMutation>;
export type BuyTicketMutationResult = Apollo.MutationResult<BuyTicketMutation>;
export type BuyTicketMutationOptions = Apollo.BaseMutationOptions<BuyTicketMutation, BuyTicketMutationVariables>;
export const CreateTicketDocument = gql`
    mutation CreateTicket($ticket: String!) {
  createTicket(ticket: $ticket) {
    id
    name
    currentOwner
    previousOwner
  }
}
    `;
export type CreateTicketMutationFn = Apollo.MutationFunction<CreateTicketMutation, CreateTicketMutationVariables>;

/**
 * __useCreateTicketMutation__
 *
 * To run a mutation, you first call `useCreateTicketMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTicketMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTicketMutation, { data, loading, error }] = useCreateTicketMutation({
 *   variables: {
 *      ticket: // value for 'ticket'
 *   },
 * });
 */
export function useCreateTicketMutation(baseOptions?: Apollo.MutationHookOptions<CreateTicketMutation, CreateTicketMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTicketMutation, CreateTicketMutationVariables>(CreateTicketDocument, options);
      }
export type CreateTicketMutationHookResult = ReturnType<typeof useCreateTicketMutation>;
export type CreateTicketMutationResult = Apollo.MutationResult<CreateTicketMutation>;
export type CreateTicketMutationOptions = Apollo.BaseMutationOptions<CreateTicketMutation, CreateTicketMutationVariables>;
export const GetTicketsDocument = gql`
    query getTickets {
  getTickets {
    id
    name
    currentOwner
    previousOwner
  }
}
    `;

/**
 * __useGetTicketsQuery__
 *
 * To run a query within a React component, call `useGetTicketsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTicketsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTicketsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTicketsQuery(baseOptions?: Apollo.QueryHookOptions<GetTicketsQuery, GetTicketsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTicketsQuery, GetTicketsQueryVariables>(GetTicketsDocument, options);
      }
export function useGetTicketsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTicketsQuery, GetTicketsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTicketsQuery, GetTicketsQueryVariables>(GetTicketsDocument, options);
        }
export type GetTicketsQueryHookResult = ReturnType<typeof useGetTicketsQuery>;
export type GetTicketsLazyQueryHookResult = ReturnType<typeof useGetTicketsLazyQuery>;
export type GetTicketsQueryResult = Apollo.QueryResult<GetTicketsQuery, GetTicketsQueryVariables>;
export const RegisterDocument = gql`
    mutation Register($username: String!) {
  register(username: $username) {
    id
    username
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const SendTicketDocument = gql`
    mutation SendTicket($to: Float!, $ticketId: Float!) {
  sendTicket(to: $to, ticketId: $ticketId) {
    ticket {
      id
      name
      currentOwner
      previousOwner
    }
    transferLog {
      id
      currentOwner
      previousOwner
      timeStamp
    }
  }
}
    `;
export type SendTicketMutationFn = Apollo.MutationFunction<SendTicketMutation, SendTicketMutationVariables>;

/**
 * __useSendTicketMutation__
 *
 * To run a mutation, you first call `useSendTicketMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendTicketMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendTicketMutation, { data, loading, error }] = useSendTicketMutation({
 *   variables: {
 *      to: // value for 'to'
 *      ticketId: // value for 'ticketId'
 *   },
 * });
 */
export function useSendTicketMutation(baseOptions?: Apollo.MutationHookOptions<SendTicketMutation, SendTicketMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendTicketMutation, SendTicketMutationVariables>(SendTicketDocument, options);
      }
export type SendTicketMutationHookResult = ReturnType<typeof useSendTicketMutation>;
export type SendTicketMutationResult = Apollo.MutationResult<SendTicketMutation>;
export type SendTicketMutationOptions = Apollo.BaseMutationOptions<SendTicketMutation, SendTicketMutationVariables>;