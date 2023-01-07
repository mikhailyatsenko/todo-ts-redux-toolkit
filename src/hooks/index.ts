import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import type { Rootstate, AppDispatch } from "../store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<Rootstate> = useSelector;
