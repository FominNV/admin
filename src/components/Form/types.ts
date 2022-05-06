import { Dispatch, SetStateAction } from "react"

export type CheckFieldType = (
  value: string,
  label: string,
  setState: Dispatch<SetStateAction<Nullable<string>>>
) => boolean;

export type WatchFieldType = (
  value: string,
  error: string,
  setState: Dispatch<SetStateAction<Nullable<string>>>
) => void;
