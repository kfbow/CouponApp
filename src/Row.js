/** @flow */
'use strict';

import React from 'react';
import { View, Text, Image, TouchableOpacity, Modal } from 'react-native';
import Detail from './Detail';
import Dimensions from 'Dimensions';

export const width = Dimensions.get('window').width;

const styles = {
    container: {
        marginBottom: 10,
    },
    image: {
        width: 64,
        height: 64,
        marginLeft: 15,
    },
    info: {
        flexDirection: 'row',
        paddingBottom: 10,
    },
    line: {
        height: 1,
        backgroundColor: '#d3d3d3',
        alignSelf: 'center',
        width: width * .9
    },
    name: {
        width: width * .7,
        marginLeft: 15,
        marginRight: 15,
        margin: 10,
    },
    oldPrice: {
        textDecorationLine: 'line-through'
    },
    priceView: {
        flexDirection: 'row',
        marginLeft: 15,
    },
    promoPrice: {
        marginLeft: 10,
        fontSize: 16,
    }
}

const Row = (props) => {
    const { data, setStateObject } = props;

    return (
        <TouchableOpacity
            onPress={ () => {setStateObject('showModal', true, data) }}>
            <View style={ styles.container }>
                <View style={ styles.info }>
                    <Image
                        source={{uri: `https:${data.imageUrl}`}}
                        style={ styles.image }/>
                    <View style={{ flexDirection: 'column' }}>
                        <Text
                            style={ styles.name }
                            numberOfLines={ 1 }
                            ellipsizeMode="tail">
                            { data.name }
                        </Text>
                        <View style={ styles.priceView }>
                            <Text style={{ color: '#ccc' }}>
                                {'Was '}
                                <Text style={ styles.oldPrice }>
                                    ${ data.price }
                                </Text>
                            </Text>
                            <Text style={ styles.promoPrice }>
                                Our Price ${data.promoPrice}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={ styles.line } />
            </View>
        </TouchableOpacity>
    )
}

export default Row;
