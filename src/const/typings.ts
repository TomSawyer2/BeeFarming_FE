/* eslint-disable no-unused-vars */
export type CodeType = 'honey-A' | 'honey-B' | 'hornet-A' | 'hornet-B';

export enum UserPermission {
  Banned = -1,
  User = 0,
  Admin = 1,
}

export enum UserStatus {
  Normal = 0,
  Running = 1,
}
