function formatLikedTweetsFromTwitter(res) {
  const users: { [key: string]: {key: string}} = {};
  for(let user of res['includes']['users']) {
    const user_id: string = user['id'];
    delete user['id'];
    users[user_id] = user
  }

  const media: { [key: string]: {key: string}} = {};
  if('media' in res['includes']){
    for(let file of res['includes']['media']){
      const media_key = file['media_key'];
      delete file['media_key'];
      media[media_key] = file
    }
  }

  const tweets: { [key: string]: {key: string}} = {};
  if('tweets' in res['includes']){
    for(let tweet of res['includes']['tweets']){
      const tweet_id = tweet['id'];
      delete tweet['id'];
      tweets[tweet_id] = tweet_id
    }
  }

  const data: { [key: string ]: string|string[] }[] = [];
  for(let datum of res['data']){
    const row:{ [key: string ]: string|string[] } = {};
    row['tweeted_at'] = datum['created_at'];
    row['tweet_id'] = datum['id'];
    row['text'] = datum['text'];

    const author_id = datum['author_id'];
    const user_profiles = users[author_id];
    row['author_id'] = author_id;
    row['author_name'] = user_profiles['name'];
    row['author_username'] = user_profiles['username']
    row['author_profile_image_url'] = user_profiles['profile_image_url']

    if('referenced_tweets' in datum){
      const referenced_tweets = [];
      for(let referenced_tweet of datum['referenced_tweets']){
        const tweet_id = referenced_tweet['id'];
        const author_id = tweets[tweet_id]['author_id'];
        referenced_tweets.push(`https://twitter.com/${author_id}/status/${tweet_id}`)
      }
      row['referenced_tweets'] = referenced_tweets;
    }
    if('attachments' in datum){
      const attachments = [];
      for(let media_key of datum['attachments']['media_keys']){
        let attached_media_url: string;
        try{
          attached_media_url =  media[media_key]['url']
        } catch{
          attached_media_url =  'video'
        }
        attachments.push(attached_media_url);
      }
      row['attached_media_urls'] = attachments;
    }
    data.push(row);
  }
  return data;
}
