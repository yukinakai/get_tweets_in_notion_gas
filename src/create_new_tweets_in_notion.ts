function createNewTweetsInNotion(
  tweets_in_notion: string[],
  tweets_in_twitter: {
    tweeted_at: string,
    tweet_id: string,
    text: string,
    author_id: string,
    author_name: string,
    author_username: string,
    author_profile_image_url: string,
    referenced_tweets: object[],
    attached_media_urls: string[]
  }[]) {
    const url: string = 'https://api.notion.com/v1/pages'
    for(let tweet of tweets_in_twitter) {
      if(tweets_in_notion.includes(tweet['tweet_id'])) {
        continue;
      }
      const payload = formatNewTweetForNotion(tweet)
      let response_code: number;
      let response_content: object;
      try{
        const response = UrlFetchApp.fetch(url, notionApiOptions('post', payload));
        response_code = response.getResponseCode();
        response_content = JSON.parse(response.getContentText());
      } catch(error) {
        response_code = 999;
        response_content = error.message;
      }
      if(response_code!=200) {
        const msg = {
          'status': response_code,
          'action': 'create tweet in notion',
          'message': response_content,
          'paylopad': payload
        };
        console.error(msg);
        postMessageSlack('<!channel> ' + JSON.stringify(msg, null, '\t'));
      }
    }
}

