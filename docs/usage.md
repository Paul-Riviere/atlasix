# How to use Atlasix

## Import Atlasix files

First, you need to include required files. Atlasix consists of 2 files :

- atlasix.js
- atlasix.css

Those 2 files are **mandatory** because if you don't get one of them, it won't work.

You can either download files so you can upload them on your server, or use them offline, or you can include them with remote URL (see [versionning](versionning.md) for more informations on available versions).

Here is an example of how you can include them in your HTML file :

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="https://github.com/Paul-Riviere/atlasix/releases/download/v1.0.0/atlasix.css" />
  </head>
  <body>
    <script type="module">
      import { initializeSVG } from 'https://github.com/Paul-Riviere/atlasix/releases/download/v1.0.0/atlasix.js'
    </script>
  </body>
</html>
```

## Declare schema div in your page

You need to add a div where you want the schema to render. For this, you just need an empty div, **with an id**.

For example :

```html
<div id="atlasixDiv"></div>
```

## Configure your schema

The configuration is the main part of Atlasix. This is where all your schema's declaration and configuration is made.

Atlasix uses JSON for the configuration. You need to declare a variable to put this JSON, there are no mandatories parameters.

For full configuration option see the [configuration](configuration.md) dedicated page.

Simple example :

```javascript
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
```

## Call the initialize method

When you have your div, and js/css files imported, you only need to cal the `initializeSVG` method to render your schema. You need to put the **div id** you chose before, and your **JSON imput data**

```javascript
initializeSVG("atlasixDiv", inputData);
```

## Full example

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="https://github.com/Paul-Riviere/atlasix/releases/download/v1.0.0/atlasix.css" />
  </head>
  <body>
    <div id="atlasixDiv"></div>
    <script type="module">
      import { initializeSVG } from 'https://github.com/Paul-Riviere/atlasix/releases/download/v1.0.0/atlasix.js'
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
  </body>
</html>
```

## Render multiple schemas

To render multiple schemas on your page, you only have to declare multiple div, with **differents id**, **multiple configuration variables**, and **call the initialize method** for each schema with **the right configuration variable**.
