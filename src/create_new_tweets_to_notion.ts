function createNewTweetsToNotion(
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
      UrlFetchApp.fetch(url, notionApiOptions('post', payload));
    }
}

