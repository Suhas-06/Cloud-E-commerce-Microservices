# mkdir -p /home/ayushsingh/jenkins
# chmod 777 /home/ayushsingh/jenkins

mkdir C:/Users/suhas/Desktop/jenkins
icacls jenkins /grant Everyone:F
docker build -t codercata5/jenkins .
docker run -d -p 8080:8080 -v /home/ayushsingh/jenkins:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock  codercata5/jenkins

docker build -t jenkins-image .
docker run -d -p 8080 -v C:/Users/suhas/Desktop/jenkins:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock  jenkins-image