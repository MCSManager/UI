export const defaultDockerFile = `FROM ubuntu:latest\nRUN mkdir -p /workspace\nWORKDIR /workspace\n`

export const openjdk8 = `FROM openjdk:8-jre
RUN apt update && apt install -y locales
RUN mkdir -p /workspace
WORKDIR /workspace
`

export const openjdk16 = `FROM openjdk:16.0.2
RUN mkdir -p /workspace
`

export const ubuntu18 = `FROM ubuntu:18.04
RUN apt update && apt -y install libcurl4 && DEBIAN_FRONTEND="noninteractive" apt -y install tzdata
RUN mkdir -p /workspace
WORKDIR /workspace
`

export const openjdk17 = `FROM openjdk:17
RUN mkdir -p /workspace
WORKDIR /workspace
`


export const openjdk8CN = `FROM openjdk:8-jre
RUN apt update && apt install -y locales
RUN echo "zh_CN.UTF-8 UTF-8">/etc/locale.gen && locale-gen
ENV LANG=zh_CN.UTF-8
ENV LANGUAGE=zh_CN.UTF-8
ENV LC_ALL=zh_CN.UTF-8
ENV TZ=Asia/Shanghai
RUN mkdir -p /workspace
WORKDIR /workspace
`

export const openjdk16CN = `FROM openjdk:16.0.2
RUN mkdir -p /workspace
ENV TZ=Asia/Shanghai
`

export const ubuntu18CN = `FROM ubuntu:18.04
ENV TZ=Asia/Shanghai
RUN apt update && apt -y install libcurl4 && DEBIAN_FRONTEND="noninteractive" apt -y install tzdata
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN mkdir -p /workspace
WORKDIR /workspace
`

export const openjdk17CN = `FROM openjdk:17
RUN mkdir -p /workspace
ENV LANG=zh_CN.UTF-8
ENV LANGUAGE=zh_CN.UTF-8
ENV LC_ALL=zh_CN.UTF-8
ENV TZ=Asia/Shanghai
WORKDIR /workspace
`