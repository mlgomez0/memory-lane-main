export interface MemoryType {
    id: number;
    name: string;
    description: string;
    timestamp: string;
    image: Blob;
}

export interface MemoryModalType {
    id?:string
    name: string
    description: string
    timestamp: string
    image: File | null
    imagename?: string
}