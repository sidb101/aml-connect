# 3. Saving the Network

## Status

Accepted

## Context

To address consequences of add-network-element ADR: user actions are not immediately passed to the backend

## Decision

Use a flag to check whether the network has been modified.
If so, save every 30 seconds.

## Consequences

Easier to handle when crashes occur, and at least most of the data is preserved