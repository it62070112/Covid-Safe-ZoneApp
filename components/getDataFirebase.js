import React, { Component } from "react";
import { ScrollView, Image, View } from "react-native";
import firebase from "../database/firebase";
import { ListItem } from "react-native-elements";

class getDataFirebase extends Component {
    constructor() {
        super();

        this.infoVaccineUser = firebase.firestore().collection("infoVaccineUser");

        this.state = {
            subject_list: [],
        };
    }

    getCollection = (querySnapshot) => {
        const all_data = [];
        querySnapshot.forEach((res) => {
            // console.log("res: ", res);
            // console.log("res.data() : ", res.data());

            const { name } = res.data();
            all_data.push({
                key: res.id,
                name,
            });
        });
        // console.log("all_data : ", all_data);
        this.setState({
            subject_list: all_data,
        });
    };

    componentDidMount() {
        this.unsubscribe = this.infoVaccineUser.onSnapshot(this.getCollection);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        return (
            <View>
                {this.state.subject_list.map((item, i) => {
                return (
                    <ListItem key={i} bottomDivider>
                    <ListItem.Content>
                        {/* <ListItem.Title>{item.code}</ListItem.Title> */}
                        <ListItem.Subtitle>{item.name}</ListItem.Subtitle>
                        {/* <ListItem.Subtitle>{item.credit}</ListItem.Subtitle> */}
                    </ListItem.Content>
                    <ListItem.Chevron />
                    </ListItem>
                );
                })}
            </View>
        );
    }
}

export default getDataFirebase;
