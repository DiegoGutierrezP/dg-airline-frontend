export interface ServerError {
  status: 500
  data: {
    status: number
    type: string
    title: string
    detail: string
    traceId: string
  }
}

interface ErrorResponse {
  status: 401
  data: {
    message: string
  }
}

interface SuccessResponse<T> {
  status: 200 | 201
  data: T
}

type CustomResponse<T> = SuccessResponse<T> | ErrorResponse | ServerError


export async function fetcher<TRequest, TResponse>({
  endpoint,
  method = 'GET',
  cache = 'no-store',
  headers,
  body,
  formatResponse = 'json',
  queryParams,
}: {
  endpoint: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  cache?: RequestCache
  headers?: HeadersInit
  body?: TRequest
  needAuth?: boolean
  formatResponse?: 'json' | 'text'
  queryParams?: Record<string, any>
}): Promise<CustomResponse<TResponse> | never> {

  const queryString =
    queryParams &&
    Object.entries(queryParams)
      .filter(
        ([_, value]) => value !== null && value !== undefined && value !== '',
      ) // Filtrar propiedades con valor null, undefined o ''
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
      )
      .join('&')

  try {

    const url = queryString ? `${endpoint}?${queryString}` : endpoint

    const result = await fetch(`${url}`, {
      method,
      cache,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body && JSON.stringify({ ...body }),
    })

    let res = null

    if (formatResponse === 'json') {
      res = await result.json()
    } else {
      res = await result.text()
    }

    if (res.errors) {
      throw res.errors[0]
    }

    return {
      data: res,
      status: result.status as any,
    }
  } catch (e) {
    throw {
      error: e,
      // body,
    }
  }
}
