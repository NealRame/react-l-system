import { Symbols } from "./constants"

export interface ILSystemRenderDevice {
    forward(len: number): void
    move(len: number): void
    turn(angle: number): void
    push(): void
    pop(): void
    noop(): void
}

export type ILSystemRenderAction
    = {
    [K in keyof ILSystemRenderDevice]: [K,...Parameters<ILSystemRenderDevice[K]>]
}[keyof ILSystemRenderDevice]

export type ILSystemSymbols
    = typeof Symbols[number]

export type ILSystemWord<Alphabet extends ILSystemSymbols = ILSystemSymbols>
    = Array<Alphabet>

export type ILSystemProductionRulesMap<Alphabet extends ILSystemSymbols = ILSystemSymbols>
    = Partial<Record<Alphabet, ILSystemWord<Alphabet>>>

export type ILSystemRenderingRulesMap<Alphabet extends ILSystemSymbols = ILSystemSymbols>
    = Partial<Record<Alphabet, ILSystemRenderAction>>
