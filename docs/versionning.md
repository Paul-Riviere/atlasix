# Versionning

## Releases

Releases are available under the [project's releases github page](https://github.com/Paul-Riviere/atlasix/releases). You can then download or import files from the disired version.

## Snapshots/unstable

If you want to test features before the official release, you can use snapshots, but be aware that features may break, **the version may be unstable**.

Each time a new feature/fix/doc is added, a new snapshot is made with Github Action **build workflow**. You just have to navigate to the disired version, go to the build workflow, and then go to **"Upload build artifact" section**. You'll see a link to the zip folder containing the `atlasix.js` and `atlasix.css` files, required for Atlasix to run correctly.

Snapshots expire, so if the one you want is not available anymore, you can select the desired commit you want, download the project on this specific version, and build manually the project on your computer.
