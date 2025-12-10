import * as React from "react";
import {
  tableContainer,
  tableBase,
  header,
  body,
  headerRow,
  bodyRow,
  cellBase,
  headerCell,
  cell,
  align as alignVariants,
  columnTitle,
  columnTitleButton,
  sortIcon,
} from "./table.css";
import { classNames } from "../../utils/classNames";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ArrowsUpDownIcon,
} from "@heroicons/react/24/outline";

export type TableAlign = "left" | "center" | "right";
export type SortDirection = "asc" | "desc" | null;

type TableProps = React.TableHTMLAttributes<HTMLTableElement>;

type TableComponent = React.FC<TableProps> & {
  Head: typeof TableHead;
  Body: typeof TableBody;
  HeadRow: typeof TableHeadRow;
  Row: typeof TableRow;
  HeaderCell: typeof TableHeaderCell;
  Cell: typeof TableCell;
  ColumnTitle: typeof ColumnTitle;
};

type TableHeadProps = React.HTMLAttributes<HTMLTableSectionElement>;

export function TableHead({ className, children, ...rest }: TableHeadProps) {
  return (
    <thead className={classNames(header, className)} {...rest}>
      {children}
    </thead>
  );
}

type TableBodyProps = React.HTMLAttributes<HTMLTableSectionElement>;

export function TableBody({ className, children, ...rest }: TableBodyProps) {
  return (
    <tbody className={classNames(body, className)} {...rest}>
      {children}
    </tbody>
  );
}

type TableHeadRowProps = React.HTMLAttributes<HTMLTableRowElement>;

export function TableHeadRow({
  className,
  children,
  ...rest
}: TableHeadRowProps) {
  return (
    <tr className={classNames(headerRow, className)} {...rest}>
      {children}
    </tr>
  );
}

type TableRowProps = React.HTMLAttributes<HTMLTableRowElement>;

export function TableRow({ className, children, ...rest }: TableRowProps) {
  return (
    <tr className={classNames(bodyRow, className)} {...rest}>
      {children}
    </tr>
  );
}

type BaseCellProps = {
  align?: TableAlign;
  className?: string;
  children?: React.ReactNode;
} & React.ThHTMLAttributes<HTMLTableCellElement>;

export function TableHeaderCell({
  align = "left",
  className,
  children,
  ...rest
}: BaseCellProps) {
  return (
    <th
      scope="col"
      className={classNames(
        cellBase,
        headerCell,
        alignVariants[align],
        className
      )}
      {...rest}
    >
      {children}
    </th>
  );
}

type TableCellProps = {
  align?: TableAlign;
  className?: string;
  children?: React.ReactNode;
} & React.TdHTMLAttributes<HTMLTableCellElement>;

export function TableCell({
  align = "left",
  className,
  children,
  ...rest
}: TableCellProps) {
  return (
    <td
      className={classNames(cellBase, cell, alignVariants[align], className)}
      {...rest}
    >
      {children}
    </td>
  );
}

type ColumnTitleProps = {
  children: React.ReactNode;
  sortable?: boolean;
  sortDirection?: SortDirection;
  onClick?: () => void;
  align?: TableAlign;
  className?: string;
};

export function ColumnTitle({
  children,
  sortable = false,
  sortDirection = null,
  onClick,
  align = "left",
  className,
}: ColumnTitleProps) {
  const Icon =
    sortDirection === "asc"
      ? ArrowUpIcon
      : sortDirection === "desc"
      ? ArrowDownIcon
      : ArrowsUpDownIcon;

  if (sortable) {
    return (
      <button
        type="button"
        className={classNames(
          columnTitleButton,
          alignVariants[align],
          className
        )}
        onClick={onClick}
        aria-sort={
          sortDirection === "asc"
            ? "ascending"
            : sortDirection === "desc"
            ? "descending"
            : "none"
        }
      >
        <span>{children}</span>
        <Icon width={16} height={16} className={sortIcon} aria-hidden="true" />
      </button>
    );
  }

  return (
    <span className={classNames(columnTitle, alignVariants[align], className)}>
      <span>{children}</span>
      <ArrowsUpDownIcon
        width={16}
        height={16}
        className={sortIcon}
        aria-hidden="true"
      />
    </span>
  );
}

const TableRoot: React.FC<TableProps> = ({ className, children, ...rest }) => {
  return (
    <div className={tableContainer}>
      <table className={classNames(tableBase, className)} {...rest}>
        {children}
      </table>
    </div>
  );
};

export const Table = Object.assign(TableRoot, {
  Head: TableHead,
  Body: TableBody,
  HeadRow: TableHeadRow,
  Row: TableRow,
  HeaderCell: TableHeaderCell,
  Cell: TableCell,
  ColumnTitle,
}) as TableComponent;

