/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  MetadataDelegateRole,
  TokenStandard,
  TokenStandardArgs,
  findMetadataDelegateRecordPda,
  findMetadataPda,
  getTokenStandardSerializer,
} from '@metaplex-foundation/mpl-token-metadata';
import {
  Context,
  Pda,
  PublicKey,
  Signer,
  TransactionBuilder,
  publicKey,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import {
  Serializer,
  array,
  mapSerializer,
  struct,
  u8,
} from '@metaplex-foundation/umi/serializers';
import { findCandyMachineAuthorityPda } from '../../hooked';
import {
  ResolvedAccount,
  ResolvedAccountsWithIndices,
  expectPublicKey,
  getAccountMetasAndSigners,
} from '../shared';

// Accounts.
export type SetTokenStandardInstructionAccounts = {
  /** Candy Machine account. */
  candyMachine: PublicKey | Pda;
  /** Candy Machine authority. */
  authority?: Signer;
  /**
   * Authority PDA.
   *
   */

  authorityPda?: PublicKey | Pda;
  /** Payer of the transaction. */
  payer?: Signer;
  /**
   * Authorization rule set to be used by minted NFTs.
   *
   */

  ruleSet?: PublicKey | Pda;
  /**
   * Collection metadata delegate record.
   *
   */

  collectionDelegateRecord?: PublicKey | Pda;
  /**
   * Collection mint.
   *
   */

  collectionMint: PublicKey | Pda;
  /**
   * Collection metadata.
   *
   */

  collectionMetadata?: PublicKey | Pda;
  /**
   * Collection authority record.
   *
   */

  collectionAuthorityRecord?: PublicKey | Pda;
  /** Collection update authority. */
  collectionUpdateAuthority: Signer;
  /**
   * Token Metadata program.
   *
   */

  tokenMetadataProgram?: PublicKey | Pda;
  /** System program. */
  systemProgram?: PublicKey | Pda;
  /**
   * Instructions sysvar account.
   *
   */

  sysvarInstructions?: PublicKey | Pda;
  /**
   * Token Authorization Rules program.
   *
   */

  authorizationRulesProgram?: PublicKey | Pda;
  /**
   * Token Authorization rules account for the collection metadata (if any).
   *
   */

  authorizationRules?: PublicKey | Pda;
};

// Data.
export type SetTokenStandardInstructionData = {
  discriminator: Array<number>;
  tokenStandard: TokenStandard;
};

export type SetTokenStandardInstructionDataArgs = {
  tokenStandard: TokenStandardArgs;
};

export function getSetTokenStandardInstructionDataSerializer(): Serializer<
  SetTokenStandardInstructionDataArgs,
  SetTokenStandardInstructionData
> {
  return mapSerializer<
    SetTokenStandardInstructionDataArgs,
    any,
    SetTokenStandardInstructionData
  >(
    struct<SetTokenStandardInstructionData>(
      [
        ['discriminator', array(u8(), { size: 8 })],
        ['tokenStandard', getTokenStandardSerializer()],
      ],
      { description: 'SetTokenStandardInstructionData' }
    ),
    (value) => ({
      ...value,
      discriminator: [147, 212, 106, 195, 30, 170, 209, 128],
    })
  ) as Serializer<
    SetTokenStandardInstructionDataArgs,
    SetTokenStandardInstructionData
  >;
}

// Args.
export type SetTokenStandardInstructionArgs =
  SetTokenStandardInstructionDataArgs;

// Instruction.
export function setTokenStandard(
  context: Pick<Context, 'eddsa' | 'identity' | 'payer' | 'programs'>,
  input: SetTokenStandardInstructionAccounts & SetTokenStandardInstructionArgs
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey(
    'mplCandyMachineCore',
    'CndyV3LdqHUfDLmE5naZjVN8rBZz4tqhdefbAnjHG3JR'
  );

  // Accounts.
  const resolvedAccounts: ResolvedAccountsWithIndices = {
    candyMachine: {
      index: 0,
      isWritable: true,
      value: input.candyMachine ?? null,
    },
    authority: { index: 1, isWritable: false, value: input.authority ?? null },
    authorityPda: {
      index: 2,
      isWritable: true,
      value: input.authorityPda ?? null,
    },
    payer: { index: 3, isWritable: true, value: input.payer ?? null },
    ruleSet: { index: 4, isWritable: false, value: input.ruleSet ?? null },
    collectionDelegateRecord: {
      index: 5,
      isWritable: true,
      value: input.collectionDelegateRecord ?? null,
    },
    collectionMint: {
      index: 6,
      isWritable: false,
      value: input.collectionMint ?? null,
    },
    collectionMetadata: {
      index: 7,
      isWritable: true,
      value: input.collectionMetadata ?? null,
    },
    collectionAuthorityRecord: {
      index: 8,
      isWritable: true,
      value: input.collectionAuthorityRecord ?? null,
    },
    collectionUpdateAuthority: {
      index: 9,
      isWritable: false,
      value: input.collectionUpdateAuthority ?? null,
    },
    tokenMetadataProgram: {
      index: 10,
      isWritable: false,
      value: input.tokenMetadataProgram ?? null,
    },
    systemProgram: {
      index: 11,
      isWritable: false,
      value: input.systemProgram ?? null,
    },
    sysvarInstructions: {
      index: 12,
      isWritable: false,
      value: input.sysvarInstructions ?? null,
    },
    authorizationRulesProgram: {
      index: 13,
      isWritable: false,
      value: input.authorizationRulesProgram ?? null,
    },
    authorizationRules: {
      index: 14,
      isWritable: false,
      value: input.authorizationRules ?? null,
    },
  };

  // Arguments.
  const resolvedArgs: SetTokenStandardInstructionArgs = { ...input };

  // Default values.
  if (!resolvedAccounts.authority.value) {
    resolvedAccounts.authority.value = context.identity;
  }
  if (!resolvedAccounts.authorityPda.value) {
    resolvedAccounts.authorityPda.value = findCandyMachineAuthorityPda(
      context,
      { candyMachine: expectPublicKey(resolvedAccounts.candyMachine.value) }
    );
  }
  if (!resolvedAccounts.payer.value) {
    resolvedAccounts.payer.value = context.payer;
  }
  if (!resolvedAccounts.collectionDelegateRecord.value) {
    resolvedAccounts.collectionDelegateRecord.value =
      findMetadataDelegateRecordPda(context, {
        mint: expectPublicKey(resolvedAccounts.collectionMint.value),
        delegateRole: MetadataDelegateRole.Collection,
        updateAuthority: expectPublicKey(
          resolvedAccounts.collectionUpdateAuthority.value
        ),
        delegate: expectPublicKey(resolvedAccounts.authorityPda.value),
      });
  }
  if (!resolvedAccounts.collectionMetadata.value) {
    resolvedAccounts.collectionMetadata.value = findMetadataPda(context, {
      mint: expectPublicKey(resolvedAccounts.collectionMint.value),
    });
  }
  if (!resolvedAccounts.tokenMetadataProgram.value) {
    resolvedAccounts.tokenMetadataProgram.value = context.programs.getPublicKey(
      'mplTokenMetadata',
      'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
    );
    resolvedAccounts.tokenMetadataProgram.isWritable = false;
  }
  if (!resolvedAccounts.systemProgram.value) {
    resolvedAccounts.systemProgram.value = context.programs.getPublicKey(
      'splSystem',
      '11111111111111111111111111111111'
    );
    resolvedAccounts.systemProgram.isWritable = false;
  }
  if (!resolvedAccounts.sysvarInstructions.value) {
    resolvedAccounts.sysvarInstructions.value = publicKey(
      'Sysvar1nstructions1111111111111111111111111'
    );
  }

  // Accounts in order.
  const orderedAccounts: ResolvedAccount[] = Object.values(
    resolvedAccounts
  ).sort((a, b) => a.index - b.index);

  // Keys and Signers.
  const [keys, signers] = getAccountMetasAndSigners(
    orderedAccounts,
    'programId',
    programId
  );

  // Data.
  const data = getSetTokenStandardInstructionDataSerializer().serialize(
    resolvedArgs as SetTokenStandardInstructionDataArgs
  );

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}