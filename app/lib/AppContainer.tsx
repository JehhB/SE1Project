import React, { createContext, useContext, useEffect } from "react";
import SessionRepository from "./model/repository/SessionRepository";
import supabase from "./model/source/supabase";
import { SessionService } from "./services/SessionService";
import SessionDao from "./model/dao/SessionDao";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserDao } from "./model/dao/UserDao";
import { UserService } from "./services/UserService";
import { UserRepository } from "./model/repository/UserRepository";

export function createAppContainer() {
  const sessionDao = SessionDao.createSessionDao(AsyncStorage);
  const userDao = UserDao.createUserDao(AsyncStorage);

  const sessionService = new SessionService(supabase);
  const userService = new UserService(supabase);

  const sessionRepository = new SessionRepository(sessionDao, sessionService);
  const userRepository = new UserRepository(userDao, userService);

  return {
    supabase,
    sessionRepository,
    userRepository,
  };
}

export const appContainer = createAppContainer();
export const ContainerContext = createContext(appContainer);

export function AppContainer({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const unsubscribe =
      appContainer.sessionRepository.registerListeners(supabase);
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <ContainerContext.Provider value={appContainer}>
      {children}
    </ContainerContext.Provider>
  );
}

export function useAppContainer() {
  return useContext(ContainerContext);
}
