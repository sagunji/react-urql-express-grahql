import { invalidateFields } from "./handlers"

export function createRevengeUpdate(result, args, cache) {
  invalidateFields(cache, ['revenges'])
}