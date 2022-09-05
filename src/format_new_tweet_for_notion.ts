function formatNewTweetForNotion(tweet: {
  tweeted_at: string,
  tweet_id: string,
  text: string,
  author_id: string,
  author_name: string,
  author_username: string,
  author_profile_image_url: string,
  referenced_tweets: object[],
  attached_media_urls: string[]
}) {
  const NOTION_DATABASE_ID = PropertiesService.getScriptProperties().getProperty("NOTION_DATABASE_ID");
  const payload = notionApiPayload(tweet);
  payload['parent'] = {'database_id': NOTION_DATABASE_ID};

  const children = [];
  if(tweet['attached_media_urls'].length > 0) {
    payload['properties']['With_media'] = {"type": "checkbox", "checkbox": true};
    for(let media_url of tweet['attached_media_urls']) {
      if(media_url == 'video') {
        payload['properties']['Video'] = {"type": "select", "select": {"name": "未対応"}};
        children.push(notionApiPayloadExternalVideo(media_url))
      } else {
        children.push(notionApiPayloadExternalImage(media_url))
      };
    };
  };
  if(tweet['referenced_tweets'].length > 0) {
    for(let referenced_tweet in tweet['referenced_tweets']) {
      children.push(notionApiPayloadEmbed(referenced_tweet))
    };
  };
  payload['children'] = children;
  return payload;
}
