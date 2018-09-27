# Static google maps card component

## Usage

```
 npm install react-native-static-gmap-card

```


### Parameters

* [title] | STRING - Header of the card
* [subtitle] | STRING - Text below header
* [footerItems] | ARRAY - Array of objects that hold the footer items, takes in backgroundColor and text props. Turn into a scrollable section if the items take up more than card width.
> e.g {backgroundColor: 'rgb(255,200,199)', text: 'DBS Savings'}

* [value] | STRING - Transaction text on the top right of card
* [width] | NUMBER - width of map/card, defaults to screen width
* [height] | NUMBER - height of map, defaults to 150px
* [apiKey] | STRING - Google maps API key, if you are receiving an error, please make sure you have enabled the relevant maps access.
* [mapZoom] | NUMBER - Zoom level for the static map, defaults to 17
* [searchTerm] | STRING - Location to search for
* [grayscale] | BOOLEAN - Sets grayscale on map, default to false

### Example
```

import CardComponent from 'react-native-static-gmap-card'

<CardComponent
            title='paradise classico'
            subtitle='12 August 2018'
            footerItems={[{backgroundColor: 'rgb(255,200,199)', text: 'DBS Savings'}, {backgroundColor: 'rgb(255,234,199)', text: 'Groceries'}]}
            value='-33.50'
            apiKey='AIzaSyB0HYm5BduyJMQg0AJTs9BW2FkY0pfYWJw'
            // width ={}
            height = {150}
            // mapZoom={17}
            grayscale={true}
            searchTerm = {'Paradise Classic Sentosa'}
          />
```

## Result
<img src="./sample.jpg" alt="drawing" width="400"/>

# Patch Changes
[1.2.2] - Removed logo and added footer items. Changed styling for card.
# Features

Clicking on map opens google maps with location


## IMPORTANT
This package will only work in a react native environment. It assumes that your main package already has react native installed. This package was built on React Native ~0.55.2. If you are encountering any issues please try downgrading/ upgrading to said version.
