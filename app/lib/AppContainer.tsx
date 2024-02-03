import React, { createContext, useContext } from "react";
import { createSessionDao } from "./model/dao/SessionDao";
import SessionRepository from "./model/repository/SessionRepository";
import supabase from "./model/source/supabase";
import { SessionService } from "./services/SessionService";

export function createAppContainer() {
  const sessionDao = createSessionDao();
  const sessionService = new SessionService(supabase);

  const sessionRepository = new SessionRepository(sessionDao, sessionService);

  return {
    supabase,
    sessionRepository,
  };
}

export const appContainer = createAppContainer();

export const ContainerContext = createContext(appContainer);

export function AppContainer({ children }: { children: React.ReactNode }) {
  return (
    <ContainerContext.Provider value={appContainer}>
      {children}
    </ContainerContext.Provider>
  );
}

export function useAppContainer() {
  return useContext(ContainerContext);
}
