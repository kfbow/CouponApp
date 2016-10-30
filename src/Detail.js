/** @flow */
'use strict';

import React from 'react';
import {
    Alert,
    Clipboard,
    View,
    Text,
    Image,
    Linking,
    ScrollView,
    StatusBar,
    TouchableOpacity
} from 'react-native';
import Dimensions from 'Dimensions';
import { stringDiscounted, stringOriginal } from './RandomStrings';

export const dimensions = Dimensions.get('window');

const styles = {
    categoryContainer: {
        borderRadius: 20,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#CEEAE7',
        backgroundColor: '#CEEAE7',
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 8,
        paddingRight: 8,
    },
    container: {
        padding: 10,
    },
    description: {
        marginTop: 15,
    },
    expire: {
        alignSelf: 'center',
        color: '#ccc'
    },
    image: {
        width: dimensions.width * (9/10),
        height: dimensions.width * (9/10),
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    name: {
        fontSize: 30,
        marginTop: 20,
    },
    greyOut: {
        color: '#ccc',
    },
    priceAmazon: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-around'
    },
    promoContainer: {
        position: 'absolute',
        backgroundColor: '#fff',
        bottom: 0,
        paddingBottom: 10,
        paddingTop: 10
    },
    promoPrice: {
        fontSize: 20,
    },
    promoReveal: {
        padding: dimensions.height * (.2/10),
        textAlign: 'center',
        backgroundColor: '#159588',
        color: '#fff',
        width: dimensions.width * .9,
        marginRight: dimensions.width * .05,
        marginLeft: dimensions.width * .05,
    },
    seeAmazon: {
        padding: 15,
        backgroundColor: '#558EFC',
        color: '#fff'
    },
    separator: {
        height: 1,
        backgroundColor: '#d3d3d3',
        marginTop: 5,
    }
}

/*
// Open an alert giving the user the option to go to Amazon or Cancel while
// setting the promo code to their clipboard
*/
const onButtonPress = (data) => {
    Alert.alert(
        `Copied code ${data.promoCode}`,
        'Promo code copied to your clipboard',
        [
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
            {text: 'Go To Amazon',
                onPress: () => openAmazon(data)
            },
        ]
    );
    Clipboard.setString(data.promoCode);
}

// Open the Amazon app or webpage in Safari if app is not installed
const openAmazon = (data) => {
    return Linking
        .openURL(data.externalUrl)
        .catch(err => {
            console.log('An error occurred', err);
        })
}

const onClose = (setStateObject, data) => {
    setStateObject('showModal', false, data);
}

const Detail = (props) => {
    const { showModal, setStateObject, data } = props;

    return (
        <View style={{ flex: 1 }}>
            <StatusBar
                hidden={ true } />
            <ScrollView
                style={ styles.container }
                contentInset={{ bottom: dimensions.height * .1 }}>
                <Text
                    style={{ padding: 20 }}
                    onPress={ () => onClose(setStateObject, data) }>
                    Close
                </Text>
                <Image
                    source={{uri: `https:${data.imageUrl}`}}
                    style={ styles.image }/>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={ styles.categoryContainer }>
                        <Text style={ styles.category }>
                            { data.categoryName }
                        </Text>
                    </View>
                    <Text style={ styles.expire }>
                        { data.expiresAt }
                    </Text>
                </View>

                <View style={ styles.separator } />

                <View>
                    <Text style={ styles.name }>
                        { data.name }
                    </Text>
                    <Text style={ styles.description }>
                        { data.description }
                    </Text>
                    <View style={ styles.priceAmazon }>
                        <View>
                            <Text style={ styles.greyOut }>
                                {`${stringOriginal()} `}
                                <Text style={{textDecorationLine: 'line-through'}}>
                                    ${ data.price }
                                </Text>
                            </Text>
                            <Text style={ styles.promoPrice }>
                                {stringDiscounted()} ${data.promoPrice}
                            </Text>
                        </View>
                        <Text
                            style={ styles.seeAmazon }
                            onPress={ () => openAmazon(data) }>
                            See on Amazon
                        </Text>
                    </View>
                </View>
            </ScrollView>

            <TouchableOpacity
                onPress={ () => onButtonPress(data) }>
                <View style={ styles.promoContainer }>
                    <Text style={ styles.promoReveal }>
                        Reveal Promo Code
                    </Text>
                </View>
            </TouchableOpacity>

        </View>
    )
}

export default Detail;
