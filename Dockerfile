FROM ubuntu:18.04

WORKDIR /app

ADD . /app

RUN apt-get update && apt-get install -y --no-install-recommends git openjdk-11-jdk make golang-go gcc-multilib unzip curl vim

RUN git clone https://github.com/jpmorganchase/quorum && cd quorum && make && cd .. && git clone https://github.com/jpmorganchase/quorum-examples.git

ENV PATH="/app/quorum/build/bin:${PATH}"

ADD https://oss.sonatype.org/service/local/repositories/releases/content/com/jpmorgan/quorum/tessera-app/0.10.4/tessera-app-0.10.4-app.jar /app/