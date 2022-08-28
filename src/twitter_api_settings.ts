function twitterApiHeader() {
  const TWITTER_BEARER_TOKEN: string = PropertiesService.getScriptProperties().getProperty("TWITTER_BEARER_TOKEN");
  const headers = {
    'Authorization': `Bearer ${TWITTER_BEARER_TOKEN}`,
  }
  return headers
}
