# Static google maps card component

## Usage

```
 npm install react-native-static-gmap-card


import Card from 'react-native-static-gmap-card'
```


### Parameters

* [title] | STRING - Header of the card
* [footer] | STRING - Footer text
* [value] | STRING - Transaction text on the top right of card
* [width] | NUMBER - width of card, defaults to screen width
* [height] | NUMBER - height of card, defaults to 180px
* [apiKey] | STRING - Google maps API key, if you are receiving an error, please make sure you have enabled the relevant maps access.
* [mapZoom] | NUMBER - Zoom level for the static map, defaults to 17
* [searchTerm] | STRING - Location to search for
* [grayscale] | BOOLEAN - Sets grayscale on map, default to false

### Example
```
<CardComponent
          title='West Coast Road'
          footer='2nd July 2018 13:30'
          value='$99.00'
          logoUrl='http://www.sampleimage.com'
          apiKey='xxxx'
          width ={}
          height = {180}
          mapZoom={17}
          grayscale={false}
          searchTerm = {'West Coast'}
        />
```
# Features

Clicking on map opens google maps with location


## IMPORTANT
This package will only work in a react native environment. It assumes that your main package already has react native installed. This package was built on React Native ~0.55.2. If you are encountering any issues please try downgrading/ upgrading to said version.
