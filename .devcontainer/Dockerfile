FROM docker.io/node:20

ARG USERNAME=vscode
ARG USER_UID=1000
ARG USER_GID=${USER_UID}

# For Visual Studio Code Dev Containers.
#   - https://code.visualstudio.com/docs/devcontainers/containers
RUN true \
    # https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md#non-root-user
    && userdel -r node \
    # Add a non-root user.
    && groupadd -g "${USER_GID}" "${USERNAME}" \
    && useradd -s /bin/bash -u "${USER_UID}" -g "${USER_GID}" -m "${USERNAME}" -l

USER ${USERNAME}
