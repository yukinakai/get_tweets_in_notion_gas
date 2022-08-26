function get_tweets_in_notion() {
  const NOTION_DATABASE_ID: string = PropertiesService.getScriptProperties().getProperty("NOTION_DATABASE_ID");
  const url: string = 'https://api.notion.com/v1/databases/' + NOTION_DATABASE_ID + '/query'
}
