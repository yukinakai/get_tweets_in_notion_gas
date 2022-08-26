function notion_api_header() {
  const NOTION_API_KEY: string = PropertiesService.getScriptProperties().getProperty("NOTION_API_KEY");
  const headers = {
    'Authorization': "Bearer " + NOTION_API_KEY,
    'Content-Type': 'application/json',
    'Notion-Version': '2021-08-16',
  }
  return headers
}
