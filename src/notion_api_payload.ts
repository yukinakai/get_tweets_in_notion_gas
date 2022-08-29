function notionApiPayload(tweet: {
    tweeted_at: string,
    tweet_id: string,
    text: string,
    author_id: string,
    author_name: string,
    author_username: string,
    author_profile_image_url: string,
    referenced_tweets: object[],
    attached_media_urls: string[]
}) {
  return {
    'icon': {
        'external': {
            'url': tweet['author_profile_image_url']
        }
    },
    'properties': {
        'ID': {
            'title': [
                {
                    'text': {
                        'content': tweet['author_name']
                    }
                }
            ]
        },
        'Tweeted_at': {
            'date': {'start': tweet['tweeted_at']}
        },
        'URL': {
            'url': `https://twitter.com/${tweet['author_id']}/status/${tweet['tweet_id']}`
        },
        'Text': {
            "rich_text": [
                {
                    "text": {
                        "content": tweet['text']
                    }
                }
            ]
        },
        'Author_username': {
            "rich_text": [
                {
                    "text": {
                        "content": tweet['author_username']
                    }
                }
            ]
        },
        'Tweet_id': {
            "rich_text": [
                {
                    "text": {
                        "content": tweet['tweet_id']
                    }
                }
            ]
        },
    }
}
}

function notionApiPayloadExternalImage(url: string) {
    return {'object': 'block',
            'type': 'image',
            'image': {
                'type': 'external',
                'external': {
                    'url': url
                }
            }
        }
}

function notionApiPayloadExternalVideo(url: string) {
    return {'object': 'block',
            'type': 'heading_2',
            'heading_2': {
                'text': [{'type': 'text', 'text': {'content': url}}]
            }
        }
}

function notionApiPayloadEmbed(url: string) {
    return {'object': 'block',
            'type': 'embed',
            'embed': {
                'url': url
            }
        }
}
