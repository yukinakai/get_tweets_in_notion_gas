function main() {
  let msg = {
    'status': 'success',
    'action': 'script start'
  };
  console.log(msg);
  postMessageSlack(JSON.stringify(msg));

  const tweets_in_notion= getTweetsInNotion();
  console.log({
    'status': 'success',
    'action': 'get tweets in notion'
  });

  const tweets_in_twitter= getLikedTweetsInTwitter();
  console.log({
    'status': 'success',
    'action': 'get tweets from twitter'
  });

  createNewTweetsInNotion(tweets_in_notion, tweets_in_twitter);
  msg = {
    'status': 'success',
    'action': 'script end'
  };
  console.log(msg);
  postMessageSlack(JSON.stringify(msg));
}
