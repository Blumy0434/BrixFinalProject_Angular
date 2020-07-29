export class IPaginationModel{
    selectItemsPerPage: number[] = [3,5, 10, 25, 100];
    pageSize = this.selectItemsPerPage[0];
    pageIndex = 1;
    allItemsLength = 0;
    sortBy :string 
}