function getTweetsInNotion() {
  const NOTION_DATABASE_ID: string = PropertiesService.getScriptProperties().getProperty("NOTION_DATABASE_ID");
  const url: string = `https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}/query`;
  const payload: { [name: string]: number } = {'page_size': 100};
  let has_more: boolean = true;
  const tweets: string[] = []
  while(has_more) {
    const res = JSON.parse(UrlFetchApp.fetch(url, notionApiOptions('post', payload)).getContentText());
    for(let result of res['results']) {
      tweets.push(result['properties']['Tweet_id']['rich_text'][0]['plain_text'])
    }
    has_more = res['has_more']
    payload['start_cursor'] = res['next_cursor']
  }
  return tweets
}
