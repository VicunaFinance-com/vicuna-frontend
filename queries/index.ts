import { mergeQueryKeys } from "@lukemorales/query-key-factory";
import { userQueries } from "@/queries/user";
import { marketsQueries } from "./markets";

export const queryKeys = mergeQueryKeys(userQueries, marketsQueries);
