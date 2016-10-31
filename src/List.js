/** @flow */
'use strict';

import React from 'react';
import { View, ListView, Text } from 'react-native';
import NavigationBar from 'react-native-navbar';
import Row from './Row';

const List = (props) => {
    const { dataSource, setStateObject, onEndReached } = props;

    return (
        <View>
            <NavigationBar
                statusBar={{ style: 'light-content' }}
                tintColor="#C91821"
                title={{ tintColor: '#fff', title: 'Give Me Coupons!' }} />
            <ListView
                automaticallyAdjustContentInsets={ false }
                dataSource={ dataSource }
                renderRow={rowData =>
                    <Row
                        data={ rowData }
                        setStateObject={ setStateObject }/>
                }
                initialListSize={ 7 }
                pageSize={ 1 }
                onEndReached={ onEndReached }/>
        </View>
    )
}

export default List;
