# This file describes how to use structurizr to view, edit the architecture diagrams and ADRs

## Architecture Diagrams

We are using Structurizr to create our architecture diagrams based on the C4-model of architecture.

Since we are using the free version of structurizr we will use structurizr lite to visualize our diagrams.

Installation instructions:

Use the docker container for easisest setup. Start the docker container as shown below replacing REPO with the path to your local repositry:

```bash
docker pull structurizr/lite
docker run -it --rm -p 8080:8080 -v (REPO)/architecture/c4-model:/usr/local/structurizr structurizr/lite
```

Now, you can open structurize in your browser at [http://localhost:8080](http://localhost:8080) to see the diagram editor

[Detailed Installation instructions for installing structurizr lite can be found here](https://structurizr.com/share/76352/documentation#overview).

## Architecture Decision Records (ADRs)

All ADRs are located in architecture/c4-model/decisions folder.

Check the first ADR for format and advice on how to create good ADRs [here](./decisions/0001-record-architecture-decisions.md)

We will use [adr-tools](https://github.com/npryce/adr-tools) as our ADR toolset. This tool can be used to create new ADRs as well as overwrite exisint ADRs.

[Instructions to install adr-tools](https://github.com/npryce/adr-tools/blob/master/INSTALL.md)

[Helpful Keyboard Shortcuts](https://structurizr.com/help/keyboard-shortcuts)

Once installed create new ADRs using:

```bash
adr new Name of new ADR
```
