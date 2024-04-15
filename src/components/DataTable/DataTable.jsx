import { useEffect } from "react"
import { useState } from "react";
import { useMemo } from "react";
import {useForm} from "react-hook-form";
import { useParams } from "react-router-dom";
import { useCards } from "../../context/CardContext";
import  CardFormPageEdit  from "../../pages/Forms/CardFormPageEdit";
import{
    useReactTable, 
    getCoreRowModel, 
    flexRender, 
    getPaginationRowModel, 
    getSortedRowModel,
    getFilteredRowModel,
    } from '@tanstack/react-table'
import "./DataTable.css"

function DataTable() {
    const {register, handleSubmit, formState: {errors}, setValue} = useForm ();
    const {cards, loadCards} = useCards();
    const params = useParams();
    const isParams = params.hasOwnProperty('deckid');
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [cardsData, setCards] = useState([]);
    const [sorting, setSorting] = useState([]);
    const [filtering, setFiltering] = useState("");
    const [rowSelection, setRowSelection] = useState("");
    const [showAdditionalComponent, setShowAdditionalComponent] = useState(false);
    
    useEffect(() => {
      if (isParams) {
          loadCards(params.deckid).then((data) => setCards(data)); // Cargar las tarjetas al montar el componente
      }
  }, [isParams, params.deckid,loadCards]);

    const data = useMemo(() => (
        cards?.map(({ id, relation, content: { front, reverse } }) => ({
            id,
            relation,
            front,
            reverse,
        })) ?? []
    ), [cards]);

    const handleRowClick  = (row) => {
      row.getToggleSelectedHandler();
      setShowAdditionalComponent(true);
      setSelectedRowData(row.original);
    };

    const columns = [
        {
            header: "ID",
            accessorKey: 'id'
        },
        {
            header: "Front",
            accessorKey: 'front'
        },
        {
            header: "Reverse",
            accessorKey: 'reverse'
        },
    ]

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            rowSelection,
            sorting,
            globalFilter: filtering,
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
        onRowSelectionChange: setRowSelection,
        enableMultiRowSelection: false,

    });

    const handleUpdateRow = () => {
      loadCards(params.deckid).then((data) => setCards(data)); // Volver a cargar las tarjetas después de la actualización
  };

    const handleCloseFormulario = () => {
      setShowAdditionalComponent(false);
    };

    if (table.getState().rowSelection) { // Verifica si hay un estado de tabla válido antes de intentar acceder a la selección de filas
      const selectedRows = table.getSelectedRowModel().rows;
      if (selectedRows.length > 0) { // Verifica si hay al menos una fila seleccionada
        console.log("select:", selectedRows[0].original);

      } else {
        console.log("No rows selected.");
      }
    } else {
      console.log("Row selection not enabled.");
    }
  return (
    
    <div className="table-form">
        <div className={`${showAdditionalComponent? 'table-space-left':'table-space'}`}>
          <input
              className="input-search"
              type="text"
              value={filtering}
              onChange={(e)=> setFiltering(e.target.value)}
              placeholder="Search"
          />
          <table className="table-style">
              <thead className="thead-style">
                  {
                      table.getHeaderGroups().map((headerGroup) => (
                          <tr key={headerGroup.id}>
                              {
                                  headerGroup.headers.map((header) => (
                                      <th key={header.id}
                                          
                                      >
                                          {header.isPlaceholder ? null : (
                                              <div
                                                  onClick={header.column.getToggleSortingHandler()}
                                                  title={
                                                      header.column.getCanSort()
                                                      ? header.column.getNextSortingOrder() === 'asc'
                                                        ? 'sort ascending'
                                                        : header.column.getNextSortingOrder() === 'desc'
                                                        ? 'sort descending'
                                                        : 'Clear sort'
                                                      :undefined
                                                  }   
                                              >
                                                {flexRender(
                                                      header.column.columnDef.header, 
                                                      header.getContext()
                                                  )}

                                                {
                                                      {asc: "↓" , desc : "↑",
                                                  }[header.column.getIsSorted()] ?? null}
                                              </div>
                                          )}
                                      </th>
                                  ))}
                          </tr>
                      ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row)=> (
                      <tr key={row.id}
                      className={row.id % 2 === 0 ? "even-row" : "odd-row"}
                      onClick={() => handleRowClick(row)}>
                          {row.getVisibleCells().map((cell) => (
                              <td key={cell.id}>
                                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              </td>
                          ))}
                      </tr>
                  ))} 
              </tbody>
          </table>
          <div className="footer-buttons">
            <button
              className="border rounded p-1"
              onClick={() => table.firstPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {'<<'}
            </button>
            <button
              className="border rounded p-1"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {'<'}
            </button>
            <button
              className="border rounded p-1"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {'>'}
            </button>
            <button
              className="border rounded p-1"
              onClick={() => table.lastPage()}
              disabled={!table.getCanNextPage()}
            >
              {'>>'}
            </button>
            <span className="flex items-center gap-1">
              <div>Page</div>
              <strong>
                {table.getState().pagination.pageIndex + 1} of{' '}
                {table.getPageCount().toLocaleString()}
              </strong>
            </span>
            <span className="flex items-center gap-1">
              | Go to page:
              <input
                type="number"
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={e => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0
                  table.setPageIndex(page)
                }}
                className="border p-1 rounded w-16"
              />
            </span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={e => {
              table.setPageSize(Number(e.target.value))
            }}
          >
            {[10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className={`${showAdditionalComponent ? 'form-card-edit' : ''}`}>
        {showAdditionalComponent && <CardFormPageEdit CardObject={selectedRowData} onClose={handleCloseFormulario} handleUpdateRow={handleUpdateRow} />}
      </div>
    </div>
  )
}
export default DataTable