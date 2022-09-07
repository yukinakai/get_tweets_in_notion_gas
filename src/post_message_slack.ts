function postMessageSlack(body: string) {
  const SLACK_NOTIFICATION_ENDPOINT: string = PropertiesService.getScriptProperties().getProperty("SLACK_NOTIFICATION_ENDPOINT");
  const SLACK_NOTIFICATION_CHANNEL: string = PropertiesService.getScriptProperties().getProperty("SLACK_NOTIFICATION_CHANNEL");
  const data = {
    "channel" : SLACK_NOTIFICATION_CHANNEL,
    "text" : body,
    };
  const payload = JSON.stringify(data);
  const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
    "method" : "post",
    "contentType" : "application/json",
    "payload" : payload,
    "muteHttpExceptions": true,
    };

  let response_code: number;
  let response_content: object|string;
  try {
    const response = UrlFetchApp.fetch(SLACK_NOTIFICATION_ENDPOINT, options);
    response_code = response.getResponseCode();
    response_content = response.getContentText();
  } catch(error) {
    response_code = 999;
    response_content = error.message;
  }

  const log_content = {
    responseCode: response_code,
    responseBody: response_content,
    channel: SLACK_NOTIFICATION_CHANNEL,
    url : SLACK_NOTIFICATION_ENDPOINT,
    messageBody: body
  }
  if(response_code!=200) {
    console.error(log_content);
    throw new Error(JSON.stringify(log_content, null, '\t'));
  }
}
