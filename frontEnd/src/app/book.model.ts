export class BookModel {
    constructor(
        public title: string,
        public author: string,
        public synopsis: string,
        public genre: string,
        public language: string,
        public year: number,
        public addedBy: string,
        public image: string
    ) {}
}
