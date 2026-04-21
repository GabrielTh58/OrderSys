export interface EntityProps {
    id?: string
}

export class Entity <Props extends EntityProps> {
    constructor(
        readonly id: string,
        readonly props: Props
    ){}
}