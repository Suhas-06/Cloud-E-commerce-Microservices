
mkdir C:/Users/suhas/Desktop/jenkins
icacls jenkins /grant Everyone:F
docker build -t codercata5/jenkins .

docker build -t jenkins-image .
docker run -d -p 8080 -v C:/Users/suhas/Desktop/jenkins:/var/jenkins_home -v //./pipe/docker_engine:/var/run/docker.sock jenkins-image