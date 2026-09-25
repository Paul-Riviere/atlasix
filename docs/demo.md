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

## Advanced schema

This example uses every feature : all node shapes, an image node, text styling and positions, every edge style and animation. Click an element to see its data.

<div id="atlasixAdvancedDiv"></div>
<script type="module">
    import { initializeSVG } from '/atlasix/assets/atlasix/atlasix.js'
    let inputData = {
        backgroundColor: "#eef2f7",
        width: 600,
        height: 500,
        nodes: [
            {
                id: "client",
                text: "Client",
                textPosition: "inside",
                textColor: "#1e3a8a",
                textSize: 18,
                fillColor: "#93c5fd",
                borderColor: "#1e3a8a",
                shape: "circle",
                width: 80,
                height: 80,
                x: 40,
                y: 200,
                data: {
                    role: "Browser sending requests"
                }
            },
            {
                id: "api",
                text: "API",
                textPosition: "above",
                textColor: "#065f46",
                textSize: 18,
                fillColor: "#6ee7b7",
                borderColor: "#065f46",
                shape: "rectangle",
                width: 120,
                height: 100,
                x: 230,
                y: 190,
                data: {
                    role: "Handles every request",
                    port: "8080"
                }
            },
            {
                id: "database",
                text: "Database",
                textPosition: "below",
                textSize: 16,
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M10 20v60c0 7 18 12 40 12s40-5 40-12V20z' fill='%233b82f6'/%3E%3Cellipse cx='50' cy='20' rx='40' ry='12' fill='%2393c5fd'/%3E%3C/svg%3E",
                borderColor: "#b91c1c",
                width: 100,
                height: 100,
                x: 460,
                y: 40,
                data: {
                    role: "Stores data",
                    note: "Node rendered from an image"
                }
            },
            {
                id: "cache",
                text: "Cache",
                textPosition: "above",
                textSize: 16,
                fillColor: "#fcd34d",
                borderColor: "#92400e",
                shape: "triangle",
                width: 100,
                height: 100,
                x: 460,
                y: 320,
                data: {
                    role: "Speeds up reads"
                }
            },
            {
                id: "worker",
                text: "Worker",
                textPosition: "inside",
                textSize: 16,
                fillColor: "#c4b5fd",
                borderColor: "#4c1d95",
                shape: "rectangle",
                width: 120,
                height: 60,
                x: 40,
                y: 380,
                data: {
                    role: "Runs background jobs"
                }
            }
        ],
        edges: [
            {
                source: "client",
                target: "api",
                color: "#1e3a8a",
                width: 3,
                borderColor: "#1e3a8a",
                style: "dashed",
                animation: "forward",
                data: {
                    features: "dashed + forward (flows from source to target)"
                }
            },
            {
                source: "api",
                target: "database",
                color: "#dc2626",
                width: 4,
                borderColor: "#b91c1c",
                animation: "blink",
                data: {
                    features: "solid + blink",
                    status: "Slow queries"
                }
            },
            {
                source: "api",
                target: "cache",
                color: "#92400e",
                width: 2,
                borderColor: "#92400e",
                style: "dotted",
                animation: "backward",
                data: {
                    features: "dotted + backward (flows from target to source)"
                }
            },
            {
                source: "api",
                target: "worker",
                color: "#4c1d95",
                width: 2,
                borderColor: "#4c1d95",
                animation: "forward",
                data: {
                    features: "solid + forward (rendered as dashed)"
                }
            },
            {
                source: "cache",
                target: "worker",
                color: "#475569",
                width: 1,
                borderColor: "#475569",
                style: "dotted",
                data: {
                    features: "dotted, no animation"
                }
            }
        ]
    }
    initializeSVG("atlasixAdvancedDiv", inputData);
</script>

The example uses this code :

```html
<div id="atlasixAdvancedDiv"></div>
<script type="module">
    import { initializeSVG } from '/atlasix/assets/atlasix/atlasix.js'
    let inputData = {
        backgroundColor: "#eef2f7",
        width: 600,
        height: 500,
        nodes: [
            {
                id: "client",
                text: "Client",
                textPosition: "inside",
                textColor: "#1e3a8a",
                textSize: 18,
                fillColor: "#93c5fd",
                borderColor: "#1e3a8a",
                shape: "circle",
                width: 80,
                height: 80,
                x: 40,
                y: 200,
                data: {
                    role: "Browser sending requests"
                }
            },
            {
                id: "api",
                text: "API",
                textPosition: "above",
                textColor: "#065f46",
                textSize: 18,
                fillColor: "#6ee7b7",
                borderColor: "#065f46",
                shape: "rectangle",
                width: 120,
                height: 100,
                x: 230,
                y: 190,
                data: {
                    role: "Handles every request",
                    port: "8080"
                }
            },
            {
                id: "database",
                text: "Database",
                textPosition: "below",
                textSize: 16,
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M10 20v60c0 7 18 12 40 12s40-5 40-12V20z' fill='%233b82f6'/%3E%3Cellipse cx='50' cy='20' rx='40' ry='12' fill='%2393c5fd'/%3E%3C/svg%3E",
                borderColor: "#b91c1c",
                width: 100,
                height: 100,
                x: 460,
                y: 40,
                data: {
                    role: "Stores data",
                    note: "Node rendered from an image"
                }
            },
            {
                id: "cache",
                text: "Cache",
                textPosition: "above",
                textSize: 16,
                fillColor: "#fcd34d",
                borderColor: "#92400e",
                shape: "triangle",
                width: 100,
                height: 100,
                x: 460,
                y: 320,
                data: {
                    role: "Speeds up reads"
                }
            },
            {
                id: "worker",
                text: "Worker",
                textPosition: "inside",
                textSize: 16,
                fillColor: "#c4b5fd",
                borderColor: "#4c1d95",
                shape: "rectangle",
                width: 120,
                height: 60,
                x: 40,
                y: 380,
                data: {
                    role: "Runs background jobs"
                }
            }
        ],
        edges: [
            {
                source: "client",
                target: "api",
                color: "#1e3a8a",
                width: 3,
                borderColor: "#1e3a8a",
                style: "dashed",
                animation: "forward",
                data: {
                    features: "dashed + forward (flows from source to target)"
                }
            },
            {
                source: "api",
                target: "database",
                color: "#dc2626",
                width: 4,
                borderColor: "#b91c1c",
                animation: "blink",
                data: {
                    features: "solid + blink",
                    status: "Slow queries"
                }
            },
            {
                source: "api",
                target: "cache",
                color: "#92400e",
                width: 2,
                borderColor: "#92400e",
                style: "dotted",
                animation: "backward",
                data: {
                    features: "dotted + backward (flows from target to source)"
                }
            },
            {
                source: "api",
                target: "worker",
                color: "#4c1d95",
                width: 2,
                borderColor: "#4c1d95",
                animation: "forward",
                data: {
                    features: "solid + forward (rendered as dashed)"
                }
            },
            {
                source: "cache",
                target: "worker",
                color: "#475569",
                width: 1,
                borderColor: "#475569",
                style: "dotted",
                data: {
                    features: "dotted, no animation"
                }
            }
        ]
    }
    initializeSVG("atlasixAdvancedDiv", inputData);
</script>
```
