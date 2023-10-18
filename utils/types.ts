import { Dispatch } from "react";

export interface DefaultContext<T> {
  state: T;
  dispatch: null | Dispatch<any>;
}
