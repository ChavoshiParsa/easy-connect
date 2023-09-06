'use client';

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { MessageProps } from '../components/home/chat/message/MessageItem';

interface AlertProps {
  status: string;
  title: string;
  message: string;
}

export interface UserData {
  email: string;
  username: string;
  firstName: string;
  profileColor: string;
  profilePhoto: string | null;
  lastName: string | null;
  age: number | null;
  isOnline: boolean;
}

interface MessageState {
  connector: string;
  id: string;
  messageText: string;
  timeSent: string;
  type: string;
  messageStatus: string;
}

interface PayloadType {
  connect: string;
  messages: MessageProps[];
}

export enum ActionType {
  ADD_MESSAGES = 'ADD_MESSAGES',
  SET_MESSAGES = 'SET_MESSAGES',
}

interface ContextType {
  alert: AlertProps | null;
  setAlert: ({ status, title, message }: AlertProps) => void;
  isMenuShow: boolean | null;
  setIsMenuShow: (value: boolean) => void;
  messages: MessageState[];
  dispatch: React.Dispatch<{ type: ActionType; payload: PayloadType }>;
}

const initialState: MessageState[] = [];

function reducer(
  state: MessageState[],
  action: { type: ActionType; payload: PayloadType }
): MessageState[] {
  if (!action.payload.messages) return state;

  const transformData: MessageState[] = action.payload.messages.map((item) => {
    return { connector: action.payload.connect, ...item };
  });

  if (action.type === ActionType.SET_MESSAGES) {
    return transformData;
  } else if (action.type === ActionType.ADD_MESSAGES) {
    return [...state, ...transformData];
  } else {
    return state;
  }
}

const Context = createContext<ContextType>({
  alert: null,
  setAlert: ({ status, title, message }: AlertProps) => {},
  isMenuShow: null,
  setIsMenuShow: (value: boolean) => {},
  messages: initialState,
  dispatch: (action: { type: ActionType; payload: PayloadType }) => {},
});

export const ContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [alert, setAlert] = useState<AlertProps | null>(null);
  const [isMenuShow, setIsMenuShow] = useState<boolean | null>(false);

  useEffect(() => {
    if (alert && alert.status !== 'pending') {
      const timer = setTimeout(() => {
        setAlert(null);
      }, 2500);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [alert]);

  const [messages, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider
      value={{
        alert,
        setAlert,
        isMenuShow,
        setIsMenuShow,
        messages,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useContextProvider = () => useContext(Context);
