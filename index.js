import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions,TouchableHighlight, Linking } from 'react-native';
import axios from 'axios'

export default class CardComponent extends React.Component {
  state={
    lat: 0,
    lng: 0,
    noMap: false,
    apiKeyValid: true
  }
  componentDidMount(){
    const { width = Dimensions.get('window').width, height = 180, searchTerm, mapZoom = 17, apiKey, grayscale= false } = this.props
    const { lat, lng } = this.state
    this.setState({ noMap: false})

    if(apiKey === undefined){
      this.setState({ apiKeyValid: false})
    }else{
      axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${searchTerm.replace(/ /g, '+')}&key=${apiKey}`)
      .then(res=>{
        if(res.data.status !== "ZERO_RESULTS" && res.data.status !== "REQUEST_DENIED"){
          const { lat, lng } = res.data.results[0].geometry.location
          this.setState({ lat, lng},()=>{
            axios.get(`https://maps.googleapis.com/maps/api/staticmap?zoom=${mapZoom}&size=${width-12}x${height}&maptype=roadmap&markers=color:${grayscale ? 'gray' : 'red'}|${lat},${lng}&key=${apiKey}${grayscale ? '&style=saturation:-95' : ''}`)
            .then(res=>{
              if(res.request.responseHeaders['x-staticmap-api-warning'] === undefined){
                this.setState({ imageUrl: res.config.url})
              }else{
                this.setState({ noMap: true})
              }
            })
          })
        }else if(res.data.status === "REQUEST_DENIED"){
          this.setState({ apiKeyValid: false})
        }else{
          this.setState({ noMap: true})
        }
      })
    }
  }
  render() {
    const { imageUrl, noMap, lat, lng, apiKeyValid } = this.state
    const { mapZoom } = this.props
    const { width = Dimensions.get('window').width, height = 180, searchTerm, title, footer, value, logoUrl='nil' } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.icon}
            resizeMode="cover"
            source={{ uri: logoUrl}}
            onClick
          />
        <Text style={styles.title}>{title}</Text><Text style={styles.value}>{value}</Text>
        </View>
        {noMap || !apiKeyValid ? <Text style={styles.errorMsg}> {apiKeyValid ? 'NO MAP FOUND' : 'API Key Error, please check the key or your that your permissions are enabled for maps'}</Text> :
        <TouchableHighlight onPress={() => Linking.openURL(`https://www.google.com/maps/search/?api=1&zoom=${mapZoom}&query=${searchTerm}`)}>
        <Image
            style={{width: width-12, height: height}}
            resizeMode="cover"
            source={{ uri: imageUrl}}
          />
        </TouchableHighlight>
        }
      <Text style={styles.footer}>{footer}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
  },
  header: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15
  },
  icon:{
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    width:40,
    height:40,
    backgroundColor:'#fff',
    borderRadius:20,
  },
  title:{
    fontSize: 20
  },
  value:{
    fontSize: 23,
    color: 'rgb(255,47,47)',
    fontWeight: '700'
  },
  footer:{
    fontSize: 8,
    textAlign: 'right',
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 5,
    fontStyle: 'italic',
    color: '#343a44'
  },
  errorMsg:{
    fontWeight: 'bold',
    textAlign: 'center',
    height: 20,
    color: 'blue'
  }
});
