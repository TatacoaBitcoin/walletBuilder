import { useCallback } from 'react';
import { BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

/**
 * Custom hook to prevent the hardware back button from navigating back.
 *
 * @param {boolean} [shouldPrevent=true] - If set to false, the back button will function normally.
 */
const usePreventGoBack = (shouldPrevent = true) => {
  useFocusEffect(
    useCallback(() => {
      // This is the function that runs when the hardware back button is pressed.
      const onBackPress = () => {
        // By returning 'true', we tell the system that we have handled
        // the event and the default behavior (navigating back) should not occur.
        return true;
      };

      if (shouldPrevent) {
        // Add the event listener for the hardware back button.
        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          onBackPress,
        );

        // Cleanup function to remove the listener when the component is unmounted or unfocused.
        return () => backHandler.remove();
      }

      // Return a no-op cleanup if not preventing go back
      return () => {};
    }, [shouldPrevent]),
  );
};

export default usePreventGoBack;
