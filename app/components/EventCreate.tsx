import useSnackbar from "@/lib/hooks/useSnackbar";
import { nanoid } from "nanoid";
import React, { createContext, useContext, useRef, useState } from "react";
import { FlatList, View, TextInput as _TextInput } from "react-native";
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

export const CreateEventContext = createContext<{
  rollcalls: [
    RollcallInfo[],
    React.Dispatch<React.SetStateAction<RollcallInfo[]>>,
  ];
  name: [string, React.Dispatch<React.SetStateAction<string>>];
  strictness: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}>({
  rollcalls: [[], () => {}],
  name: ["", () => {}],
  strictness: [false, () => {}],
});

export function EventCreateProvider(props: { children: React.ReactNode }) {
  const rollcalls = useState<RollcallInfo[]>([]);
  const name = useState("");
  const strictness = useState(false);

  return (
    <CreateEventContext.Provider value={{ rollcalls, name, strictness }}>
      {props.children}
    </CreateEventContext.Provider>
  );
}

function EventCreate(props: EventCreateProps) {
  const context = useContext(CreateEventContext);

  const [name, setName] = context.name;
  const [isStrict, setStrictness] = context.strictness;
  const [rollcalls, setRollcalls] = context.rollcalls;

  const [snackbar, alert] = useSnackbar();

  const nameRef = useRef<_TextInput>(null);
  function handleCreate() {
    if (name.length === 0) {
      alert("Event name is required");
      nameRef.current?.focus();
    } else if (rollcalls.length === 0) {
      alert("Atleast one rollcall is required");
    } else {
      props.createEvent(name, isStrict, rollcalls);
    }
  }

  return (
    <View className="flex-1">
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            props.goBack();
          }}
        />
        <Appbar.Content title="Create event" />
        <Appbar.Action icon="check" onPress={handleCreate} />
      </Appbar.Header>

      <View className="flex-1 p-4">
        <View className="mb-4">
          <Text variant="labelLarge" className="mb-2">
            Information
          </Text>
          <TextInput
            ref={nameRef}
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
      {snackbar}
    </View>
  );
}

export default EventCreate;
