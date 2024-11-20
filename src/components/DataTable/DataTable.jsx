import React from "react";
import { useMemo, useCallback, useState, useEffect} from "react";
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
    const {cards, loadCards, loadCardsAndDate} = useCards();
    const params = useParams();
    const isParams = params.hasOwnProperty('deckid');
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [cardsData, setCards] = useState([]);
    const [sorting, setSorting] = useState([]);
    const [filtering, setFiltering] = useState("");
    const [rowSelection, setRowSelection] = useState("");
    const [showAdditionalComponent, setShowAdditionalComponent] = useState(false);
    
    const memoizedLoadCards = useCallback(loadCardsAndDate, []);
    useEffect(() => {
        if (isParams) {
            memoizedLoadCards(params.deckid).then((data) => setCards(data)); 
        }
    }, [isParams, params.deckid, memoizedLoadCards]);

    const data = useMemo(() => (
        cards?.map(({ id, typecard, content: { front, reverse }, racha, review_date }) => ({
            id,
            typecard,
            front,
            reverse,
            racha,
            review_date: new Date(review_date).toLocaleDateString(),
        })) ?? []
    ), [cards]);


    const handleRowClick  = (row) => {
      row.getToggleSelectedHandler();
      setShowAdditionalComponent(true);
      const originalCard = cards.find(card => card.id === row.original.id);
      setSelectedRowData(originalCard);
    };

    const columns = [
        {
            header: "ID",
            accessorKey: 'id'
        },
        {
            header: "Tipo",
            accessorKey: 'typecard'
        },
        {
            header: "Front",
            accessorKey: 'front'
        },
        {
            header: "Reverse",
            accessorKey: 'reverse'
        },
        {
          header: "Racha",
          accessorKey: 'racha'
      },
      {
        header: "Repaso",
        accessorKey: 'review_date'
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
      loadCardsAndDate(params.deckid).then((data) => setCards(data)); // Volver a cargar las tarjetas después de la actualización
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
    
    // <div className="table-form">
    <>
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
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <th
                                key={header.id}
                                className={
                                    ["typecard", "racha"].includes(header.id)
                                        ? "hide-on-small" // Oculta columnas específicas en pantallas pequeñas
                                        : ""
                                }
                            >
                                {header.isPlaceholder ? null : (
                                    <div
                                        onClick={header.column.getToggleSortingHandler()}
                                        title={
                                            header.column.getCanSort()
                                                ? header.column.getNextSortingOrder() === "asc"
                                                    ? "sort ascending"
                                                    : header.column.getNextSortingOrder() === "desc"
                                                    ? "sort descending"
                                                    : "Clear sort"
                                                : undefined
                                        }
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                        {{ asc: "↓", desc: "↑" }[header.column.getIsSorted()] ?? null}
                                    </div>
                                )}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {table.getRowModel().rows.map((row) => (
                    <tr
                        key={row.id}
                        className={row.id % 2 === 0 ? "even-row" : "odd-row"}
                        onClick={() => handleRowClick(row)}
                    >
                        {row.getVisibleCells().map((cell) => (
                            <td
                                key={cell.id}
                                className={
                                    ["typecard", "racha"].includes(cell.column.id)
                                        ? "hide-on-small" // Oculta estas columnas en pantallas pequeñas
                                        : ""
                                }
                            >
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
            <span className="textos-footer-table">
              <div>Pag</div>
              <strong>
                {table.getState().pagination.pageIndex + 1} of{' '}
                {table.getPageCount().toLocaleString()}
              </strong>
            </span>
            <span className="textos-footer-table">
              | Pagina:
              <input
                type="number"
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={e => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0
                  table.setPageIndex(page)
                }}
                className="input-page-table"
              />
            </span>
          <select className="select-min"
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

      {showAdditionalComponent && (
          <CardFormPageEdit CardObject={selectedRowData} onClose={handleCloseFormulario} handleUpdateRow={handleUpdateRow} />
      )}
      {/* {showAdditionalComponent && selectedRowData.typecard === '2' && (
          <button>hl</button>
      )} */}
      </div>
      </>
    // </div>
  )
}
export default DataTable