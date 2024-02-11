import { nanoid } from "nanoid";
import React, { createContext, useContext, useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import {
  Appbar,
  Button,
  Checkbox,
  IconButton,
  List,
  Surface,
  Text,
  TextInput,
  TouchableRipple,
} from "react-native-paper";

export type RollcallInfo = {
  _key: string;
  description: string;
  location: [lat: number, lng: number][];
  timestart: Date;
  timeend: Date;
};

export type EventCreateProps = {
  goBack(): void;
  createEvent(name: string, isStrict: boolean, rollcalls: RollcallInfo[]): void;
  editRollcall(key: string): void;
};

export const RollcallsContext = createContext<
  [RollcallInfo[], React.Dispatch<React.SetStateAction<RollcallInfo[]>>]
>([[], () => {}]);

export function EventCreateProvider(props: { children: React.ReactNode }) {
  const rollcalls = useState<RollcallInfo[]>([]);
  return (
    <RollcallsContext.Provider value={rollcalls}>
      {props.children}
    </RollcallsContext.Provider>
  );
}

function EventCreate(props: EventCreateProps) {
  const [name, setName] = useState("");
  const [isStrict, setStrictness] = useState(false);
  const [rollcalls, setRollcalls] = useContext(RollcallsContext);

  return (
    <View className="flex-1">
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            props.goBack();
          }}
        />
        <Appbar.Content title="Create event" />
        <Appbar.Action icon="check" />
      </Appbar.Header>

      <View className="flex-1 p-4">
        <View className="mb-4">
          <Text variant="labelLarge" className="mb-2">
            Information
          </Text>
          <TextInput
            label="Event name"
            className="mb-2"
            mode="outlined"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <Checkbox.Item
            label="Strictly monitor attendance"
            labelVariant="bodyMedium"
            status={isStrict ? "checked" : "unchecked"}
            onPress={() => {
              setStrictness((prev) => !prev);
            }}
          />
        </View>
        <View className="flex-1">
          <Text variant="labelLarge" className="mb-2">
            Rollcalls
          </Text>
          <FlatList
            className="shrink"
            renderItem={({ item }) => (
              <Surface className="mb-2 flex-1 rounded">
                <TouchableRipple onPress={() => {}}>
                  <List.Item
                    title={<Text className="text-sm">{item.description}</Text>}
                    description={
                      <Text className="text-xs italic">{item._key}</Text>
                    }
                    right={() => (
                      <>
                        <IconButton
                          icon="trash-can-outline"
                          size={16}
                          onPress={() => {
                            setRollcalls((prev) =>
                              prev.filter(
                                (element) => element._key !== item._key,
                              ),
                            );
                          }}
                        />
                        <IconButton
                          icon="pencil"
                          size={16}
                          onPress={() => {
                            props.editRollcall(item._key);
                          }}
                        />
                      </>
                    )}
                  />
                </TouchableRipple>
              </Surface>
            )}
            data={rollcalls}
            keyExtractor={(item) => item._key}
            ListFooterComponent={
              <Button
                icon="plus"
                onPress={() => {
                  props.editRollcall(nanoid(5));
                }}
              >
                Add rollcall
              </Button>
            }
          />
        </View>
      </View>
    </View>
  );
}

export default EventCreate;
