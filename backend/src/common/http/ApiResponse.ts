export type SuccessResponse<T> = {
  success: true;
  data: T;
};

export type PaginatedMeta = {
  page: number;
  limit: number;
  total: number;
};

export type PaginatedResponse<T> = {
  success: true;
  data: T[];
  meta: PaginatedMeta;
};

export const createSuccessResponse = <T>(data: T): SuccessResponse<T> => ({
  success: true,
  data,
});

export const createPaginatedResponse = <T>(data: T[], meta: PaginatedMeta): PaginatedResponse<T> => ({
  success: true,
  data,
  meta,
});
