import { useEffect, useRef } from "react";

function usePreviousValue<T>(data: T): T {
  const ref: any = useRef<T>();
  useEffect(() => {
    ref.current = data;
  });
  return ref.current;
}

export default usePreviousValue;
