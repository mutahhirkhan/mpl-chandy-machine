/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  DateTime,
  DateTimeInput,
  mapDateTimeSerializer,
} from '@metaplex-foundation/umi';
import { Serializer, i64, struct } from '@metaplex-foundation/umi/serializers';

/** Guard that sets a specific date for the mint to stop. */
export type EndDate = { date: DateTime };

export type EndDateArgs = { date: DateTimeInput };

export function getEndDateSerializer(): Serializer<EndDateArgs, EndDate> {
  return struct<EndDate>([['date', mapDateTimeSerializer(i64())]], {
    description: 'EndDate',
  }) as Serializer<EndDateArgs, EndDate>;
}