function main() {
  const tweets_in_notion= getTweetsInNotion();
  const tweets_in_twitter= getLikedTweetsInTwitter();
  createNewTweetsToNotion(tweets_in_notion, tweets_in_twitter)
}
