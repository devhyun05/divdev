pipeline {
    agent any

    stages {
        stage("build") {
            steps {
                echo 'Building the application...'
                sh 'cd frontend && yarn install'
                sh 'cd frontend && yarn build'
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