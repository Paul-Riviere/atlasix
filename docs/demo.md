# Demo

## Simple schema

This simple example illustrates how viewer, shapes, edges, and nodes/edges data works.

<div id="atlasixDiv"></div>
<script type="module">
    import { initializeSVG } from '/atlasix/assets/atlasix/atlasix.js'
    let inputData = {
        backgroundColor: "#fdf5d8",
        width: 500,
        height: 500,
        nodes: [
            {
                id: "node1",
                text: "test text",
                textColor: "blue",
                textSize: 15,
                fillColor: "blue",
                borderColor: "red",
                shape: "rectangle",
                width: 100,
                height: 100,
                x: 50,
                y: 50,
                data: {
                    nodeName: "node name 1",
                    myDataSpecificToNode1: "myNode1DataValue"
                }
            },
            {
                id: "node2",
                text: "test text 2",
                fillColor: "yellow",
                borderColor: "green",
                shape: "triangle",
                width: 150,
                height: 150,
                x: 200,
                y: 200,
                data: {
                    nodeName: "node name 2"
                }
            },
        ],
        edges: [
            {
                source: "node1",
                target: "node2",
                color: "orange",
                width: 3,
                borderColor: "purple",
                data: {
                    edgeName: "edge name 1"
                }
            }
        ]
    }
    initializeSVG("atlasixDiv", inputData);
</script>

The example uses this code :

```html
<div id="atlasixDiv"></div>
<script type="module">
    import { initializeSVG } from '/atlasix/assets/atlasix/atlasix.js'
    let inputData = {
        backgroundColor: "#fdf5d8",
        width: 500,
        height: 500,
        nodes: [
            {
                id: "node1",
                text: "test text",
                textColor: "blue",
                textSize: 15,
                fillColor: "blue",
                borderColor: "red",
                shape: "rectangle",
                width: 100,
                height: 100,
                x: 50,
                y: 50,
                data: {
                    nodeName: "node name 1",
                    myDataSpecificToNode1: "myNode1DataValue"
                }
            },
            {
                id: "node2",
                text: "test text 2",
                fillColor: "yellow",
                borderColor: "green",
                shape: "triangle",
                width: 150,
                height: 150,
                x: 200,
                y: 200,
                data: {
                    nodeName: "node name 2"
                }
            },
        ],
        edges: [
            {
                source: "node1",
                target: "node2",
                color: "orange",
                width: 3,
                borderColor: "purple",
                data: {
                    edgeName: "edge name 1"
                }
            }
        ]
    }
    initializeSVG("atlasixDiv", inputData);
</script>
```
