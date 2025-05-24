import React, {useState} from "react"
import {StyleSheet, View, Pressable, Platform} from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"
import {MaterialCommunityIcons} from "@expo/vector-icons"

const DatePicker = ({onChange, title, date}) => {
  const [show, setShow] = useState(false)

  const showMode = () => {
    setShow(!show);
  }

  return (
    <View>
      <View style={styles.dateViewContainer}>
        <Pressable onPress={showMode}>
          <MaterialCommunityIcons name="calendar" size={32} />
        </Pressable>
      </View>

      {show && (
        <View>
          <DateTimePicker
            value={date}
            mode="date"
            display={Platform.OS === 'ios' ? 'compact' : 'default'}
            onChange={onChange}
            textColor="black"
          />
        </View>
      )}
    </View>
  )
}

export default DatePicker

const styles = StyleSheet.create({
  dateViewContainer: {
    marginTop: 10,
    marginLeft: 15,
  },
})
