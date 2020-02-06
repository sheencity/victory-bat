export interface IResponse {
    code: number;
    message: string;
    result: IResult;
    success: boolean;
    fail: boolean;
}

export interface Item {
    cityKey: string;
    sourceId: string;
    // 新闻链接
    url: string;
    // 新闻标题
    content: string;
    // 新闻发布的时间
    sendTime: string;
    // 新闻来源
    fromName: string;
}


export interface IResult {
    pageNum: number;
    pageSize: number;
    size: number;
    startRow: number;
    endRow: number;
    total: number;
    pages: number;
    list: Item[];
    prePage: number;
    nextPage: number;
    isFirstPage: true
    isLastPage: boolean;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    navigatePages: number;
    navigatepageNums: number[];
    navigateFirstPage: number;
    navigateLastPage: number;
    lastPage: number;
    firstPage: number;
}