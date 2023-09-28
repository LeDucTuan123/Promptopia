export interface PostType{
    _id: string;
    creator : {
        _id: string;
        email: string;
        username: string;
        image: string
    };
    prompt: string;
    tag: string;
    role: string;
    like: number;
}

