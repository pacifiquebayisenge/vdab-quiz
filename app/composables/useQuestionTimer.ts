// countdown timer for  quiz question.
//  Calls onTimeUp when the countdown reaches zero.

export function useQuestionTimer(onTimeUp: () => void) {
  const timeLimit = ref(0);

  let interval: ReturnType<typeof setInterval> | null = null;

  // Stop the active timer and clear its interval.
  function stop() {
    if (interval !== null) {
      clearInterval(interval);
      interval = null;
    }
  }

  function start(seconds: number) {
    stop();

    timeLimit.value = seconds;

    interval = setInterval(() => {
      if (timeLimit.value > 0) {
        timeLimit.value--;
      }

      if (timeLimit.value === 0) {
        stop();
        onTimeUp();
      }
    }, 1000);
  }

  // Clean up the timer when the component is unmounted.
  onUnmounted(stop);

  return {
    timeLimit,
    start,
    stop,
  };
}
