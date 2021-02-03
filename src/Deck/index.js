import React, {Fragment, useState} from 'react';
import DeckGL from '@deck.gl/react';
import {FlyToInterpolator} from 'deck.gl';
import {TerrainLayer} from '@deck.gl/geo-layers';
import {BitmapLayer} from '@deck.gl/layers';
import {TileLayer} from '@deck.gl/geo-layers';
import {Component} from 'react';

export default class extends Component {

    constructor(props) {
        super(props);

        this.state = {
            savedCameras : [],
            viewState:   {"latitude":37.760591580303945,"longitude":-122.45594445580812,"zoom":15.314586714973084,"bearing":14.35897435897436,"pitch":60,"altitude":1.5}
        }

    }

    flyTo(camera) {
        this.setState({viewState : {...camera,
                                            transitionDuration: 800,
                                            transitionInterpolator: new FlyToInterpolator()}})
    }

    render() {

        let layers = [

            new TileLayer({
                id: 'TileLayer',
                data: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
                tileSize: 256,

                renderSubLayers: props => {
                    const {
                        bbox: {west, south, east, north}
                    } = props.tile;

                    return new BitmapLayer(props, {
                        data: null,
                        desaturate : 1,
                        //opacity : 0.7,
                        //transparentColor : [0,0,0,0],
                        image: props.data,
                        bounds: [west, south, east, north]
                    });
                },
                // pickable: true,
            }),

      new TerrainLayer({
            id: 'TerrainLayer',

            /* props from TerrainLayer class */

            bounds: [-122.5233, 37.6493, -122.3566, 37.8159],
            // color: [255, 255, 255],
            // data: [],
            elevationData: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/terrain.png',
            elevationDecoder: {
                rScaler: 2,
                gScaler: 0,
                bScaler: 0,
                offset: 0
            },
            material: {
                diffuse: 1
            },
            texture: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/terrain-mask.png',
        })

        ];

        return (
            <div>

                <div style={{position : 'absolute', top : '5%', left : '5%', zIndex : 99999999}}>

                    <button onClick={() => this.setState({savedCameras : this.state.savedCameras.concat([this.state.viewState])})}>Save Camera</button>

                    <ul>
                        {this.state.savedCameras.map((c, i) => <li title={JSON.stringify(c)}> camera {i} <a onClick={() => this.flyTo(c)}> Fly there</a> </li>)}
                    </ul>
                </div>

                <div className="Deck" >

                    <DeckGL

                        viewState={this.state.viewState}
                        height="100%"
                        width="100%"
                        controller={true}
                        ref={deck => {
                            this.deckGL = deck;
                        }}

                        onViewStateChange={({ viewState}) => {
                            this.setState({viewState : viewState});
                        }

                        }

                        layers={layers}/>

                </div>
            </div>
        );
    }
}
