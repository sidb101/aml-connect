// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.
import type { ParameterMetadata } from "./ParameterMetadata";
import type { TerminalMetadata } from "./TerminalMetadata";

export interface ElementMetadata { short_description: string, long_description: string, type_name: string, terminals: Record<string, TerminalMetadata>, parameters: Record<string, ParameterMetadata> | null, }