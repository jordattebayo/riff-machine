export interface TodoItem {
    id?: number;
    name: string;
    date_created?: Date;
    iscomplete: string;
}

export interface Riff {
    id?: number;
    riff: string;
    dateCreated?: Date;
    author?: string;
    documentType?: string;
}
