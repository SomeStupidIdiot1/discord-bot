# Docs

For using the commands. Prefix for any command is `//`. Commands are case sensitive.

## Table of contents

1. [Moderating chat](##Moderating-chat)
2. [Secret channels](#Secret-channels)
3. [Others](#Others)

## Moderating chat

### //c [number of lines to delete]

By default, 100 lines are cleared. The maximum number of lines is 100. People with the permission `MANAGE_MESSAGES` can use this command.

### //ca

All messages of the current channel are deleted. This may shift the position of the channel within the category. People with the permission `MANAGE_MESSAGES` can use this command.

## Secret channels

### //secret

Makes a secret voice and text channel that no one can see except people with specific roles. Only `ADMINISTRATORS` can use this command.

### //add (display name of user) [user id tag]

Adds a user to a secret channel. This is done by using the role created when `//secret` is used. The user id tag may be needed if the name is ambigiuous. Only `ADMINISTRATORS` can use this command.

## Others

### //help

To get the documentation link.

### //id

Gets channel id

### //delAll

Deletes all channels. Only `ADMINISTRATORS` can use this command.
