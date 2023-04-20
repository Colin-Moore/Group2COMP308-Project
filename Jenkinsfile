pipeline {
    agent {
        docker {
            image 'node:lts-buster-slim'
            args '-p 4000:4000'
        }
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh "chmod +x -R ${env.WORKSPACE}"
                sh './scripts/test.sh'
            }
        }
        stage('Deliver') {
            steps {
                echo 'starting deliver stage...'
                sh './scripts/deliver.sh'
            }
        }
        stage('Deployment to Dev'){
            steps{
                sh './scripts/deploy_dev.sh'
            }
        }
        stage('Deployment to QAT'){
            steps{
                sh './scripts/deploy_qat.sh'
            }
        }
        stage('Deployment to Staging'){
            steps{
                sh './scripts/deploy_stage.sh'
            }
        }
        stage('Deployment to Production'){
            steps{
                sh './scripts/deploy_prod.sh'
            }
        }
    }
}


