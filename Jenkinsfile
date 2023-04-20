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
        stage('Build Client'){
            steps{
                dir('client'){
                    sh 'npm install'
                }
            }
        }
        stage('Test'){
            steps{
                sh "chmod +x -R ${env.WORKSPACE}"
                sh './scripts/test.sh'
                echo "testing"
            }
        }    
        stage('Deliver') { 
            steps {
                dir('client'){
                sh "chmod +x -R ${env.WORKSPACE}"
                sh '../scripts/deliver.sh'
                input message: 'Finished using the web site? (Click "Proceed" to continue)' 
                sh '../scripts/kill.sh' 
                }
            }
        }
    }
}
