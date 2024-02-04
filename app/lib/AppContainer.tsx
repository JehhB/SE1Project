import React, { createContext, useContext, useEffect } from "react";
import SessionRepository from "./model/repository/SessionRepository";
import supabase from "./model/source/supabase";
import { SessionService } from "./services/SessionService";
import SessionDao from "./model/dao/SessionDao";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageController } from "mobx-persist-store";

class Storage implements StorageController {
  async getItem<T>(key: string): Promise<string | T | null> {
    const result = await AsyncStorage.getItem(key);
    console.log(`Getting ${key} with value ${result}`);
    return result;
  }
  removeItem(key: string): Promise<void> {
    console.log(`Removing ${key}`);
    return AsyncStorage.removeItem(key);
  }

  async setItem(key: string, value: any): Promise<void> {
    console.log(`Setting ${key} with value ${value}`);
    return AsyncStorage.setItem(key, value);
  }
}

export function createAppContainer() {
  const sessionDao = new SessionDao(new Storage());
  const sessionService = new SessionService(supabase);
  const sessionRepository = new SessionRepository(
    sessionDao,
    sessionService,
    supabase,
  );

  return {
    supabase,
    sessionRepository,
  };
}

export const appContainer = createAppContainer();
export const ContainerContext = createContext(appContainer);

export function AppContainer({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const unsubscribe = appContainer.sessionRepository.registerListeners();
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
