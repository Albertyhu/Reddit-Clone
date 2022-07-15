const range = (start, end) => {
    const length = end - start + 1; 
    return Array.from({ length }, (_, ind) => { ind + start})
}  

const DOTS = "..."; 
//only show the dots on the left side of pagination when current page is more than 2 
//only show the right dots when the current page is more than 2 pages away from the totalPage

//siblingCount: The number of siblings you want to show on your pagination component
//Siblings are the page numbers that consecutive to the current page and that are rendered in the pagination 

const usePagination = ({
        totalCount,
        pageSize,
        siblingCount = 1,
        currentPage
}) => {

    const paginationRange = useMemo(() => {
        const totalPageCount = Math.ceil(totalCount / pageSize)

        //totalPagenNumbers is the number of page numbers we want to show in our pagination component
        const totalPageNumbers = siblingCount + 5; 
    }, [])

}