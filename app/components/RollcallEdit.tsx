import React, { useContext, useEffect, useRef, useState } from "react";
import { RollcallsContext } from "./EventCreate";
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

function RollcallEdit(props: RollcallEditProps) {
  const [rollcall, setRollcalls] = useContext(RollcallsContext);

  const index = rollcall.findIndex((item) => item._key == props._key);
  const adding = index === -1;

  const [description, setDescription] = useState(
    adding ? "" : rollcall[index].description,
  );

  const [dateVisibility, setDateVisibility] = useState(false);
  const [timeStartPickerVisibility, showTimeStart] = useState(false);
  const [timeEndPickerVisibility, showTimeEnd] = useState(false);
  const [locationId, setLocationId] = useState(0);

  const [timestart, setTimestart] = useState(
    adding ? new Date() : rollcall[index].timestart,
  );
  const [timeend, setTimeend] = useState(
    adding ? addMinutes(15, new Date()) : rollcall[index].timeend,
  );

  const [snackbar, alert] = useSnackbar();
  const descriptionRef = useRef<_TextInput>(null);

  const saveRollcall = () => {
    if (description.length === 0) {
      alert("Description must not be empty");
      descriptionRef.current?.focus();
      return;
    }

    if (adding) {
      setRollcalls((prev) => [
        ...prev,
        {
          _key: props._key,
          description,
          timestart,
          timeend,
          location: locations[locationId].coordinates,
        },
      ]);
    } else {
      setRollcalls((prev) =>
        prev.map((item) =>
          item._key === props._key
            ? {
                _key: props._key,
                description,
                timestart,
                timeend,
                location: locations[locationId].coordinates,
              }
            : item,
        ),
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
            <Text>{format(timestart, "MM/dd")}</Text>
          </View>
          <Button mode="outlined" onPress={() => setDateVisibility(true)}>
            Set date
          </Button>
        </View>
        <View className="mb-4 flex-row justify-between">
          <View>
            <Text variant="labelLarge">Time start</Text>
            <Text>{format(timestart, "hh:mm aa")}</Text>
          </View>
          <Button mode="outlined" onPress={() => showTimeStart(true)}>
            Set start
          </Button>
        </View>
        <View className="mb-4 flex-row justify-between">
          <View>
            <Text variant="labelLarge">Time end</Text>
            <Text>{format(timeend, "hh:mm aa")}</Text>
          </View>
          <Button mode="outlined" onPress={() => showTimeEnd(true)}>
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
                className="flex-row items-center gap-2 rounded p-2"
              >
                <>
                  <Image source={loc.image} style={{ width: 80, height: 80 }} />
                  <RadioButton value={String(i)} />
                  <Text>{loc.name}</Text>
                </>
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
            const currentTime = set(
              { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 },
              new Date(),
            );
            const selectedTime = new Date(date?.toDateString()!);
            if (selectedTime >= currentTime) {
              setTimestart(selectedTime);
            }
            setDateVisibility(false);
          }}
        />
        <TimePickerModal
          locale="en"
          visible={timeStartPickerVisibility}
          hours={timestart.getHours()}
          minutes={timestart.getMinutes()}
          onDismiss={() => showTimeStart(false)}
          onConfirm={(time) => {
            let selectedTime = set(time, timestart);
            if (selectedTime > timeend) {
              setTimeend((prev) => addDays(1, prev));
            }
            setTimestart(selectedTime);
            showTimeStart(false);
          }}
        />
        <TimePickerModal
          locale="en"
          visible={timeEndPickerVisibility}
          onDismiss={() => showTimeEnd(false)}
          hours={timeend.getHours()}
          minutes={timeend.getMinutes()}
          onConfirm={(time) => {
            let selectedTime = set(time, timestart);
            if (timestart > selectedTime)
              selectedTime = addDays(1, selectedTime);
            setTimeend(selectedTime);
            showTimeEnd(false);
          }}
        />
      </ScrollView>
      {snackbar}
    </View>
  );
}

export default RollcallEdit;
