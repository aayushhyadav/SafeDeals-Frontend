import React from "react"
import {StyleSheet, View, Alert, ScrollView} from "react-native"
import useViewBusiness from "../hooks/useViewBusiness"
import axios from "axios"
import {REACT_APP_VIEW_ADS_API} from "@env"
import {Card, Button} from "@rneui/base"

const ViewBusinessScreen = ({navigation}) => {
  const stores = useViewBusiness()

  cardClickEventListener = (item) => {
    Alert.alert(item.id)
  }

  const createAd = (item) => {
    alert(`Add Advertisements! ${item.id}`)
    const storeId = item.id
  }

  const viewAd = async (item) => {
    try {
      const res = await axios.get(`${REACT_APP_VIEW_ADS_API}` + `${item.id}`)
      const ads = res.data
      navigation.navigate("ViewAds", {ads: ads})
    } catch (error) {
      console.log(error)
    }
  }

  const viewStats = (item) => {
    navigation.navigate("ViewStats", {storeId: item.id})
  }

  if (stores != undefined) {
    return (
      <View style={styles.container}>
        <ScrollView>
          {stores.data.map((store, index) => (
            <Card key={index} containerStyle={styles.cardContainer}>
              <Card.Title>
                {store.name} - {store.address}
              </Card.Title>
              <Card.Divider />
              <View style={styles.buttonContainer}>
                <Button
                  title="New Ad"
                  buttonStyle={styles.buttonStyle}
                  onPress={() => createAd(store)}
                  size="sm"
                />
                <Button
                  title="View Ads"
                  buttonStyle={styles.buttonStyle}
                  onPress={() => viewAd(store)}
                  size="sm"
                />
                <Button
                  title="Statistics"
                  buttonStyle={styles.buttonStyle}
                  onPress={() => viewStats(store)}
                  size="sm"
                />
              </View>
            </Card>
          ))}
        </ScrollView>
      </View>
    )
  }
  return null
}

export default ViewBusinessScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
  },
  cardContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  buttonStyle: {
    backgroundColor: "black",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
  },
})
