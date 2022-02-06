export interface CliConfig {
    modulePath: string,
    iconRelativePath: string,
    currentWorkingDir: string,
    port: number,
    debug: boolean,
}
  
export interface AppConfig extends CliConfig {
    buildPath: string;
    iconPath: string;
}
  
export interface Icon {
    name: string,
    filePath: string,
    directory: string,
    alias: string | null,
    depth: number,
    hash: number,
}