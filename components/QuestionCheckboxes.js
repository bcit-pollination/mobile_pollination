import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Checkbox } from "react-native-paper";

// TODO: clean up comments after people have confirmed that
// bug has really been fixed
const QuestionCheckboxes = ({ options }) => {
  const localOptions = options.map((curOption) => {
    const modifiedOption = curOption;
    modifiedOption.isChecked = false;
    return modifiedOption;
  });
  console.log(localOptions);

  const [checkedItems, setCheckedItems] = useState(localOptions);

  // const handleChange = (event) => {
  //   setState({ ...state, [event.target.name]: event.target.checked });
  // };

  const handleChange = (index) => {
    // const curCheckedItem = checkedItems[index];
    // console.log("curCheckedItem:");
    // console.log(curCheckedItem);
    console.log("pressed");
    console.log("index " + parseInt(index));

    // let temp = checkedItems.map((curItem) => {
    //   if (index === curItem) {
    //     return { ...product, isChecked: !product.isChecked };
    //   }
    //   return product;
    // });

    let items = [...checkedItems];

    console.log(items[index]);
    // console.log(items[index].isChecked);
    // let items = [...checkedItems];
    // console.log("itemsssss");
    // console.log(items);
    
    // let item = checkedItems[index];
    // console.log("item");
    // console.log(item);
    
    let item = {...items[index]};
    console.log(item.isChecked);

    item.isChecked = !item.isChecked;

    items[index] = item;

    // items[index].isChecked = !items[index].isChecked;

    // if (items[index].isChecked) {
    //   console.log("true");

    //   items[index].isChecked = false;
    //   // setCheckedItems({
    //   //   ...checkedItems,
    //   //   [checkedItems.index.isChecked]: false,
    //   // });
    // } else {
    //   console.log("false");

    //   items[index].isChecked = true;

    //   // setCheckedItems({
    //   //   ...checkedItems,
    //   //   [checkedItems.index.isChecked]: true,
    //   // });
    // }

    console.log("checkedItems:");
    console.log(checkedItems);

    setCheckedItems(items);

    // only uncomment for event prop
    // console.log("event target:");
    // console.log(event.target);
  };

  const renderCheckBoxes = (options) => {
    // array to hold dynamically rendered items
    let arr = [];

    arr = options.map((curOption, index) => {
      // setCheckedItems(...checkedItems, [index] = false);

      return (
        <Checkbox.Item
          key={index}
          style={styles.item}
          status={checkedItems[index].isChecked ? "checked" : "unchecked"}
          onPress={() => {handleChange(index)}}
          // onPress={handleChange(localQuestions[questionIndex][index])}
          color="#000"
          label={curOption.description}
        />
      );
    });

    console.log("END OF RENDER");

    return arr;
  };

  return <View>{renderCheckBoxes(options)}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    margin: 20,
  },
  item: {
    borderRadius: 20,
    flexDirection: "row",
    backgroundColor: "#fff",
    margin: 10,
  },
  checkboxContainer: {
    width: 250,
  },
  buttonStyle: {
    margin: 10,
  },
  snackBar: {
    alignSelf: "flex-end",
  },
});

export default QuestionCheckboxes;