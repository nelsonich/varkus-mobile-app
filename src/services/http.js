import { REACT_APP_API_BASEURL } from '@env';

const defaultHeaders = {};

export function setDefaultHeader(name, value) {
    defaultHeaders[name] = value;
}

export function removeDefaultHeader(name) {
    delete defaultHeaders[name];
}

const HttpMethodEnum = Object.freeze({
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    PATCH: "PATCH",
    DELETE: "DELETE",
});

function normalizeHeaders(headers) {
    const mergedHeaders = { ...defaultHeaders, ...headers };
    const finalHeaders = {};

    for (const headerKey in mergedHeaders) {
        finalHeaders[headerKey.toLowerCase()] = mergedHeaders[headerKey];
    }

    if (!finalHeaders["content-type"]) {
        finalHeaders["content-type"] = "application/json";
    }

    return finalHeaders;
}

function send(
    url,
    method,
    queryParams = {},
    data = {},
    headers = {},
    normalizeHeadersBeforeSend = true
) {
    let queryString = "";
    let requestBody = undefined;

    if (method === HttpMethodEnum.GET) {
        data = { ...queryParams, ...data };

        queryString = Object.keys(data)
            .reduce((acc, key) => {
                return [...acc, `${key}=${encodeURIComponent(data[key])}`];
            }, [])
            .join("&");

        if (queryString !== "") {
            const glue = url.includes("?") ? "&" : "?";
            queryString = glue + queryString;
        }
    } else {
        if (typeof data === "object") {
            if (data instanceof File) {
                requestBody = data;

                headers["X-File-Content-Type"] = "image/jpeg";
                headers["Content-Type"] = "image/jpeg";
                headers["Content-Length"] = data.size.toString();
            } else {
                requestBody = JSON.stringify(data);
            }
        } else {
            requestBody = data;
        }
    }

    const fullUrl = `${url}${queryString}`;
    if (normalizeHeadersBeforeSend) {
        headers = normalizeHeaders(headers);
    }

    const options = {
        method: method,
        body: requestBody,
        headers: headers,
    };

    return fetch(fullUrl, options);
}

function sendApi(
    endpoint,
    method,
    queryParams = {},
    data = {},
    headers = {},
    normalizeHeadersBeforeSend = true
) {
    let url = REACT_APP_API_BASEURL;
    if (url.endsWith("/")) {
        url = url.substring(0, url.length - 1);
    }
    if (!endpoint.startsWith("/")) {
        endpoint = "/" + endpoint;
    }

    return send(
        `${url}${endpoint}`,
        method,
        queryParams,
        data,
        headers,
        normalizeHeadersBeforeSend
    );
}

function sendExternal(
    url,
    method,
    queryParams = {},
    data = {},
    headers = {},
    normalizeHeadersBeforeSend = true
) {
    return send(
        url,
        method,
        queryParams,
        data,
        headers,
        normalizeHeadersBeforeSend
    );
}

export function apiGet(
    endpoint,
    queryParams = {},
    headers = {},
    normalizeHeadersBeforeSend = true
) {
    return sendApi(
        endpoint,
        HttpMethodEnum.GET,
        queryParams,
        {},
        headers,
        normalizeHeadersBeforeSend
    );
}

export function apiPost(
    endpoint,
    queryParams = {},
    data = {},
    headers = {},
    normalizeHeadersBeforeSend = true
) {
    return sendApi(
        endpoint,
        HttpMethodEnum.POST,
        queryParams,
        data,
        headers,
        normalizeHeadersBeforeSend
    );
}

export function apiPut(
    endpoint,
    queryParams = {},
    data = {},
    headers = {},
    normalizeHeadersBeforeSend = true
) {
    return sendApi(
        endpoint,
        HttpMethodEnum.PUT,
        queryParams,
        data,
        headers,
        normalizeHeadersBeforeSend
    );
}

export function apiPatch(
    endpoint,
    queryParams = {},
    data = {},
    headers = {},
    normalizeHeadersBeforeSend = true
) {
    return sendApi(
        endpoint,
        HttpMethodEnum.PATCH,
        queryParams,
        data,
        headers,
        normalizeHeadersBeforeSend
    );
}

export function apiDelete(
    endpoint,
    queryParams = {},
    headers = {},
    normalizeHeadersBeforeSend = true
) {
    return sendApi(
        endpoint,
        HttpMethodEnum.DELETE,
        queryParams,
        {},
        headers,
        normalizeHeadersBeforeSend
    );
}

export function externalGet(
    url,
    queryParams = {},
    headers = {},
    normalizeHeadersBeforeSend = true
) {
    return sendExternal(
        url,
        HttpMethodEnum.GET,
        queryParams,
        {},
        headers,
        normalizeHeadersBeforeSend
    );
}

export function externalPost(
    url,
    queryParams = {},
    data = {},
    headers = {},
    normalizeHeadersBeforeSend = true
) {
    return sendExternal(
        url,
        HttpMethodEnum.POST,
        queryParams,
        data,
        headers,
        normalizeHeadersBeforeSend
    );
}

export function externalPut(
    url,
    queryParams = {},
    data = {},
    headers = {},
    normalizeHeadersBeforeSend = true
) {
    return sendExternal(
        url,
        HttpMethodEnum.PUT,
        queryParams,
        data,
        headers,
        normalizeHeadersBeforeSend
    );
}

export function externalPatch(
    url,
    queryParams = {},
    data = {},
    headers = {},
    normalizeHeadersBeforeSend = true
) {
    return sendExternal(
        url,
        HttpMethodEnum.PATCH,
        queryParams,
        data,
        headers,
        normalizeHeadersBeforeSend
    );
}

export function externalDelete(
    url,
    queryParams = {},
    headers = {},
    normalizeHeadersBeforeSend = true
) {
    return sendExternal(
        url,
        HttpMethodEnum.DELETE,
        queryParams,
        {},
        headers,
        normalizeHeadersBeforeSend
    );
}
