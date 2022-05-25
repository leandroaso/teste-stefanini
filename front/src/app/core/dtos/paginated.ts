export class Paginated<T> {
    content: Array<T>;
    count: number;
    pageSize: number;
    pageNumber: number;

    constructor(){
        this.pageSize = 10;
        this.pageNumber= 0;
    }
}
