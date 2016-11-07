/** @flow */
'use strict';

import React, { Component } from 'react';
import { ListView, TouchableOpacity, Image, View, Animated } from 'react-native';
import Dimensions from 'Dimensions';

export const dimensions = Dimensions.get('window');

const styles = {
    contentContainer: {
        flexWrap: 'wrap',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    first: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        borderTopColor: '#ccc',
        borderTopWidth: 1,
        borderStyle: 'solid',
        width: dimensions.width,
        alignItems: 'center'
    },
    largeImage: {
        width: dimensions.width * .8,
        height: dimensions.width * .8
    },
    smallImage: {
        width: dimensions.width * .4,
        height: dimensions.width * .4
    },
    second: {
        borderRightColor: '#ccc',
        borderRightWidth: 1,
        borderStyle: 'solid',
        paddingRight: dimensions.width * .07
    },
}

const onPress = (setStateObject, data) => {
    return () => {setStateObject('showModal', true, data) }
}

const renderObject = (setStateObject, data, viewStyle, imageStyle) => {
    return <TouchableOpacity
        onPress={ onPress(setStateObject, data) }>
        <View style={ viewStyle }>
            <Image
                source={{uri: `https:${data.imageUrl}`}}
                style={ imageStyle }/>
        </View>
    </TouchableOpacity>
}

// Sets up a box-like designed page for exploring
const Home = (props) => {
    const { dataSource, setStateObject, onEndReached } = props;
    return (
        <View>
            <ListView
                automaticallyAdjustContentInsets={ false }
                dataSource={ dataSource }
                renderRow={(data, b,c,d) => {
                    if((parseInt(c)) % 3 === 0) {
                        return renderObject(
                            setStateObject,
                            data,
                            styles.first,
                            styles.largeImage
                        );
                    } else if ((parseInt(c)) % 3 === 1) {
                        return renderObject(
                            setStateObject,
                            data,
                            styles.second,
                            styles.smallImage
                        );
                    } else {
                        return renderObject(
                            setStateObject,
                            data,
                            {},
                            styles.smallImage
                        );
                    }

                }}
                initialListSize={ 8 }
                pageSize={ 1 }
                onEndReached={ onEndReached }
                contentContainerStyle={ styles.contentContainer }/>
        </View>
    )
}

export default Home;
