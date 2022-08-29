function getLikedTweetsInTwitter() {
  const TWITTER_USER_ID: string = PropertiesService.getScriptProperties().getProperty("TWITTER_USER_ID");
  const endpoint: string = `https://api.twitter.com/2/users/${TWITTER_USER_ID}/liked_tweets`;
  const params = {
    'max_results': '100',
    'expansions': 'attachments.media_keys,author_id,referenced_tweets.id,referenced_tweets.id.author_id',
    'tweet.fields': 'attachments,author_id,created_at,id,text,referenced_tweets',
    'user.fields': 'name,username,profile_image_url',
    'media.fields': 'url'
  }
  let has_more: boolean = true;
  const tweets: {
    tweeted_at: string,
    tweet_id: string,
    text: string,
    author_id: string,
    author_name: string,
    author_username: string,
    author_profile_image_url: string,
    referenced_tweets: object[],
    attached_media_urls: string[]
  }[] = [];
  while(has_more) {
    const url = endpoint + '?' + addParamsGetLikedTweetsUrl(params);
    const response = UrlFetchApp.fetch(url, getLikedTweetsInTwitterOptions());
    const response_code = response.getResponseCode();
    const response_content = JSON.parse(response.getContentText());
    if(response_code!=200) {
      console.error({
        'status': response_code,
        'action': 'get liked tweets in twitter',
        'message': response_content
      });
      throw new Error();
    }
    const result_count = response_content['meta']['result_count'];
    if(result_count == 0) {
      has_more = false
    } else {
      const _tweets = formatLikedTweetsFromTwitter(response_content)
      tweets.concat(_tweets);
      params['pagination_token'] = response_content['meta']['next_token'];
    };
  }
  return tweets;
}

function getLikedTweetsInTwitterOptions() {
  const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
    'method': 'get',
    'headers': twitterApiHeader()
  }
  return options
}

function addParamsGetLikedTweetsUrl(params) {
  const param = [];
  Object.keys(params).forEach(function(key){
    param.push(`${key}=${params[key]}`)
  })
  return param.join('&')
}

