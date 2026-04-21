import { v4 as uuid } from 'uuid'

export class Id {
    constructor(readonly value: string) {}
    static generate(): string {
        return uuid()
    }
}