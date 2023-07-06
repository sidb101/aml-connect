# Add Network Element

## Status

Accepted

## Context

To uphold Performance QAS 1 and Usability QAS 8

## Decision

When user adds a network element on the canvas, it will not be immediately passed to the backend for processing

## Consequences

Harder to deal with probing (still can be handled)

Harder to deal with scenario in which program crashes and network hasn’t been saved (still can be handled)