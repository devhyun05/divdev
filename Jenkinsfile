pipeline {
    agent any

    stages {
        stage("build") {
            steps {
                echo 'Building the application...'
                sh 'yarn global add yarn'
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