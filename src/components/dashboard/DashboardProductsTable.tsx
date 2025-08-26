import { useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { ProductType } from "../../types";
import clsx from "clsx";
import { ThemeContext } from "../../context/Theme-Context";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { useTranslation } from "react-i18next";
import { FaPlus, FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

const DashboardProductsTable = () => {
  const { theme } = useContext(ThemeContext);
  const isLight = theme === "light";

  const {
    i18n: { dir },
    t,
  } = useTranslation();

  const isLTR = dir() === "ltr";

  const [products, setProducts] = useState<ProductType[]>([]);
  const [selectedRowIds, setSelectedRowIds] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const debouncedSearch = useDebounce(searchTerm, 400);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get<{ products: ProductType[] }>(
        "https://dummyjson.com/products?limit=100"
      )
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (id: number) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
    setSelectedRowIds((prev) => prev.filter((selectedId) => selectedId !== id));
    toast.success(t("dashboard.product.toast.deletedSuccessfully"), {
      position: isLTR ? "top-right" : "top-left",
      style: {
        background: isLight ? "#f9fafb" : "#1C252E",
        color: isLight ? "#000000" : "#ffffff",
      },
    });
  };

  const columns: ColumnDef<ProductType>[] = [
    {
      id: "select",
      header: () => (
        <input
          type="checkbox"
          className="w-4 h-4"
          checked={
            selectedRowIds.length === products.length && products.length > 0
          }
          onChange={() => {
            if (selectedRowIds.length === products.length) {
              setSelectedRowIds([]);
            } else {
              setSelectedRowIds(products.map((p) => p.id));
            }
          }}
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          className="w-4 h-4"
          checked={selectedRowIds.includes(row.original.id)}
          onChange={() => {
            if (selectedRowIds.includes(row.original.id)) {
              setSelectedRowIds((prev) =>
                prev.filter((id) => id !== row.original.id)
              );
            } else {
              setSelectedRowIds((prev) => [...prev, row.original.id]);
            }
          }}
        />
      ),
    },
    { header: t("dashboard.product.table.header.title"), accessorKey: "title" },
    {
      header: t("dashboard.product.table.header.category"),
      accessorKey: "category",
    },
    { header: t("dashboard.product.table.header.stock"), accessorKey: "stock" },
    {
      header: t("dashboard.product.table.header.price"),
      accessorKey: "price",
      cell: ({ row }) => row.getValue("price") + " $",
    },
    {
      header: " ",
      id: "action",
      cell: ({ row }) => (
        <div className="flex items-center justify-evenly">
          <button
            className="px-3 py-1 bg-blue-500 text-white rounded-md cursor-pointer"
            onClick={() =>
              navigate(`/dashboard/product/edit/${row.original.id}`)
            }
          >
            {t("dashboard.product.table.header.edit")}
          </button>
          <button
            className="px-3 py-1 bg-red-500 text-white rounded-md cursor-pointer"
            onClick={() => handleDelete(row.original.id)}
          >
            {t("dashboard.product.table.header.delate")}
          </button>
        </div>
      ),
    },
  ];

  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map((p) => p.category)));
    return ["all", ...cats];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = products;
    if (categoryFilter !== "all") {
      result = result.filter((p) => p.category === categoryFilter);
    }

    if (debouncedSearch) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    return result;
  }, [debouncedSearch, products, categoryFilter]);

  const table = useReactTable({
    data: filteredProducts,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 5 } },
  });

  return (
    <div
      className={clsx(
        "w-10/12 rounded-xl shadow transition",
        isLight ? "bg-white" : "bg-secondaryDarkBg"
      )}
    >
      {loading ? (
        <div
          className={clsx(
            "bg-transparent h-[500px] flex items-center justify-center rounded-xl"
          )}
        >
          <div className="w-24 h-24 border-4 border-indigo-600 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <div className="p-4 flex flex-col items-center sm:flex-row gap-4">
              <input
                type="text"
                placeholder={t("dashboard.product.table.searchPlace")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={clsx(
                  "w-full sm:w-1/2 px-3 py-2 rounded-md border outline-none transition",
                  isLight
                    ? "bg-gray-50 border-gray-300 text-black"
                    : "bg-[#2b3642] border-gray-600 text-white"
                )}
              />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className={clsx(
                  "px-3 py-2 rounded-md border outline-none transition w-full sm:w-1/4",
                  isLight
                    ? "bg-gray-50 border-gray-300 text-black"
                    : "bg-[#2b3642] border-gray-600 text-white"
                )}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "all"
                      ? t("dashboard.product.table.header.allCategories")
                      : cat}
                  </option>
                ))}
              </select>
              <Link
                to="/dashboard/product/create"
                className="bg-indigo-600 w-full sm:w-44 sm:ml-36 text-white font-semibold px-4 py-2 flex items-center rounded-md cursor-pointer"
              >
                <p className={clsx(isLTR ? "pr-4" : "pl-4")}>
                  {t("dashboard.product.table.addProduct")}
                </p>
                <FaPlus />
              </Link>
            </div>

            <table className="min-w-full table-fixed">
              <thead
                className={clsx(
                  "transition",
                  isLight ? "bg-gray-100" : "bg-gray-700/50"
                )}
              >
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header, index) => (
                      <th
                        className={clsx(
                          "px-4 py-2.5 whitespace-nowrap transition",
                          isLTR ? "text-left" : "text-right",
                          isLight ? "text-gray-700" : "text-gray-400",
                          index === 0
                            ? "w-[50px]"
                            : index === 1
                            ? "w-[350px]"
                            : "w-[200px]"
                        )}
                        key={header.id}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>

              <tbody>
                {table.getRowModel().rows.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length}>
                      <div className="flex flex-col items-center justify-center py-16">
                        <div className="w-20 h-20 flex items-center justify-center rounded-full bg-indigo-100 mb-6">
                          <FaSearch />
                        </div>
                        <p className="text-lg font-semibold text-gray-600">
                          {t("dashboard.product.table.noData.header")}
                        </p>
                        <p className="text-sm text-gray-400 mt-2">
                          {t("dashboard.product.table.noData.subheader")}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  table.getRowModel().rows.map((row) => {
                    const isSelected = selectedRowIds.includes(row.original.id);
                    return (
                      <tr
                        key={row.id}
                        className={clsx(
                          "h-16 transition border-b-1 border-dashed",
                          isLight
                            ? isSelected
                              ? "bg-indigo-100 hover:bg-indigo-200"
                              : "hover:bg-indigo-50 border-b-gray-700"
                            : isSelected
                            ? "bg-indigo-600/70 hover:bg-indigo-500/80"
                            : "hover:bg-indigo-500 border-b-gray-500"
                        )}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <td
                            key={cell.id}
                            className={clsx(
                              "px-4 py-2 font-semibold whitespace-nowrap transition",
                              isLight ? "text-black" : "text-white"
                            )}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        ))}
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          <div
            dir="ltr"
            className={clsx(
              "transition flex flex-col sm:flex-row items-center justify-between py-3 px-4 mt-4 gap-3 font-semibold",
              isLight ? "text-gray-800" : "text-white"
            )}
          >
            <div>
              {t("dashboard.product.table.footer.rowsPerPage")}
              <select
                className={clsx(
                  "transition px-2 py-1 border-none outline-none ml-2 rounded",
                  isLight ? "bg-white" : "bg-secondaryDarkBg"
                )}
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value));
                }}
              >
                {[5, 10, 20].map((pageSize) => (
                  <option
                    key={pageSize}
                    value={pageSize}
                    className="font-semibold"
                  >
                    {pageSize}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-4">
              <span>
                {t("dashboard.product.table.footer.page")}{" "}
                {table.getState().pagination.pageIndex + 1}{" "}
                {t("dashboard.product.table.footer.of")} {table.getPageCount()}
              </span>
              <div className="flex items-center gap-2">
                <button
                  className="text-2xl cursor-pointer disabled:opacity-50"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <MdOutlineKeyboardArrowLeft />
                </button>

                <button
                  className="text-2xl cursor-pointer disabled:opacity-40"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <MdOutlineKeyboardArrowRight />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardProductsTable;
