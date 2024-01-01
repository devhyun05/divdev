pipeline {
    agent any

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