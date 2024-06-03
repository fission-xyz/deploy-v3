export type MigrationOptions = {
  cwd: string;
  network: string;
  envs: Record<string, string>;
  verify?: boolean;
};
