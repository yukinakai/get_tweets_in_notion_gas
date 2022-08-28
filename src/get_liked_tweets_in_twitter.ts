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
  const tweets: { [key: string ]: string|string[] }[] = [];
  while(has_more) {
    const url = endpoint + '?' + addParamsGetLikedTweetsUrl(params)
    const res = JSON.parse(UrlFetchApp.fetch(url, getLikedTweetsInTwitterOptions()).getContentText());
    const result_count = res['meta']['result_count'];
    if(result_count == 0) {
      has_more = false
    } else {
      const _tweets: { [key: string ]: string|string[] }[] = formatLikedTweetsFromTwitter(res)
      tweets.concat(_tweets);
      params['pagination_token'] = res['meta']['next_token'];
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

