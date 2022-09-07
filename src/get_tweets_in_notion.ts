function getTweetsInNotion() {
  const NOTION_DATABASE_ID: string = PropertiesService.getScriptProperties().getProperty("NOTION_DATABASE_ID");
  const url: string = `https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}/query`;
  const payload: { [name: string]: number } = {'page_size': 100};
  let has_more: boolean = true;
  const tweets: string[] = []
  while(has_more) {
    let response_code: number;
    let response_content: object;
    try {
      const response = UrlFetchApp.fetch(url, notionApiOptions('post', payload))
      response_code = response.getResponseCode()
      response_content = JSON.parse(response.getContentText());
    } catch(error) {
      response_code = 999;
      response_content = error.message;
    }
    if(response_code!=200) {
      const msg = {
        'status': response_code,
        'action': 'get tweets in notion',
        'message': response_content
      }
      console.error(msg);
      const msg_string = JSON.stringify(msg, null, '\t')
      postMessageSlack('<!channel> ' + msg_string);
      throw new Error(msg_string);
    }
    for(let result of response_content['results']) {
      tweets.push(result['properties']['Tweet_id']['rich_text'][0]['plain_text'])
    }
    has_more = response_content['has_more']
    payload['start_cursor'] = response_content['next_cursor']
  }
  return tweets
}
