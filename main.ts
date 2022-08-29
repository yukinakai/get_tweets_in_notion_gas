function main() {
  console.log({
    'status': 'success',
    'action': 'script start'
  });

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
  console.log({
    'status': 'success',
    'action': 'script end'
  });
}
