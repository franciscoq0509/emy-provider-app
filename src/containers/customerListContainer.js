import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";

let containerCount = 0;

class CellContainer extends React.Component {
    constructor(args) {
        super(args);
        this._containerId = containerCount++;
    }
    render() {
        return <View {...this.props}>{this.props.children}<Text>Cell Id: {this._containerId}</Text></View>;
    }
}

export class CustomerList extends React.Component {
    constructor(args) {
        super(args);

        let { width } = Dimensions.get('window');

        this.state = {
            dataProvider: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(this._generateArray(300))
        }

        this._layoutProvider = new LayoutProvider(
            0, 
            (type, dim) => {
                dim.width = width;
                dim.height = 140;
            }
        );

        


        this._rowRenderer = this._rowRenderer.bind(this);

    }

    _generateArray(n) {
        let arr = new Array(n);
        for (let i = 0; i < n; i++) {
            arr[i] = i;
        }
        return arr;
    }

    _rowRenderer(type, data) {
        console.log(type);
        switch (type) {
            case 0:  
                return( 
                    <CellContainer>
                        <Text>Hello</Text>
                    </CellContainer>
                )
        
            default:
                break;
        }
        
    }

    render() {
        return <RecyclerListView layoutProvider={this._layoutProvider} dataProvider={this.state.dataProvider} rowRenderer={this._rowRenderer} />;
    }

}