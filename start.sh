docker-compose -f docker-compose.yml pull

COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose -f docker-compose.yml up --build -d

chown -R $USER:$USER /var/jenkins_home/workspace/jenkins-back/ttrawa

docker rmi -f $(docker images -f "dangling=true" -q) || true
