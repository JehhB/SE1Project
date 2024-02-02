import React, { useState } from "react";
import { Snackbar } from "react-native-paper";

export function useSnackbar(): [
  snackbar: React.JSX.Element,
  alert: (message: string) => void,
] {
  const [message, setMessage] = useState<string | null>(null);
  function dismiss() {
    setMessage(null);
  }

  const errorComponent = (
    <Snackbar
      visible={message != null}
      onDismiss={dismiss}
      action={{
        label: "Dismiss",
        onPress: dismiss,
      }}
    >
      {message}
    </Snackbar>
  );

  return [
    errorComponent,
    (message) => {
      setMessage(message);
    },
  ];
}

export default useSnackbar;
