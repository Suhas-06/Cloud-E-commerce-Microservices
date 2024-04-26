# E-commerce Microservices Application

## Table of Contents

- [Project Overview](#project-overview)
- [Getting Started](#getting-started)

## Project Overview

This project aims to develop an e-commerce application using a microservices architecture, which can be deployed on the cloud using Docker, Kubernetes, Jenkins, and Git. The application will consist of several microservices that communicate with each other to provide various functionalities like user management, product management and order management.

### Technologies Used

- **Microservices**: Design and implemented the microservices architecture using Node.js.
- **Docker**: Created Docker containers for each microservice.
- **Kubernetes**: Orchestrated the Docker containers using Kubernetes.
- **Jenkins**: Implemented a Jenkins pipeline for continuous integration and deployment.
- **Git**: Used Git for version control and integrated it with Jenkins for automated builds and deployments.
- **Database**: MongoDB is used as the backend database.
- **Message Queue**: RabbitMQ is used for message queuing to handle asynchronous communication between microservices.

## Getting Started

To get started with the E-commerce Microservices Application, follow these steps:

### Prerequisites

Before proceeding, ensure you have the following installed:

- **Docker Desktop**: Install Docker Desktop for your operating system from [Docker Hub](https://hub.docker.com/).
- **Kubernetes**: Install Kubernetes for your platform. You can use tools like Minikube or Docker Desktop with Kubernetes enabled.
- **RabbitMQ**: Install RabbitMQ. You can either install it locally or use a cloud-based solution.

### Setup Jenkins

1. Build the Jenkins Docker image:
   ```bash
   docker build -t jenkins image
2. Deploy the Jenkins pod using Kubernetes:
   ```bash
   kubectl apply -f jenkins.yaml
3. Create a service for the Jenkins pod:
   ```bash
   kubectl apply -f jenkins-service.yaml
4. Access Jenkins through the web interface. Use the following steps to obtain the initial admin password:
   Check the status of the Jenkins pod:
   ```bash
   kubectl get pods
   ```
   Find the name of the Jenkins pod and get the initial admin password:
   ```bash
   kubectl logs <jenkins-pod-name>
5. Open a web browser and navigate to the Jenkins URL (localhost:30000). Enter the initial admin password obtained in the previous step and follow the setup wizard to complete the installation.

### Configure Jenkins Pipeline

To configure the Jenkins pipeline for the E-commerce Microservices Application, follow these steps:

1. **Host Project Files in GitHub Repository**: Ensure your project files are hosted in a GitHub repository.

2. **Update Jenkins Script (Jenkinsfile)**: Replace the GitHub repository link in the Jenkins script (Jenkinsfile) with your repository link.

3. **Create a New Pipeline in Jenkins**:
   - Go to the Jenkins dashboard and click on "New Item".
   - Enter a name for your pipeline and select "Pipeline" as the project type.
   - In the pipeline configuration, choose "Pipeline script from SCM" and select Git as the SCM.
   - Enter your GitHub repository URL and branch name (usually `main`).
   - Save the pipeline configuration.

4. **Build the Pipeline**:
   - Once the pipeline is configured, trigger the build by clicking on "Build Now" or wait for Jenkins to automatically start the build process.
   - Jenkins will execute the pipeline stages defined in the Jenkinsfile, which include building, testing, and deploying the microservices.
   
By following these steps, you can configure and execute the Jenkins pipeline, automating the build and deployment process for the E-commerce Microservices Application.

### Verify Microservices Deployment

After the Jenkins pipeline completes successfully, follow these steps to verify the deployment of microservices:

1. **Check Microservices Pods in Kubernetes**:
   ```bash
   kubectl get pods
Ensure that all microservices pods are in the "Running" state.
2. **Interact with the Application**: Use Postman or any API testing tool to hit the endpoints provided by the microservices according to your requirements.
