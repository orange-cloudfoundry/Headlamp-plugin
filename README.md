# Headlamp Crossplane Marketplace Plugin
## Overview

The Headlamp Crossplane Marketplace Plugin is a web UI plugin designed to simplify the discovery and management of Custom Resource Definitions (CRDs) from Crossplane. This plugin aims to make it easy for users, even those unfamiliar with Kubernetes, to consume services.
## Features
* **Service Discovery**: Simplified pages for discovering available services (CRDs).
* **User-Friendly Management**: Intuitive management interface for users with little to no Kubernetes knowledge.
* **Crossplane Integration**: Better integration with Crossplane CRDs.

## Installation
The docker image is available on [GitHub Container Registry](https://github.com/orange-cloudfoundry/Headlamp-plugin/pkgs/container/headlamp-plugin).

To get more information about how to install headlamp plugin please refer to the [Headlamp documentation](https://headlamp.dev/docs/latest/development/plugins/building#shipping-and-deploying-plugins) or this blog post [Get up to speed deploying Headlamp with plugins](https://headlamp.dev/blog/2022/10/20/best-practices-for-deploying-headlamp-with-plugins).


Add the following values.yaml file to your Headlamp Helm chart installation:
``` yaml
initContainers:
  - name: "headlamp-plugins"
    image: ghcr.io/orange-cloudfoundry/Headlamp-plugin:latest
    imagePullPolicy: Always
    command:
      [
        "/bin/sh",
        "-c",
        "mkdir -p /build/plugins && cp -r /plugins/* /build/plugins/",
      ]
    volumeMounts:
      - name: "headlamp-plugins"
        mountPath: "/build/plugins"

persistentVolumeClaim:
  enabled: true
  accessModes:
    - ReadWriteMany
  size: 1Gi

volumeMounts:
  - name: "headlamp-plugins"
    mountPath: "/build/plugins"

volumes:
  - name: "headlamp-plugins"
    persistentVolumeClaim:
      claimName: "headlamp"

config:
  pluginsDir: "/build/plugins" 
  ```

It can be added using this command :
``` bash
helm install headlamp headlamp/headlamp -f=./values.yaml
```

## Usage

1. Open your Headlamp instance.
2. Navigate to the Headlamp-plugin section.
3. Browse and manage your services through the interface.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the Apache-2.0 License. See the LICENSE file for details.

## Contact

For any questions or feedback, please open an issue on the GitHub repository.