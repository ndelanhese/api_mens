interface IColumnError {
  line: number;
  column: string;
  message: string;
}

export interface IImportProducts {
  errors: IColumnError[] | null;
  successfulRows: number;
}
