import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions,TouchableHighlight, Linking, ScrollView } from 'react-native';
import { Font } from 'expo';
import axios from 'axios'

export default class CardComponent extends React.Component {
  state={
    lat: 0,
    lng: 0,
    noMap: false,
    apiKeyValid: true,
  }
  async componentDidMount(){
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
    const { width = Dimensions.get('window').width, height = 150, searchTerm, title, subtitle, value, footerItems } = this.props

      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.mainHeader}>
              <Text style={styles.title}>{title.toUpperCase()}</Text>
              <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
            <View style={styles.valueHeader}>
              <Text style={styles.value}>{value}</Text>
            </View>
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
          <ScrollView horizontal={true} style={styles.footer}>
          {footerItems.map((item,i)=>{
            return(
              <View
                 style={{
                    backgroundColor: item.backgroundColor,
                    borderRadius: 10,
                    margin: 10,
                    minWidth: 100,
                    paddingLeft: 15,
                    paddingRight: 15,
                    paddingTop: 5,
                    paddingBottom: 5}}
                    key={i}>
                <Text style={{ color: '#5f5f5f', textAlign: 'center'}}>{item.text}</Text>
              </View>
            )
          })}
        </ScrollView>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10
  },
  header:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10
  },
  mainHeader: {
    height: 80,
    flexDirection: 'column',
    justifyContent: 'space-between',
    // alignItems: 'center',
    padding: 20,
    paddingRight: 5,
    paddingLeft: 5
  },
  valueHeader:{
    padding: 20
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
    fontSize: 20,
    color: '#272727'
  },
  subtitle:{
    fontSize: 12,
    color: '#5f5f5f'
  },
  value:{
    fontSize: 26,
    color: 'rgb(255,47,47)',
  },
  footer:{
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight: 5
  },
  errorMsg:{
    fontWeight: 'bold',
    textAlign: 'center',
    height: 20,
    color: 'blue'
  }
});
