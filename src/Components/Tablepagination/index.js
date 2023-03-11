import React from "react";

import { Pagination, TablePagination } from "@mui/material";

export default function TablePaginations({
  data,
  pages,
  rowsPerpage,
  pageIndex,
  setPages,
  setPageIndex,
  setRowsPerPage,
}) {
  const handleChangePage = (event, newPage) => {
    setPages(newPage);
    setPageIndex(newPage - 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
  };

  return (
    <div>
       <div  style={{marginBottom:"-2.5%"}}>
      <TablePagination
        onPageChange={null}
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerpage}
        page={pageIndex}
        nextIconButtonProps={{ style: { display: "none" } }}
        backIconButtonProps={{ style: { display: "none" } }}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      </div>
      <Pagination
        color="primary"
        page={pages}
        count={Math.ceil(data.length / rowsPerpage)}
        onChange={handleChangePage}
      />
    </div>
  );
}
