pipeline {
    environment {
        ordermicroservice = 'order-microservice'
        productmicroservice = 'product-microservice'
        usermicroservice = 'user-microservice'

        orderImage = ''
        productImage = ''
        userImage = ''
    }

    agent any

    stages {
        stage('Checkout Source') {
            steps {
                //sh 'curl https://google.com'
                git  url: 'https://github.com/Suhas-06/Cloud-E-commerce-Microservices.git', branch: 'main'
                sh 'echo "Hello, git completed"'
                sh 'dir'
            }
        }
        stage('Build Images') {
            steps {
                dir('order-microservice') {
                    script {
                        //orderImage = docker.build ordermicroservice
                        sh 'docker build -t order-image .'
                    }
                }
                dir('product-microservice') {
                    script {
                        //productImage = docker.build productmicroservice
                        sh 'docker build -t product-image .'
                    }
                }
                dir('user-microservice') {
                    script {
                        //userImage = docker.build usermicroservice
                        sh 'docker build -t user-image .'
                    }
                }
            }
        }
       

        stage('List pods') {
            steps{
                sh 'curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"' //'curl https://storage.googleapis.com/kubernetes-release/release/v1.20.5/bin/linux/amd64/kubectl -LO'
                sh 'chmod u+x ./kubectl'
            }
        }

        stage('Deploy MongoDB') {
            steps {
                sh './kubectl apply -f mongodb-deployment.yaml'
                sh './kubectl apply -f mongodb-service.yaml'
            }
        }
        stage('Deploy RabbitMQ') {
            steps {
                sh './kubectl apply -f rabbitmq-deployment.yaml'
                sh './kubectl apply -f rabbitmq-service.yaml'
                sleep time: 60, unit: 'SECONDS'
            }
        }
        stage('Deploy Microservices') {
            steps {
                
            
                sh './kubectl apply -f order-microservice/order-microservice-deployment.yaml'
                sh './kubectl apply -f order-microservice/order-microservice-service.yaml'
          
        
                
        
                sh './kubectl apply -f product-microservice/product-microservice.deployment.yaml'
                sh './kubectl apply -f product-microservice/product-microservice-service.yaml'
           
        
        
        
                sh './kubectl apply -f user-microservice/user-microservice-deployment.yaml'
                sh './kubectl apply -f user-microservice/user-microservice-service.yaml'

        }
    }
}
}
