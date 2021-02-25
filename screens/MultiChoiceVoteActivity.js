import React from 'react'
import { StyleSheet, View, Text, Dimensions } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import { Snackbar, Checkbox } from 'react-native-paper'

//Bluetooth Connection
import BleManager from 'react-native-ble-manager';


import AppButton from '../components/AppButton';

// formatter
import { stringToBytes } from "convert-string";

export default function MultiChoiceVoteActivity({ route, navigation }) {

  // This is needed for the write functions
  const { connected_peripheral } = route.params;

  const [visible, setVisible] = React.useState(false);

  const [bleConnected, setBleConnected] = React.useState(false)

  const [checked, setChecked] = React.useState({
    choice1: false,
    choice2: false,
  });

  const handleChoice = () => {
    console.log("Submit Button Pressed! ");

    // Call this if vote has failed
    // onFailure();
  }

  const handleSubmit = () => {
    console.log("Submit Button Pressed! ");
    bleWriteMultiChoice(checked)
    // Call this if vote has failed
    // onFailure();
  }

  const onFailure = () => {
    setVisible(!visible);
  }

  const onDismissSnackBar = () => {
    setVisible(false);
  }

  // writing for single choice
  const bleWriteMultiChoice = (text_to_send) => {

    BleManager.connect(connected_peripheral).then((res) => {

      BleManager.retrieveServices(connected_peripheral).then((peripheralInfo) => {

        console.log('peripheralInfo', peripheralInfo.services);
        console.log('---------- text to send--------')
        console.log(`string: ${JSON.stringify(text_to_send)}`);
        console.log('---------- text to send --------')

        // service uuid for: Writing vote-info to rPi 
        var service = '13333333-3333-3333-3333-333333333337';

        // character uuid for: doing single votes
        var voteCharacteristic = '13333333-3333-3333-3333-333333330009';

        BleManager.startNotification(connected_peripheral, service, voteCharacteristic).then(() => {
          // (1223)  
          text_to_send2 = JSON.stringify(text_to_send)

          console.log('text_to_send.length()' + text_to_send2.length)
          let text_to_send_buffer = `${text_to_send2.length} ${JSON.stringify(text_to_send)}`

          // "Hello folks, lets test if this one works, this is just a long string!!!! Sending from Mobile to the rPi"
          let slice_index = 0

          console.log(text_to_send_buffer)

          //While it still have some data to send:

          //
          setTimeout(() => {
            BleManager.write(connected_peripheral, service, voteCharacteristic, stringToBytes(text_to_send_buffer)).then(() => {
              console.log(`msg sent ${stringToBytes(text_to_send_buffer)}`);
              this.alert("message sent!");

              while (text_to_send_buffer.length - 20 >= 20) {

                slice_index += 20
                to_send_buffer = text_to_send_buffer.slice(slice_index, slice_index + 20)

                console.log('text_to_send_buffer: ' + to_send_buffer)

                console.log('splice_index: ' + slice_index)
                BleManager.write(connected_peripheral, service, voteCharacteristic, stringToBytes(to_send_buffer)).then(() => {
                  console.log(`msg sent ${stringToBytes(to_send_buffer)}`);
                  // this.alert("message sent!");
                })

              }

            })
          }, 500)

          // .catch((err) => {
          //   console.log('failed to send')
          //   console.log(err)
          //   this.alert("failed to send");
          // });




          // if (text_to_send_buffer.length <= 20) {
          //   text_to_send_buffer = text_to_send_buffer.slice(splice_index, -1)
          //   BleManager.write(connected_peripheral, service, voteCharacteristic, stringToBytes(text_to_send_buffer)).then(() => {
          //     console.log(`msg sent ${stringToBytes(text_to_send_buffer)}`);
          //     this.alert("message sent!");
          //   }).catch((err) => {
          //     console.log('failed to send')
          //     console.log(err)
          //     this.alert("failed to send");
          //   });
          // }
        })
      })
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select multiple: </Text>

      <View style={styles.checkboxContainer}>
        <Checkbox.Item
          style={styles.item}
          status={checked.choice1 ? 'checked' : 'unchecked'}
          onPress={() => {
            setChecked(checked => ({ ...checked, choice1: !checked.choice1 }));
          }}
          color="#000"
          label="Item 1"
        />
        <Checkbox.Item
          style={styles.item}
          status={checked.choice2 ? 'checked' : 'unchecked'}
          onPress={() => {
            setChecked(checked => ({ ...checked, choice2: !checked.choice2 }));
          }}
          color="#000"
          label="Item 2"
        />
      </View>

      <AppButton style={styles.buttonStyle} text="Submit" onPress={
        () => {
          handleSubmit();
          // navigation.navigate("VoteSuccess");
        }
      } />



      <Snackbar
        style={styles.snackBar}
        visible={visible}
        onDismiss={onDismissSnackBar}
        duration="3000"
      >
        Vote failed. Please try again.
        </Snackbar>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    margin: 20
  },
  item: {
    borderRadius: 20,
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 10,
  },
  checkboxContainer: {
    width: 250,
  },
  buttonStyle: {
    margin: 10,
  },
  snackBar: {
    alignSelf: 'flex-end'
  }
});
