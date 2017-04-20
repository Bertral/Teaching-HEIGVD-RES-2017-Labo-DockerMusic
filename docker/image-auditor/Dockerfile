FROM node:7.9.0
MAINTAINER Antoine Friant <antoine.friant@heig-vd.ch>

#
# When we build the image, we copy the executable jar in the image file system.
#
COPY src /opt/app/

WORKDIR /opt/app/
RUN npm install

ENTRYPOINT ["node", "/opt/app/auditor.js"]
