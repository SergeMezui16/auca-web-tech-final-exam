import { useQuery, useMutation as useM, useQueryClient } from "@tanstack/react-query";

export const useFetchQuery = (url, params, searchParams) => {
  const localUrl = buildLocalUrl(url, params);
  const queryParams = buildQueryString(searchParams);

  return useQuery({
    queryKey: [url, {params, queryParams}],
    queryFn: async () => {
      return fetch(localUrl + queryParams, {
        headers: {
          Accept: "application/json"
        },
        method: "get"
      }).then((r) => responseHandle(r));
    },
    throwOnError: true
  });
};

export const useMutation = (url, params, method, invalidate) => {
  const queryClient = useQueryClient();
  const localUrl = buildLocalUrl(url, params);

  return useM({
    mutationFn: async (data) => {
      return fetch(localUrl, {
        method: method ?? "post",
        body: (data && method !== "get") ? JSON.stringify(removeEmptyStrings(data)) : null,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        }
      }).then((r) => responseHandle(r));
    },
    onSuccess: async () => {
      await Promise.all(
        [invalidate?.map((q) => {
          return queryClient.invalidateQueries({queryKey: [q]});
        })]
      );
    }
  });
};

export const useMultipart = (url, params, invalidate) => {
  const queryClient = useQueryClient();
  const localUrl = buildLocalUrl(url, params);

  return useM({
    mutationFn: async (data) => {
      return fetch(localUrl, {
        method: "post",
        body: data
      }).then((r) => responseHandle(r));
    },
    onSuccess: async () => {
      await Promise.all(
        [invalidate?.map((q) => {
          return queryClient.invalidateQueries({queryKey: [q]});
        })]
      );
    }
  });
};

export const useDeleteQuery = (url, params, invalidate) => {
  const queryClient = useQueryClient();
  const localUrl = buildLocalUrl(url, params);

  return useM({
    mutationFn: async () => {
      return fetch(localUrl, {
        method: "delete",
        headers: {
          Accept: "application/json"
        }
      }).then((r) => responseHandle(r));
    },
    onSuccess: async () => {
      await Promise.all(
        [invalidate?.map((q) => {
          return queryClient.invalidateQueries({queryKey: [q]});
        })]
      );
    }
  });
};

export const extractServerErrors = (setError, error) => {
  if (error) {
    Object.entries(error).forEach(([key, value]) => {
      setError(key, {message: value});
    });
  }
};

// const addQueryParam = (name, value) => {
//   const url = new URL(location.href);
//
//   if (!value) {
//     url.searchParams.delete(name);
//     return url.toString();
//   }
//
//   url.searchParams.set(name, encodeURIComponent(value));
//   return url.toString();
// };
//
// const getAbsoluteUrl = (path) => {
//   return new URL(location.origin + path).href;
// };


const responseHandle = async (res) => {
  if (res.status === 200) return await res.json();

  if (res.status === 204) {
    return undefined;
  }

  if (res.status === 422) {
    throw (await res.json());
  }

  // if (res.status >= 500) {
  //   throw new ServerException({});
  // }
  //
  // if (res.status === 404) {
  //   throw new NotFoundException({});
  // }
  //
  // if (res.status === 401) {
  //   throw new UnauthorizedException({});
  // }
  //
  // if (res.status === 403) {
  //   throw new ForbiddenException({});
  // }

  return await res.json();
};


/**
 * Replace all params in the url
 *
 * ```ts
 * const path = "/persons/:id/properties/:propertyId"
 * const params = {id: 2, propertyId: 5}
 *
 * console.log(buildLocalUrl(path, params)) // "/persons/2/properties/5"
 * ```
 *
 * @param path
 * @param params
 */
export const buildLocalUrl = (path, params) => {
  return import.meta.env.VITE_API_URL + Object.entries(params ?? {})
    .reduce((acc, [key, value]) => acc.replace(":" + key, value.toString()),
      path
    );
};

/**
 * Create a string as query from params
 * It automatically remove params that are not defined
 *
 * ```ts
 * const params = {id: 1, name: "Serge", age: 22, work: ""};
 *
 * console.log(buildQueryString(params)) // "?id=1&name=serge&age=22"
 * ```
 * @param params
 */
const buildQueryString = (params) => {
  if (!params || Object.keys(params).length === 0) {
    return "";
  }

  const query = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== "")
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join("&");

  return query ? `?${query}` : "";
};

/**
 * Remove all empty strings in an object
 *
 * @param obj
 */
const removeEmptyStrings = (obj) => {
  return Object.keys(obj).reduce((acc, key) => {
    if (obj[key] !== "") {
      acc[key] = obj[key];
    }

    return acc;
  }, {});
};