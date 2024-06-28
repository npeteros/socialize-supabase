export interface Account {
    githubId: number | null;
    email: string;
    displayName: string;
    bio?: string;
    imgUrl?: string;
    username: string;
}