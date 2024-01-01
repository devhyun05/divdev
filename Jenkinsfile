pipeline {
    agent {
        docker {
            image 'node:lts' 
            args '-p 3000:3000' 
        }
    }

    stages {
        stage("build") {
            steps {
                echo 'Building the application...'
                sh 'npm install -g yarn'
                sh 'yarn install'
                sh 'yarn build'
            }
        }

        stage("test") {
            steps {
                echo 'testing the application...'
            }
        }

        stage("deploy") {
            steps {
                echo 'Deploying the application...'
            }
        }
    }
}