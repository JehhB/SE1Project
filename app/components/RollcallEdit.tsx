import React, { useContext, useRef, useState } from "react";
import { CreateEventContext } from "./EventCreate";
import { ScrollView, View, Image, TextInput as _TextInput } from "react-native";
import {
  Appbar,
  Button,
  RadioButton,
  Surface,
  Text,
  TextInput,
  TouchableRipple,
} from "react-native-paper";
import { set, addMinutes, addDays } from "date-fns/fp";
import { format } from "date-fns";
import locations from "./locations/locations";
import { DatePickerModal, TimePickerModal } from "react-native-paper-dates";
import useSnackbar from "@/lib/hooks/useSnackbar";

export type RollcallEditProps = {
  _key: string;
  goBack(): void;
};

function findLocationIndex(coordinates: [lat: number, lng: number][]): number {
  return locations.findIndex(
    (location) =>
      location.coordinates.length === coordinates.length &&
      location.coordinates.reduce(
        (prev, [lat, lng], i) =>
          prev && coordinates[i][0] === lat && coordinates[i][1] === lng,
        true,
      ),
  );
}

function midnight(date: Date) {
  return set({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }, date);
}

function getTime(date: Date) {
  return { minutes: date.getMinutes(), hours: date.getHours() };
}

function RollcallEdit(props: RollcallEditProps) {
  const [rollcalls, setRollcalls] = useContext(CreateEventContext).rollcalls;

  const index = rollcalls.findIndex((item) => item._key == props._key);
  const adding = index === -1;

  const [description, setDescription] = useState(
    adding ? "" : rollcalls[index].description,
  );

  const [dateVisibility, setDateVisibility] = useState(false);
  const [timeStartPickerVisibility, showTimestart] = useState(false);
  const [timeEndPickerVisibility, showTimeend] = useState(false);

  const loc = adding ? 0 : findLocationIndex(rollcalls[index].location);
  const [locationId, setLocationId] = useState(loc == -1 ? 0 : loc);

  const [date, setDate] = useState(
    adding ? midnight(new Date()) : midnight(rollcalls[index].timestart),
  );
  const [timestart, setTimestart] = useState(
    adding ? getTime(new Date()) : getTime(rollcalls[index].timestart),
  );

  const [timeend, setTimeend] = useState(
    adding
      ? getTime(addMinutes(15, new Date()))
      : getTime(rollcalls[index].timeend),
  );

  const [snackbar, alert] = useSnackbar();
  const descriptionRef = useRef<_TextInput>(null);

  const saveRollcall = () => {
    if (description.length === 0) {
      alert("Description must not be empty");
      descriptionRef.current?.focus();
      return;
    }

    const startTimestamp = set(timestart, date);
    let endTimestamp = set(timeend, date);
    if (startTimestamp >= endTimestamp) {
      endTimestamp = addDays(1, endTimestamp);
    }

    const rollcall = {
      _key: props._key,
      description,
      timestart: startTimestamp,
      timeend: endTimestamp,
      location: locations[locationId].coordinates,
    };

    if (adding) {
      setRollcalls((prev) => [...prev, rollcall]);
    } else {
      setRollcalls((prev) =>
        prev.map((item) => (item._key === props._key ? rollcall : item)),
      );
    }

    props.goBack();
  };

  return (
    <View className="flex-1">
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            props.goBack();
          }}
        />
        <Appbar.Content title={adding ? "Add rollcall" : "Edit rollcall"} />
        <Appbar.Action
          icon={adding ? "plus" : "pencil"}
          onPress={saveRollcall}
        />
      </Appbar.Header>
      <ScrollView className="p-4">
        <TextInput
          ref={descriptionRef}
          className="mb-4"
          value={description}
          onChangeText={(text) => setDescription(text)}
          label={"Description"}
          mode="outlined"
        />

        <View className="mb-4 flex-row justify-between">
          <View>
            <Text variant="labelLarge">Date</Text>
            <Text>{format(date, "MM/dd")}</Text>
          </View>
          <Button mode="outlined" onPress={() => setDateVisibility(true)}>
            Set date
          </Button>
        </View>
        <View className="mb-4 flex-row justify-between">
          <View>
            <Text variant="labelLarge">Time start</Text>
            <Text>{format(set(timestart, new Date()), "hh:mm aa")}</Text>
          </View>
          <Button mode="outlined" onPress={() => showTimestart(true)}>
            Set start
          </Button>
        </View>
        <View className="mb-4 flex-row justify-between">
          <View>
            <Text variant="labelLarge">Time end</Text>
            <Text>{format(set(timeend, new Date()), "hh:mm aa")}</Text>
          </View>
          <Button mode="outlined" onPress={() => showTimeend(true)}>
            Set end
          </Button>
        </View>
        <Text variant="titleMedium" className="my-4">
          Choose location
        </Text>

        <RadioButton.Group
          value={String(locationId)}
          onValueChange={(val) => setLocationId(Number(val))}
        >
          {locations.map((loc, i) => (
            <Surface
              mode="flat"
              key={i}
              style={{
                marginBottom: 16,
                borderRadius: 8,
              }}
            >
              <TouchableRipple
                onPress={() => setLocationId(i)}
                className="rounded p-2"
              >
                <View className="flex-row items-center gap-2">
                  <Image source={loc.image} style={{ width: 80, height: 80 }} />
                  <RadioButton value={String(i)} />
                  <Text>{loc.name}</Text>
                </View>
              </TouchableRipple>
            </Surface>
          ))}
        </RadioButton.Group>

        <DatePickerModal
          locale="en"
          mode="single"
          visible={dateVisibility}
          onDismiss={() => setDateVisibility(false)}
          onConfirm={({ date }) => {
            if (date !== undefined) {
              const currentDate = midnight(new Date());
              const selectedDate = midnight(date);

              if (selectedDate >= currentDate) {
                setDate(date);
              }
            }

            setDateVisibility(false);
          }}
        />
        <TimePickerModal
          locale="en"
          visible={timeStartPickerVisibility}
          {...timestart}
          onDismiss={() => showTimestart(false)}
          onConfirm={(time) => {
            setTimestart(time);
            showTimestart(false);
          }}
        />
        <TimePickerModal
          locale="en"
          visible={timeEndPickerVisibility}
          onDismiss={() => showTimeend(false)}
          {...timeend}
          onConfirm={(time) => {
            setTimeend(time);
            showTimeend(false);
          }}
        />
      </ScrollView>
      {snackbar}
    </View>
  );
}

export default RollcallEdit;
