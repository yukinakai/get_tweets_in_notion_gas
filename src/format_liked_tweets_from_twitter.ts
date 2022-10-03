function formatLikedTweetsFromTwitter(res: object) {
  const users: { [key: string]: object } = {};
  for(let user of res['includes']['users']) {
    const user_id: string = user['id'];
    delete user['id'];
    users[user_id] = user
  }

  const media: { [key: string]: object } = {};
  if('media' in res['includes']){
    for(let file of res['includes']['media']){
      const media_key = file['media_key'];
      delete file['media_key'];
      media[media_key] = file
    }
  }

  const tweets: { [key: string]: object } = {};
  if('tweets' in res['includes']){
    for(let tweet of res['includes']['tweets']){
      const tweet_id = tweet['id'];
      delete tweet['id'];
      tweets[tweet_id] = tweet
    }
  }

  const data = [];
  for(let datum of res['data']){
    const row: {
      tweeted_at: string,
      tweet_id: string,
      text: string,
      author_id: string,
      author_name: string,
      author_username: string,
      author_profile_image_url: string,
      referenced_tweets: object[],
      attached_media_urls: string[]
    } = {
      tweeted_at: "",
      tweet_id: "",
      text: "",
      author_id: "",
      author_name: "",
      author_username: "",
      author_profile_image_url: "",
      referenced_tweets: [],
      attached_media_urls: []
    };
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
        if (referenced_tweet['type']=='replied_to') {
          continue
        }
        const tweet_id = referenced_tweet['id'];
        let author_id: string;
        author_id = tweets[tweet_id]['author_id'];
        referenced_tweets.push(`https://twitter.com/${author_id}/status/${tweet_id}`)
      }
      if(referenced_tweets.length>0){
        row['referenced_tweets'] = referenced_tweets;
      }
    }
    if('attachments' in datum){
      const attachments = [];
      for(let media_key of datum['attachments']['media_keys']){
        let attached_media_url: string;
        if('url' in media[media_key]) {
          attached_media_url =  media[media_key]['url']
        } else {
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
