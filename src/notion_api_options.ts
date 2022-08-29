type HttpMethod = 'get' | 'delete' | 'patch' | 'post' | 'put';

function notionApiOptions(method: HttpMethod, payload: { [name: string]: any }) {
  const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
    'method': method,
    'headers': notionApiHeader(),
    'payload': JSON.stringify(payload)
  }
  return options
}
