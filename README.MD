# Static google maps card component

## Usage

```
 npm install react-native-static-gmap-card


import Card from 'react-native-static-gmap-card'
```


### Parameters

* [title] - Header of the card
* [footer] - Footer text
* [value] - Transaction text on the top right of card
* [width] - width of card, defaults to screen width
* [height] - height of card, defaults to 180px
* [apiKey] - Google maps API key, if you are receiving an error, please make sure you have enabled the relevant maps access.
* [mapZoom] - Zoom level for the static map, defaults to 17
* [searchTerm] - Location to search for
* [grayscale] - Sets grayscale on map, default to false

# Features

Clicking on map opens google maps with location


## IMPORTANT
This package will only work in a react native environment. It assumes that your main package already has react native installed. This package was built on React Native ~0.55.2. If you are encountering any issues please try downgrading/ upgrading to said version.
