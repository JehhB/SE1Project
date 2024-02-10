import React, { createContext, useContext, useEffect } from "react";
import SessionRepository from "./model/repository/SessionRepository";
import supabase from "./model/source/supabase";
import { SessionService } from "./services/SessionService";
import SessionDao from "./model/dao/SessionDao";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserDao } from "./model/dao/UserDao";
import { UserService } from "./services/UserService";
import { UserRepository } from "./model/repository/UserRepository";
import ISessionRepository from "./model/repository/ISessionRepository";
import IUserRepository from "./model/repository/IUserRepository";
import { CreatedEventsRepository } from "./model/repository/CreatedEventsRepository";
import { CreatedEventsService } from "./services/CreatedEventsService";
import { ICreatedEventsRepository } from "./model/repository/ICreatedEventsRepository";

export function createAppContainer() {
  const sessionDao = SessionDao.createSessionDao(AsyncStorage);
  const userDao = UserDao.createUserDao(AsyncStorage);

  const sessionService = new SessionService(supabase);
  const userService = new UserService(supabase);
  const createdEventsService = new CreatedEventsService(supabase);

  const sessionRepository = new SessionRepository(
    sessionDao,
    sessionService,
  ) as ISessionRepository;
  const userRepository = new UserRepository(
    userDao,
    userService,
  ) as IUserRepository;
  const createdEventsRepository = new CreatedEventsRepository(
    createdEventsService,
  ) as ICreatedEventsRepository;

  return {
    supabase,
    sessionRepository,
    userRepository,
    createdEventsRepository,
  };
}

export const appContainer = createAppContainer();
export const ContainerContext = createContext(appContainer);

export function AppContainer({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const unsubscribe = (
      appContainer.sessionRepository as SessionRepository
    ).registerListeners(supabase);
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
